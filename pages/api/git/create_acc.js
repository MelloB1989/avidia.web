import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '@/config';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';
const KEY = process.env.JWT_KEY;

export default async function get(req, res){
  if(req.method === 'POST'){
    const {token, email, name, password, username} = req.body;
    try {
      const verified = jwt.verify(token, KEY);
      const client = new GraphQLClient(GraphQL_endpoint, {
        headers: {
          "x-api-key": GraphQL_API_KEY,
        },
    });
      if (verified) {
        try{
          const r = await axios.post('https://git.noobsverse.com/api/v4/users', {
            email,
            name,
            password,
            username
          }, {
            headers: {
              'Authorization': `Bearer ${config.GITLAB_TOKEN}`
            }
          });
          //console.log(r)
          const s = await client.request(querygen("updateUserGITID", { gitID: r.data.id, nbspID: verified.userId }));
          res.status(200).json({ success: true, data: s });
        } catch (e){
          console.log(e)
          res.status(200).json({ success: false })
        }
      } else {
        res.status(200).json({ success: false })
      }
    }
    catch {
      res.status(200).json({ success: false })
    }
  }
  else res.status(500).json( {error: "Invalid method" });
}