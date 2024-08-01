import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
//const verifyToken = require('../../../lib/jwt_verify');
import send_mail from '../../../lib/mail/send_mail';
const secret = process.env.RAZORPAY_SECRET;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import querygen from '@querygen';
import subscribe_course from '../../../lib/firestore/subscribe/course';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(GraphQL_endpoint, {
    headers: {
      "x-api-key": GraphQL_API_KEY,
    },
  });

export default async function VerifyPayment(req, res){
    if(req.method === 'POST'){
        const token = req.body.token;
        //console.log(req.body);
        const user = jwt.verify(token, secretKey);
        const mail = req.body.mail;
        const name = req.body.name;
        const courseId = req.body.courseId;
        const labs = req.body.labs;
        const username = req.body.user;
        const password = req.body.password;
        const phone = req.body.phone;
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
            <p>Your order was successful, and classes will start from <strong>21st October</strong>.</p>
            <p>Thank you for joining the Avidia cohort. We are excited to have you on board and look forward to meeting you!</p>
            <p>Please remember ${user.userId} is your unique ID</p>
            <p>Your Avidia credentials: <br> Username: ${username} <br> Password: ${password}</p><br>
            
            <!-- WhatsApp Group Button -->
            <a href="https://chat.whatsapp.com/Cr5tilkXyoD788b7GXvJqp" class="button">
                Join Our WhatsApp Group
            </a>
            <!-- Discord Group Button -->
            <a href="https://discord.com/invite/XfrFzaEQ" class="buttondiscord">
                Join Our Discord Server
            </a>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px;">
            &copy; 2024 Avidia. All rights reserved.
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
                //console.log(validity)
                subscribe_course(user.userId, courseId, labs);
                //Create Course
                const cid_con = await client.request(querygen("createUserCourse", {
                    nbspid: user.userId,
                    permalink: courseId
                }));
                const cid = cid_con.createSubscribedCourse.id;
                
                //Register Course
                const p_cid_con = await client.request(querygen("getUserCourseIds"), user.userId);
                const p_cid = p_cid_con.getUser.subscribedCourseIds;
                p_cid[cid];
                const d = await client.request(querygen("registerUserCourse"), {
                    nbspid: user.userId,
                    courses: p_cid
                })
                
                send_mail(mail, "Avidia Cohort: Registration Successful", "Avidia Cohort: Registration Successful", email_html);
                const t = `${name} has just registered to the Cohort!`;
                const h = `<p>${name} has registered in the Cohort. Details: <br>
                ${mail} <br> ${username}`;
                send_mail("kartikdd90@gmail.com", t, t, h);
                send_mail("nvaimsdr@gmail.com", t, t, h);
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
