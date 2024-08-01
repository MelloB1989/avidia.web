import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '@/config';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';
const KEY = process.env.JWT_KEY;

export default async function get(req, res){
  if(req.method === 'POST'){
    const {token, git_id, project_slug, import_url, courseID} = req.body;
    try {
      const verified = jwt.verify(token, KEY);
      const client = new GraphQLClient(GraphQL_endpoint, {
        headers: {
          "x-api-key": GraphQL_API_KEY,
        },
    });
      if (verified) {
        try{
          const s = await client.request(querygen("createUserProject", { courseID: courseID, nbspID: verified.userId, slug: project_slug }));
          const r = await axios.post(`https://git.noobsverse.com/api/v4/projects/user/${git_id}`, {
            name: project_slug,
            visibility: "public",
            import_url: import_url
          }, {
            headers: {
              'Authorization': `Bearer ${config.GITLAB_TOKEN}`
            }
          });
          //console.log(r)
          res.status(200).json({ success: true, s: s, r: r.data });
        } catch (e){
          console.log(e)
          res.status(200).json({ success: false, error: e })
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