import get_jwt from '../get_jwt';
import axios from 'axios';

const get_mycourses = async (user_id) => {
  try {
      const jwt_token = get_jwt();
      //Prepare request
            const formData = new URLSearchParams();
            formData.append('token', jwt_token);
            formData.append('user_id', user_id);
            const r = await axios.post('/api/lms/courses/get_user_courses', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
        //console.log(r);
        if (r.status === 200){
            return r.data;
        }
        else {
          // Session is invalid, the user has been redirected to the login page
          console.log("Error occured! API not reachable.");
          return null;
        }
    }
   catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = get_mycourses;