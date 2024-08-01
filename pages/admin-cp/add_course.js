import get_jwt from '../../lib/frontend_functions/get_jwt';
import verify_session from '../../lib/verify_session';
import get_user_data from '../../lib/get_user_data';
import { useState, useEffect } from 'react';
import Navbar from '../../components/admin-cp/navbar';
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Code-Editor
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { monokai } from '@uiw/codemirror-theme-monokai';
const extensions = [javascript({ jsx: true })];

const model = ``;

export default function AddCourse() {

  const [userData, setUserData] = useState('');
  const [courseId, setCourseId] = useState('');
  const [code, setCode] = useState(model);
  const [admin, setAdmin] = useState("0");

  const handlePush = () => {
    try {
      const rep = axios.post('/api/admin-cp/add_course', {
        course_id: courseId,
        data: code,
        password: "SDSw4%RGSKTRtgnj4rewt44"
      });
      toast.success("Course added!");
    }
    catch (e) {
      toast.success(e);
    }
  }

  useEffect(() => {
    const jwt = get_jwt();
    if (jwt) {
      verify_session(jwt)
        .then((result) => {
          if (result === 1) {
            // Session is valid, continue with your main code logic here
            //console.log("Session is valid!");
            get_user_data(jwt)
              .then((udata) => {
                if (udata !== null) {
                  setUserData(udata);
                  setAdmin(udata.admin);
                }
              })
              .catch((error) => {
                console.log(error)
                window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
              })

          } else {
            // Session is invalid, the user has been redirected to the login page
            console.log("Session is invalid. User redirected to login page.");
            window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during token verification or axios request
          console.error("Error while verifying session:", error);
          window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        });
    }
    else {
      // If the ACCESS_TOKEN cookie is not available, the user is not authenticated
      window.location.href = '/login';
    }
  }, []);
  /*
    const onChange = (value) => {
    //console.log('value:', value);
    setCode(value);
  }*/
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
    setCode(value);
  }, []);

  return (
    <>
      {admin === "1" ? (<>
        <ToastContainer />
        <Navbar />
        <style>
          {
            `
            .MainContainer{
              max-width:100vw;
              min-height:80vh;
              padding:3rem;
              overflow-x:hidden;
            }
            .Button{
              font-size:1.5rem;
              padding:0.9rem;
              color:#fff;
              width:100px;
              height:50px;
              background-color:#2a2f3f;
              opacity:0.93;
              overflow:hidden;
              margin:0 1.2rem;
            }
            .Button:hover{
              color:#ed9e0c;
              filter:drop-shadow(0 0 5px #ed9e0c)
            }
            `
          }
        </style>
        <div className="MainContainer">
          <div className="mx-3 my-3">
            <div className="mb-3 my-3">
              <label htmlFor="courseId" className="form-label">Course ID</label>
              <input type="text" className="form-control mb-5" id="courseId" value={courseId} onChange={e => setCourseId(e.target.value)} />
            </div>
            <CodeMirror
              value={code}
              height="450px"
              theme={monokai}
              onChange={onChange}
              extensions={[javascript({ jsx: true })]}
            />
            <div className='mb-5'></div>
            <a href="#" onClick={(e) => {
              e.preventDefault;
              setCode(model);
              //toast.error("Hi");
            }} className="Button">
              Reset workspace
            </a>
            <a href="#" onClick={(e) => {
              e.preventDefault;
              handlePush();
              //toast.error("Hi");
            }} className="Button">
              Push to DB
            </a>
            <a href="#" onClick={(e) => {
              e.preventDefault;
              const formData = new URLSearchParams();
              formData.append('courseId', courseId);
              axios.post('/api/lms/courses/get_course_details', formData, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
                },
              })
                .then((response) => {
                  if (response.status === 200) {
                    //console.log("RES: ", response);
                    toast.success("Success!");
                    setCode(JSON.stringify(response.data, null, 2));
                  }
                })
                .catch((error) => {
                  toast.error("Failed to fetch from DB " + error);
                });
              //toast.error("Hi");
            }} className="Button">
              Get details from DB
            </a>
          </div>
        </div>
      </>) : (
        <p></p>
      )
      }
    </>
  )
}
/*
{
  "des": "The Avidia Cohort is a 6-month comprehensive program designed for first-year B.Tech students. It provides a complete learning journey from basic to advanced levels of C programming, web development (HTML, CSS, JS), and Python, along with additional benefits like 24/7 AI mentors, expert mentor guidance, and access to the Zenith+ premium community.",
  "labs": [
    "vs_code"
  ],
  "thumb": "https://au-spot.s3.ap-south-1.amazonaws.com/assets/AVIDIA1.jpg",
  "price_inr": "Coming soon!",
  "name": "Avidia Cohort",
  "type": "paid",
  "intercept": "The Avidia Cohort is a 6-month comprehensive program designed for first-year B.Tech students.",
  "preview_video": "https://youtu.be/cSGiXjpUWmE?si=n2iMoOBWWsMufLBO",
  "start_date": {
    "_seconds": 1696897800,
    "_nanoseconds": 16000000
  },
  "number_enrolled": "0",
  "requirements": [
    "Active internet connection",
    "A laptop"
  ],
  "instructors": [{
    "des": "Lisa a AI model fine tuned on several articles and podcasts on C language, thus being someone who can guide you the best.",
    "name": "Lisa AI",
    "pfp": "https://au-spot.s3.ap-south-1.amazonaws.com/assets/lisa1.jpg"
  },
                  {
    "des": "Mastor tutor at Avidia",
    "name": "Anjali Arya",
    "pfp": "https://au-spot.s3.ap-south-1.amazonaws.com/assets/team/anjali.png"
    }
  ],
  "catch_line": "Cohort 2024: A one stop solution to all your academic problems."
}
*/