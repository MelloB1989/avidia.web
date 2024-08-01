import { GraphQLClient } from 'graphql-request';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from "@querygen";
const secretKey = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');
import send_mail from '@/lib/mail/mg_mailer';

const client = new GraphQLClient(GraphQL_endpoint, {
  headers: {
    "x-api-key": GraphQL_API_KEY,
  },
});

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
            <p style="font-size: 18px;">Hi, <strong>User!</strong>!</p>
            <p>Course Enrollment successful!</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px;">
            &copy; 2024 Avidia. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
const _html = `<!DOCTYPE html>
<html>
<head>
    <title>Your student has just enrolled!</title>
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
            <p style="font-size: 18px;">Hi, <strong>User!</strong>!</p>
            <p>Course Enrollment successful!</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px;">
            &copy; 2024 Avidia. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

export default async function Enroll(req, res){
    const {email, courseId, token} = req.body;
    const user = jwt.verify(token, secretKey);
    if(user != null){
        console.log(user)
        //Create Course
    const variables = {
        nbspid: user.userId,
        permalink: courseId
    };
    const cid_con = await client.request(querygen("createUserCourse", variables));
    const cid = cid_con.createSubscribedCourse.id;
        
        //Register Course
        let p_cid = [];
        const rdata = await client.request(querygen("getUserSubscribedCourses", user.userId));
        console.log(rdata)
        p_cid = rdata.getUser.subscribedCourseIds || [];
        p_cid.push(cid);
        console.log(p_cid)
        const d = await client.request(querygen("registerUserCourse", {
            nbspid: user.userId,
            courses: p_cid
        }));
        send_mail(email, "Course Enrollment successful!", "Course Enrollment successful!", email_html);
        send_mail("kartikdd90@gmail.com", "Course Enrollment successful!", "Course Enrollment successful!", _html);
        send_mail("kaushik.p2212@gmail.com", "Course Enrollment successful!", "Course Enrollment successful!", _html);
        res.status(200).json({status: "success"});
    }
}