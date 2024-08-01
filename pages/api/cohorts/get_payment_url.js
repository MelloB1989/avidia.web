const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import axios from 'axios';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';
import { KP_WEBHOOK_API_KEY, KARMAPAY_BASE_URL, KARMAPAY_API_KEY } from '@/config';

const client = new GraphQLClient(GraphQL_endpoint, {
    headers: {
      "x-api-key": GraphQL_API_KEY,
    },
});

export default async function GetCoupon(req, res){
    if (req.method === 'POST') {
        console.log(req.body)
        const { code, course, token } = req.body;
        let fp = "";
        const user = jwt.verify(token, secretKey);
        let courseData;
        let couponDetails;
        console.log(code === "nullkl")
        if(user != null){
            try{
                const getCoupons = await client.request(querygen("getCoupons", code));
            couponDetails = getCoupons.listCoupons.items[0];
            const getCourse = await client.request(querygen("getCohortById", course));  
            courseData = getCourse.queryCohortsByIdPermalinkIndex.items[0];
            fp = (parseInt(courseData.priceInr) - parseInt(couponDetails.discount)).toString();
            } catch(e){
                res.status(500).json({error: "GraphQL seems to be down!"});
            }
            
            //PAYMENTS PARTNER -KARMAPAY V1.4, COFFEECODES, MELLOB
            //KARMAPAY DOCS: https://docs.noobsverse.com/docs/karmapay/
            try{
                //console.log("Amount: ", parseInt(courseData.priceInr) - parseInt(couponDetails.discount));
                const callback = `https://cohort.avidia.in/api/cohorts/verifyPurchase?kp_webhook_key=${KP_WEBHOOK_API_KEY}&userId=${user.userId}&courseId=${courseData.permalink}&coupon=${code}&access_token=${user.access_token}&amt=${fp}`;
                console.log(callback);
                const kpr = await axios.post(`${KARMAPAY_BASE_URL}/orders/create`,{
                    "order_amt": fp,
                    "order_currency": "INR",
                    "order_description": courseData.permalink,
                    "order_mode": "RAZORPAY",
                    "webhook_url": callback,
                    "redirect_url": "https://cohort.avidia.in/dashboard",
                    "registration": "no"
                },{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${KARMAPAY_API_KEY}`
                    }
                });
                res.status(200).json({kpr: kpr.data});
            } catch (e){
                console.log(e)
                res.status(500).json({error: "KarmaPay seems to be down!"})
            }
        }

    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}