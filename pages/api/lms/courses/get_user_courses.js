//const get_u_courses = require('../../../../lib/firestore/get_courses'); 
const verifyToken = require('../../../../lib/jwt_verify');
import { GraphQLClient } from 'graphql-request';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from "@querygen"

const client = new GraphQLClient(GraphQL_endpoint, {
  headers: {
    "x-api-key": GraphQL_API_KEY,
  },
});

export default async function my_courses(req, res){
    if(req.method === 'POST'){
    console.log(req.body.user_id)
    const token = req.body.token;
    const user_id = req.body.user_id;
    
    try {
        let c = [];
        //Verify the JWT token and get the decoded data from the token
        const decodedData = verifyToken(token);
        //console.log('Decoded Data:', decodedData);
        if(decodedData){
            //const courses = await get_u_courses(user_id);
            const rdata = await client.request(querygen("getUserSubscribedCourses", user_id));
            //console.log(rdata);
            const courses = rdata.getUser.subscribedCourseIds;

            const promises = courses.map(async(course_id) => {
              const cdata = await client.request(querygen("getUserSubscribedCourse", course_id));
              return {
                  id: cdata.getSubscribedCourse.permalink,
                  started_from: cdata.getSubscribedCourse.startedFrom
              };
          });
      
          const c = await Promise.all(promises);
      
          //console.log(c);

            if(courses !== null){
                res.status(200).json(c);
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