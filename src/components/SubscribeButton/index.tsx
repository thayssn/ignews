import { signIn, useSession } from 'next-auth/client';
import styles from './styles.module.scss';

import { api } from '../../services/api'
import { getStripeJS } from '../../services/stripe-js';

import { toast } from 'react-toastify';

interface SubscribeButtonProps {
    priceId: string
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
    const [ session ] = useSession();
    
    const handleSubscription = async () => {
        if(!session){
            signIn('github')

            return
        }

        try{
            const {data} = await api.post('subscribe')
            const { sessionId } = data; 

            const stripe = await getStripeJS()

            await stripe.redirectToCheckout({sessionId})
            toast.success("Oh, yes!")

        }catch(err){
            console.log(err)
            toast.error("Oh, no!")
        }
        

    }
    return (
        <button
            type="button"
            className={styles.subscribe_button}
            onClick={handleSubscription}
        >
            Subscribe now
        </button>
    )
}