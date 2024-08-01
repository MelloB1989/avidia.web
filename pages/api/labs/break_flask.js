import axios from 'axios';
import {CODER_BASE_URL, CODER_SERVER_KEY } from '@/config';

export default async function kill_flask(req, res){
    const { fid, cuid } = req.query;
   /* const token = req.body.token;
    const tid = req.body.tid;
    const fid = req.body.fid;
    */
    const user = 1;
    console.log(fid);
    if(user !== null){
        const r = await axios.post(`${CODER_BASE_URL}/workspaces/${fid}/builds?coder_session_token=${CODER_SERVER_KEY}`, {
            transition: "delete",
            orphan: false
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Coder-Sesion-Token': CODER_SERVER_KEY
            },
          });
          res.status(200).json({data: r.data});
    } else res.status(401).json({error: "Invalid JWT"})
}