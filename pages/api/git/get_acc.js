import jwt from 'jsonwebtoken';
import config from '@/config';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';
const KEY = process.env.JWT_KEY;


export default async function create(req, res){
  if(req.method === 'POST'){
    const {token} = req.body;
    try {
      const verified = jwt.verify(token, KEY);
      const client = new GraphQLClient(GraphQL_endpoint, {
        headers: {
          "x-api-key": GraphQL_API_KEY,
        },
    });
      if (verified) {
        try{
          const data = await client.request(querygen("getGITID", verified.userId));
          //console.log(data, verified.userId)
          res.status(200).json({ success: true, data: data.getUser });
        } catch (e){
          res.status(200).json({ success: false })
        }
      }
    }
    catch {
      res.status(200).json({ success: false })
    }
  }
  else res.status(500).json( {error: "Invalid method" });
}