const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(GraphQL_endpoint, {
    headers: {
      "x-api-key": GraphQL_API_KEY,
    },
});

export default async function GetCoupon(req, res){
    if (req.method === 'POST') {
        const { code, token } = req.body;
        const user = jwt.verify(token, secretKey);
        if(user != null){
            const getCoupons = await client.request(querygen("getCoupons", code));
            const couponDetails = getCoupons.listCoupons.items[0];            
            res.status(200).json({message: "success", data: couponDetails});
        }

    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}