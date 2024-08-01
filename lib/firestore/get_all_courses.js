const admin = require('../firestore_auth');
import { GraphQLClient } from 'graphql-request';

const getAllCourses = async (n) => {
    const db = admin.firestore();
  try {
    const collectionRef = db.collection("courses");

    // Get the first 'n' courses from the collection
    const querySnapshot = await collectionRef.limit(n).get();

    const courses = [];
    querySnapshot.forEach((doc) => {
      // Assuming each document has a field called 'courseName', you can access other fields similarly.
      const course = { id: doc.id, ...doc.data() };
      courses.push(course);
    });
    //console.log(courses[0].episodes)
    return courses;
  } catch (error) {
    console.error("Error getting courses: ", error);
    return [];
  }
}

module.exports = getAllCourses;
/*Usage
getAllCourses(1);
*/