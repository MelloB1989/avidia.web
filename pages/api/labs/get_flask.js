import axios from 'axios';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import {CODER_BASE_URL, CODER_SERVER_KEY } from '@/config';

export default async function get_flask_details(req, res){
    const token = req.body.token;
    //const userid = req.body.userid;
    const fid = req.body.fid;
    const user = jwt.verify(token, secretKey);
    if(user !== null){
        const r = await axios.get(`${CODER_BASE_URL}/workspaces/${fid}/builds?limit=25&offset=0&coder_session_token=${CODER_SERVER_KEY}`, {
            headers: {
              'Content-Type': 'application/json',
              'Coder-Sesion-Token': CODER_SERVER_KEY
            },
          });
          res.status(200).json({data: r.data});
    } else res.status(401).json({error: "Invalid JWT"})
}