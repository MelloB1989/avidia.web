import { GraphQL_endpoint, GraphQL_API_KEY } from "@/config";
import querygen from "@querygen";
import { gql, GraphQLClient } from "graphql-request";
import { KP_WEBHOOK_API_KEY } from "@/config";
import send_mail from "@/lib/mail/mg_mailer";
import axios from 'axios';

const NBSP_KEY = process.env.NBSP_KEY;
const API_URL = "https://spaces.noobsverse.com/api";

const client = new GraphQLClient(GraphQL_endpoint, {
  headers: {
    "x-api-key": GraphQL_API_KEY,
  },
});

export default async function verifyPurchase(req, res) {
  if (req.method === "POST") {
    const { kp_webhook_key, userId, courseId, coupon, access_token, amt } =
      req.query;
      const email_html = `<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation for Avidia Cohort 2024</title>
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
            <p style="font-size: 18px;">Hi, <strong>Avidian!!</strong>!</p>
            <p>Your order was successful, and live sessions will start <strong>soon!</strong>.</p>
            <p>Thank you for joining the Avidia cohort. We are excited to have you on board and look forward to meeting you!</p>
            <p>Please remember ${userId} is your unique ID</p>
            
            <!-- WhatsApp Group Button -->
            <a href="https://chat.whatsapp.com/G2CtIfblQ6yE4ZhWeEQJGj" class="button">
                Join Sigma WhatsApp Group
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
    if (kp_webhook_key === KP_WEBHOOK_API_KEY) {
      //Create Course
      const cid_con = await client.request(
        querygen("createUserCourse", {
          nbspid: userId,
          permalink: courseId,
        })
      );
      const cid = cid_con.createSubscribedCourse.id;
      //console.log(cid);

      //Register Course
      const p_cid_con = await client.request(
        querygen("getUserCourseIds", { nbspid: userId })
      );
      let p_cid = [];
      if(p_cid_con.getUser.subscribedCourseIds){
        p_cid = p_cid_con.getUser.subscribedCourseIds;
      }
      p_cid.push(cid);
      let trnxs = p_cid_con.getUser.transactions ? p_cid_con.getUser.transactions : [];
      const transaction = gql`mutation MyMutation {
        createMyCustomType(input: {amt: \"${amt}\", date: \"${new Date().toISOString()}\", description: \"${coupon}\", type: \"${courseId}\"}) {
          id
        }
      }`;
      const trxid = await client.request(transaction);
      trnxs.push(trxid.createMyCustomType.id);
      const d = await client.request(
        querygen("registerUserCourse", {
          nbspid: userId,
          courses: p_cid,
          transactions: trnxs
        })
      );
      //Preparing request body
      try {
        const formData = new URLSearchParams();
        formData.append("user_id", userId);
        formData.append("fetch", "user_data");
        formData.append("server_key", NBSP_KEY);
        //console.log(payload)
        //Sending request
        const response = await axios.post(
          `${API_URL}/get-user-data?access_token=${access_token}`,
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Set the appropriate content type for form data
            },
          }
        );
        if (response.data.api_status === 200) {
          const email = response.data.user_data.email;
          const e = await send_mail(
            email,
            "Welcome to Avidia Cohort 2024!",
            "You have successfully purchased the course. You can now access the course from your dashboard. Happy Learning!",
            email_html
          );
          console.log(e);
        }
        return res.status(200).json({ message: "success" });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized!" });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
