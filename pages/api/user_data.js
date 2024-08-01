import jwt from 'jsonwebtoken';
//import get_user from './firestore/get_user';
const KEY = process.env.JWT_KEY;
import axios from 'axios';
import cookie from 'cookie';

const NBSP_KEY = process.env.NBSP_KEY;
const API_URL = 'https://spaces.noobsverse.com/api';
const SECRET_KEY = process.env.JWT_KEY;

export default async function user_data(req, res){
    const token = req.body.token;
    if(req.method === 'POST'){
    try{
        const verified = jwt.verify(token, KEY);
        if(verified){
        // Decode JWT Token
          //const fdata = await get_user(verified.userId);
          
          const [encodedHeader, encodedPayload] = token.split('.');
          const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
          const accessToken = payload['access_token'];
          const userId = payload['userId'];
        // Get user data from Noobs Spaces
        
        //Preparing request body
        const formData = new URLSearchParams();
        formData.append('user_id', userId);
        formData.append('fetch', 'user_data');
        formData.append('server_key', NBSP_KEY);
        //console.log(payload)
        //Sending request
        const response = await axios.post(`${API_URL}/get-user-data?access_token=${accessToken}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
        if(response.data.api_status === 200){
            if(response.data.user_data.admin === "1"){
                        // Generate a JWT token with the user ID
                const token = jwt.sign({ admin: "1" }, SECRET_KEY, { expiresIn: '1d' });
        
                // Set the JWT token in the cookie
                const jwt_cookie = cookie.serialize('admin', token, {
                  maxAge: 86400, // 1 day in seconds
                  path: '/',
                });
                
                res.setHeader('Set-Cookie', [jwt_cookie]);
                res.status(200).json({ data: response.data });
            }
            else res.status(200).json({ data: response.data });
        }
        if(response.data.api_status === 404 || response.data.errors) res.status(200).json({ error: response.data.errors })
        }
        else res.status(500).json({ error : "Unexpected error" })
    }
    catch{
        res.status(200).json({ error : "Aai cha gavat, galat JWT token bhejta hai!"})
    }
    }
    else{
        res.status(500).json({ error: "Wrong method bhau!" })
    }
}