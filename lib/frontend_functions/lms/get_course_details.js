//NO NEED FOR USER AUTHENTICATION
import axios from 'axios';
import getCourses from './get_mycourses';

const get_course_details = async (user_id) => {
  try {
    const user_courses = await getCourses(user_id); // Await the getCourses() function to get the actual courses array
    //console.log(user_courses);
    const course_details_arr = await Promise.all(
      user_courses.map(async (course) => {
        try {
          // Prepare request
          const formData = new URLSearchParams();
          formData.append('courseId', course.id);
          const r = await axios.post('/api/lms/courses/get_course_details', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
            },
          });
          //console.log(r);
          if (r.status === 200) {
            return { db: r.data, id: course.id };
          } else {
            // Session is invalid, the user has been redirected to the login page
            console.log('Error occurred! API not reachable.');
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );

    return course_details_arr;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = get_course_details;
