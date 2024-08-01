import axios from 'axios';
import {CODER_BASE_URL, CODER_SERVER_KEY, CODER_ORG} from '@/config';

export default async function get_flask_details(req, res){
    const id = req.body.id
    const r = await axios.get(`${CODER_BASE_URL}/organizations/${CODER_ORG}/templates/${id}?coder_session_token=${CODER_SERVER_KEY}`, {
        headers: {
          'Content-Type': 'application/json',
          'Coder-Sesion-Token': CODER_SERVER_KEY
        },
      });
      res.status(200).json({data: r.data});
}