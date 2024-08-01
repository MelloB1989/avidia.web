import axios from 'axios';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import {CODER_BASE_URL, CODER_SERVER_KEY } from '@/config';

export default async function start_flask(req, res){
    const token = req.body.token;
    const tid = req.body.tid;
    const fid = req.body.fid;
    const user = jwt.verify(token, secretKey);
    if(user !== null){
        const r = await axios.post(`${CODER_BASE_URL}/workspaces/${fid}/builds?coder_session_token=${CODER_SERVER_KEY}`, {
            transition: "start",
            template_version_id: tid
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Coder-Sesion-Token': CODER_SERVER_KEY
            },
          });
          res.status(200).json({data: r.data});
    } else res.status(401).json({error: "Invalid JWT"})
}