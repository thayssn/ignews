import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../../services/stripe'
import { getSession } from 'next-auth/client'
import stripeEnums from '.././../../enums/stripe'
import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'

type User = {
    ref: {
        id: string;
    },
    data: {
        stripe_customer_id?: string;
    }
}

const { STRIPE_CREATE_CUSTOMER_ERROR } = stripeEnums

async function createStripeCustomer (session) {
    return await stripe.customers.create({
        email: session.user.email
    })
}

async function getUser(session){
    return await fauna.query<User>(
        q.Get(
            q.Match(q.Index('users_by_email'),
            q.Casefold(session.user.email))
        )
    )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        const session = await getSession({req})

        const user = await getUser(session)


        let customerId = user.data.stripe_customer_id

        console.log(customerId)

        if(!customerId){
            const customer = await createStripeCustomer(session)

            if(!customer){
                return res.status(400).json({error: STRIPE_CREATE_CUSTOMER_ERROR})
            }

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'),
                    user.ref.id
                ),
                {
                    data: {
                        stripe_customer_id: customer.id
                    } 
                }
            ))

            customerId = customer.id
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1JStiHEg0lYA0a4HFpkARsRF', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })

        return res.status(200).json({ sessionId: checkoutSession.id })
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}