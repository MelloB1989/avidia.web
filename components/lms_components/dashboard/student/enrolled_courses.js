import { useState, useEffect } from 'react';
import get_mycourses from '../../../../lib/frontend_functions/lms/get_course_details';
import CourseCard from './course_card';
import Skeleton from 'react-loading-skeleton';

export default function Courses({access_token, user_data}){
  
  const [courses, MyCourses] = useState();
  const [loading, setLoading] = useState(true);
    
     useEffect(() => {
        const gt = async () => {
      try{
          if(!courses){
          const c = await get_mycourses(user_data.user_id);
          //console.log(c)
          MyCourses(c);
          setLoading(false);
          }
      }
      catch(e){
          console.log(e);
      }
        }
        gt();
    });
    //console.log(courses?.length);
    return(
      loading ? (<Skeleton height={300}/>) : (
        <div className="col-lg-9">

      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="home-4"
          role="tabpanel"
          aria-labelledby="home-tab-4"
        >
          <div className="row g-5">
           {!(courses?.length === 0) ? courses?.map((course) => {
            return <CourseCard key={course.id} course_detail={course.db} course_id={course.id}/>
        }) : <h1>No enrolled courses</h1>}
          </div>
        </div>
      </div>
      </div>
      )
        )
}