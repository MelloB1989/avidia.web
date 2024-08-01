import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../../../components/lms_components/dashboard/student/sidebarcourse';
import Layout from '../../../components/lms_components/layout/protected';
import get_user_data from '../../../lib/get_user_data';
import LiveSessions from '../../../components/lms_components/dashboard/student/live_sessions';
import QuizContests from '@/components/lms_components/dashboard/student/quiz_contests';
import Handouts from '@/components/lms_components/dashboard/student/course_handouts';
import Project from '@/components/lms_components/dashboard/student/projects';

export default function ViewCourse(){
    
  const router = useRouter();
  const { courseId } = router.query;
  const [course_details, setCourseDetails] = useState({});
  const [userData, setUserData] = useState('');
  const [sidebar_view, setSidebar] = useState("handouts");
  
  const change_view = (view) => {
    setSidebar(view);
    //console.log(view);
  }
  
  useEffect(() => {
      // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    
    if (jwt_token) {
          get_user_data(jwt_token)
          .then((udata) => {
            if(udata !== null){
              setUserData(udata);
            }
          })
          .catch((error) => {
            console.log(error)
          })
          
        } else {
          // Session is invalid, the user has been redirected to the login page
          console.log("Session is invalid. User redirected to login page.");
        }
    
    if (!router.isReady) return; // Wait until router.isReady is true

    const formData = new URLSearchParams();
    formData.append('courseId', courseId);
    axios.post('/api/lms/courses/get_course_details', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
      },
    })
    .then((response) => {
      if(response.status === 200){
        //console.log("RES: ", response);
        setCourseDetails(response.data);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      router.push('/404');
    });
}, [router.isReady]);
    
    return(
        <Layout title={`${course_details?.name} || Dashboard`}>
            <a className="close_side_menu" href="javascript:void(0);" />
            <br/><br/>
  <div className="rbt-page-banner-wrapper">
    {/* Start Banner BG Image  */}
    <div className="rbt-banner-image" />
    {/* End Banner BG Image  */}
  </div>
  {/* Start Card Style */}
    <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row g-5">
            <div className="col-lg-3">
              {/* Start Dashboard Sidebar  */}
               <Sidebar first_name={userData.first_name} last_name={userData.last_name} change_view={change_view} course_id={courseId} /> 
              {/* End Dashboard Sidebar  */}
            </div>
            <div className="col-lg-9">
              <div className="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
                <div className="content">
                  <div className="section-title">
                    <h4 className="rbt-title-style-3">{sidebar_view === "live" ? "Live Sessions" : sidebar_view === "quiz" ? "Quizzes" : sidebar_view === "handouts" ? "My Handouts" : sidebar_view === "challenge" ? "My Projects" : "My settings"}</h4>
                  </div>
                  {sidebar_view === "live" ? <LiveSessions course_id={courseId} /> : sidebar_view === "quiz" ? <QuizContests course_id={courseId}/> : sidebar_view === "handouts" ? <Handouts course_id={courseId}/> : sidebar_view === "challenge" ? <Project course_id={courseId}/> : <div className="col-12"><h3 className="text-center">Coming soon</h3></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
        </Layout>
        )
}