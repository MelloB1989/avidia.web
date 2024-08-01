import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import send_mail from '../../../lib/mail/send_mail';
const secret = process.env.RAZORPAY_SECRET;
const jwt = require('jsonwebtoken');
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import { gql, GraphQLClient } from 'graphql-request';
const secretKey = process.env.JWT_KEY;

export default async function VerifyPayment(req, res){
    if(req.method === 'POST'){
        const token = req.body.token;
        //console.log(req.body);
        const user = jwt.verify(token, secretKey);
        const mail = req.body.mail;
        const avc = req.body.avc_amt;
        const name = req.body.name;
        const amt = req.body.amt;
        const des = req.body.description;
        const client = new GraphQLClient(GraphQL_endpoint, {
    headers: {
      "x-api-key": GraphQL_API_KEY,
    },
  });
        const prev_trnx = gql`query MyQuery {
  getUser(nbspID: \"${user.userId}\") {
    AVC_balance
    transactions
  }
}`
        const prevdata = await client.request(prev_trnx);
        const transaction = gql`mutation MyMutation {
  createMyCustomType(input: {amt: \"${amt}\", date: \"${new Date().toISOString()}\", description: \"${des}\", type: \"labs\"}) {
    id
  }
}`;
        const trxid = await client.request(transaction);
        const trnxs = prevdata.getUser.transactions ? prevdata.getUser.transactions : [];
        trnxs.push(trxid.createMyCustomType.id);
        const pavc_bal = parseFloat(prevdata.getUser.AVC_balance) || 20;
        //console.log(pavc_bal);
        //console.log('Trxs: ', pavc_bal+parseFloat(avc));
        const avc_mutation = gql`mutation MyMutation {
  updateUser(input: {nbspID: \"${user.userId}\", transactions: \'${JSON.stringify(trnxs)}\', AVC_balance: \"${pavc_bal+parseFloat(avc)}\"}){
      id
  }
  }`;
        //console.log(avc_mutation);
        const update = await client.request(avc_mutation);
        //console.log('Update: ', update);
        const email_html = `<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
    <style>
        .button {
            background-color: #25D366;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
        .buttondiscord {
            background-color: #1c1f1d;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 40px; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #343a40; color: white; padding: 20px; text-align: center;">
            <img src="https://avidia.in/assets/images/logo.png" alt="Avidia Logo" style="width: 100px;"/>
            <h1 style="margin: 20px 0;">Order Confirmation</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px;">
            <p style="font-size: 18px;">Hi, <strong>${name}</strong>!</p>
            <p>Your recent payment on Avidia Labs was successful.</p>
            <p>Order details: ${des}</p>
            <p>-Team Avidia</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px;">
            &copy; 2024 Avidia. All rights reserved.
            <br>Noobsverse Private Limited
        </div>
    </div>
</body>
</html>
`;
        //console.log(user);
        if (user !== null){
            //CREATE THE ORDER IF JWT VALID
            try{
                const validity = await validatePaymentVerification({"order_id": req.body.order_id, "payment_id": req.body.payment_id }, req.body.signature, secret);
                send_mail(mail, "Avidia Cohort: Registration Successful", "Avidia Cohort: Registration Successful", email_html);
                const t = `${name} has just registered to the Cohort!`;
                const h = `<p>${name} has done a transaction. Details: <br>
                ${mail}`;
                send_mail("kartikdd90@gmail.com", t, t, h);
                return res.status(200).json({validity});
            }
            catch(e){
                console.log(e);
                return res.status(500).json({error: e})
            }
        }
        else res.status(401).json({error: "INVALID TOKEN"})
    }
    else{
        return res.status(500).json({error: "INVALID METHOD"})
    }
}