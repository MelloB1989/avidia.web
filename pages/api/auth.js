import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const NBSP_KEY = process.env.NBSP_KEY;
const API_URL = 'https://spaces.noobsverse.com/api'; // Replace this with your external API endpoint URL
const SECRET_KEY = process.env.JWT_KEY; // Replace this with a long and secure random string

export default async function handler(req, res) {
//console.log(req.body)

  if (req.method === 'POST') {
    const { username, password } = req.body;
console.log(username)
    try {
      // Make a POST request to the external API with the provided credentials as form data
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('server_key', NBSP_KEY);

      const response = await axios.post(`${API_URL}/auth`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
console.log(response)
      if (response.status === 200 && response.data.api_status === 200) {
        //console.log(response.data)
        const { access_token, user_id } = response.data;

        // Generate a JWT token with the user ID
        const token = jwt.sign({ userId: user_id, access_token: access_token, username: username }, SECRET_KEY, { expiresIn: '1d' });

        // Set the JWT token in the cookie
        const jwt_cookie = cookie.serialize('app_token', token, {
          maxAge: 86400, // 1 day in seconds
          path: '/',
        });
        
        res.setHeader('Set-Cookie', [jwt_cookie]);

        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred during login' });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
