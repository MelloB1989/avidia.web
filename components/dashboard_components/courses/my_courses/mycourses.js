import CourseCard from './course_card';
import { useEffect, useState } from 'react';
import get_mycourses from '../../../../lib/frontend_functions/lms/get_course_details';

export default function mycourses( {user_data} ) {
    
    const [courses, MyCourses] = useState();
    
    
    useEffect(() => {
        const gt = async () => {
      try{
          if(!courses){
          const c = await get_mycourses(user_data.user_id);
          console.log(c)
          MyCourses(c);
          }
      }
      catch(e){
          console.log(e);
      }
        }
        gt();
    });
    //console.log(courses)
    return (
        <>
        <h1>&nbsp;&nbsp;Your Courses</h1>
        {courses?.map((course) => {
            return <CourseCard key={course.id} course_detail={course.db} course_id={course.id}/>
        })}
        </>
        )
}