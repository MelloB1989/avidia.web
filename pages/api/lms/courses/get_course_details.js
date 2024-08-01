//WE DO NOT NEED TO AUTHORIZE USER FOR THIS API
//NO NEED TO VERIFY JWT
//import getCourse from '../../../../lib/firestore/get_course_details';

import { GraphQLClient } from 'graphql-request';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from "@querygen"

const client = new GraphQLClient(GraphQL_endpoint, {
  headers: {
    "x-api-key": GraphQL_API_KEY,
  },
});

export default async function (req, res) {
    console.log(req.body.courseId);
  const courseId = req.body.courseId; // Extract courseId from the request query

  // Ensure courseId is provided
  if (!courseId) {
    return res.status(400).json({ error: 'Missing courseId' });
  }

  try {
    //const courseData = await getCourse(courseId);
    const cd = await client.request(querygen("getCohortById", courseId));
    const courseData = cd.queryCohortsByIdPermalinkIndex.items[0];

    // If the course doesn't exist, return an error
    if (!courseData) {
      return res.status(404).json({ error: `Course with ID ${courseId} not found` });
    }

    // Send the course data in response
    res.status(200).json(courseData);
  } catch (error) {
    // Handle any errors that occurred while fetching course data
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching course data' });
  }
};