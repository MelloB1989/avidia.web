//const get_all_courses = require('../../../../lib/firestore/get_all_courses'); 
const verifyToken = require('../../../../lib/jwt_verify');
import { GraphQLClient } from 'graphql-request';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from "@querygen"

const client = new GraphQLClient(GraphQL_endpoint, {
  headers: {
    "x-api-key": GraphQL_API_KEY,
  },
});

export default async function all_courses(req, res){
    if(req.method === 'POST'){
    //console.log(req.body.token)
    const token = req.body.token;
    const n = req.body.n;
    
    try {
        //Verify the JWT token and get the decoded data from the token
        const decodedData = verifyToken(token);
        //console.log('Decoded Data:', decodedData);
        if(decodedData){
            //const courses = await get_all_courses(n);
            const courses = await client.request(querygen("listCohorts"))
            if(courses !== null){
                res.status(200).json(courses);
            }
            else res.status(500).json({ error: 'Error fetching users data' });
        }
    }
//Catch INVALID TOKEN ERROR
catch (error) {
  if (error.message === 'invalid_token') {
    console.error('Invalid Token');
    res.status(401).json({ error: 'Invalid JWT token' });
  } else {
    console.error('Error:', error.message);
    res.status(401).json({ error: error.message });
  }
}} 
else res.status(500).json({ error: 'Wrong method' });
}