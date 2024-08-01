import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import querygen from "@querygen";
import send_mail from "@/lib/mail/mg_mailer";
import { v4 as uuidv4 } from 'uuid';
import { gql, GraphQLClient } from 'graphql-request';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';

const NBSP_KEY = process.env.NBSP_KEY;
const API_URL = 'https://spaces.noobsverse.com/api'; // Replace this with your external API endpoint URL
const SECRET_KEY = process.env.JWT_KEY; // Replace this with a long and secure random string

export default async function handler(req, res) {
  
  const client = new GraphQLClient(GraphQL_endpoint, {
        headers: {
          "x-api-key": GraphQL_API_KEY,
        },
    });

  const createFormData = (params) => {
    const formData = new URLSearchParams();
    for (const key in params) {
      formData.append(key, params[key]);
    }
    formData.append('server_key', NBSP_KEY);
    return formData;
  }

  const register_user = async (username, password, confirm_password, email, phone_number, last_name, first_name, courseSlug) => {
    const formData = createFormData({ username, password, confirm_password, email });
    const response = await axios.post(`${API_URL}/create-account`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response from create-account:', response.data);

    if (response.data.api_status === 200) {
      const { access_token, user_id } = response.data;
      try {
        await update_data(access_token, first_name, last_name, phone_number);
        const createUser = gql`mutation MyMutation {
  createUser(input: {nbspID: \"${user_id}\", id: \"${uuidv4()}\"}) {
    id
  }
}`;
        client.request(createUser);
        //Create Course
      const cid_con = await client.request(
        querygen("createUserCourse", {
          nbspid: user_id,
          permalink: courseSlug,
        })
      );
      const cid = cid_con.createSubscribedCourse.id;
      //console.log(cid);

      //Register Course
      const p_cid_con = await client.request(
        querygen("getUserCourseIds", { nbspid: user_id })
      );
      let p_cid = [];
      if(p_cid_con.getUser.subscribedCourseIds){
        p_cid = p_cid_con.getUser.subscribedCourseIds;
      }
      p_cid.push(cid);
      let trnxs = p_cid_con.getUser.transactions ? p_cid_con.getUser.transactions : [];
      const transaction = gql`mutation MyMutation {
        createMyCustomType(input: {amt: \"0\", date: \"${new Date().toISOString()}\", description: \"SPECIAL_USER\", type: \"${courseSlug}\"}) {
          id
        }
      }`;
      const trxid = await client.request(transaction);
      trnxs.push(trxid.createMyCustomType.id);
      const d = await client.request(
        querygen("registerUserCourse", {
          nbspid: user_id,
          courses: p_cid,
          transactions: trnxs
        })
      );
      await send_mail(
        email,
        "Welcome to NoobsVerse!",
        "Welcome to NoobsVerse! You have successfully purchased the course. You can now access the course from your dashboard. Happy Learning!",
        "NoobsVerse"
      );
      } catch(e) {
        console.log(e)
        return res.status(500).json({ error: 'Error updating user info.' });
      }

      const token = jwt.sign({ userId: user_id, access_token: access_token, username: username }, SECRET_KEY, { expiresIn: '1d' });
      const jwt_cookie = cookie.serialize('app_token', token, {
        maxAge: 86400,
        path: '/',
      });

      res.setHeader('Set-Cookie', [jwt_cookie]);
      return res.status(200).json({ success: true });
    } else {
      const errorText = response.data.error_text || 'Invalid credentials';
      const error = response.data.errors ? response.data.errors.error_text : errorText;
      return res.status(400).json({ error });
    }
  }

  const update_data = async (access_token, first_name, last_name, phone_number) => {
    const formData = createFormData({ first_name, last_name, phone_number });
    const response = await axios.post(`${API_URL}/update-user-data?access_token=${access_token}`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response from update-user-data:', response.data);

    if (response.data.api_status !== 200) {
      throw new Error(response.data.error);
    }
  }

  if (req.method === 'POST') {
    const { username, password, confirm_password, email, phone_number, last_name, first_name, courseSlug } = req.body;
    try {
      await register_user(username, password, confirm_password, email, phone_number, last_name, first_name, courseSlug);
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ error: 'An error occurred during registration' });
    }
  } else {
    return res.status(405).end();
  }
}