import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const users = [
        { id: 1},
        { id: 2},
        { id: 3},
        { id: 4},
    ]

    return res.json(users)
}