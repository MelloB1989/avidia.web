import get_courses from '../firestore/get_courses';

const SECRET_KEY = process.env.JWT_KEY; // Replace this with a long and secure random string

const course_access = async (userId, course) => {
    var access = false;
    try {
        const courses = await get_courses(userId)
        courses.map((available_course) => {
          if(available_course.id === course) access = true;
        });
        return access;
        }
     catch (error) {
      return error;
    }
}

module.exports = course_access;