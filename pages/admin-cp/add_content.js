import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import get_jwt from '../../lib/frontend_functions/get_jwt';
import verify_session from '../../lib/verify_session';
import Navbar from '../../components/admin-cp/navbar';
import get_user_data from '../../lib/get_user_data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddContent() {
  
  const [userData, setUserData] = useState('');
  const [admin, setAdmin] = useState("0");
  
  useEffect(() => {
    const jwt = get_jwt();
    if(jwt){
      verify_session(jwt)
      .then((result) => {
        if (result === 1) {
          // Session is valid, continue with your main code logic here
          //console.log("Session is valid!");
          get_user_data(jwt)
          .then((udata) => {
            if(udata !== null){
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
  
  const [courseId, setCourseId] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [episodeId, setEpisodeId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [password, setPass] = useState('');
  const [episodeName, setEpisodeName] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [moduleContent, setModuleContent] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('/api/admin-cp/add_content', {
      courseId,
      episodeId,
      lessonId,
      moduleId,
      episodeName,
      lessonName,
      moduleName,
      moduleContent,
      password
    });

    // If the request was successful, axios will not throw an error
    alert(response.data.message || 'Content added successfully!');
    // Optionally reset form values here
    //setCourseId('');
    //setEpisodeName('');
    //setLessonName('');
    setModuleName('');
    setModuleContent('');
  } catch (error) {
    console.error('Failed to submit form:', error);
    // If the API call failed, axios throws an error, and you can get more details from error.response.data
    alert(error.response?.data?.error || 'An error occurred.');
  }
};

  return (
      <>
      { admin === "1" ? (
        <>
        <ToastContainer />
        <Navbar/>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseId" className="form-label">Course ID</label>
          <input type="text" className="form-control" id="courseId" value={courseId} onChange={e => setCourseId(e.target.value)} />
        </div>
        <div className="form-outline" style={{ width: "22rem" }}>
  <label className="form-label" htmlFor="typeNumber">
    Episode ID
  </label>
  <input
    defaultValue={1}
    value={episodeId}
    onChange={(e) => {setEpisodeId(e.target.value)}}
    type="number"
    id="typeNumber"
    className="form-control"
  />
</div>
<div className="form-outline" style={{ width: "22rem" }}>
  <label className="form-label" htmlFor="typeNumber">
    Lesson ID
  </label>
  <input
    defaultValue={1}
        value={lessonId}
    onChange={(e) => {setLessonId(e.target.value)}}
    type="number"
    id="typeNumber"
    className="form-control"
  />
</div>
<div className="form-outline" style={{ width: "22rem" }}>
  <label className="form-label" htmlFor="typeNumber">
    Module ID
  </label>
  <input
    defaultValue={1}
        value={moduleId}
    onChange={(e) => {setModuleId(e.target.value)}}
    type="number"
    id="typeNumber"
    className="form-control"
  />
</div>

        <div className="mb-3">
          <label htmlFor="episodeName" className="form-label">Episode Name</label>
          <input type="text" className="form-control" id="episodeName" value={episodeName} onChange={e => setEpisodeName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="lessonName" className="form-label">Lesson Name</label>
          <input type="text" className="form-control" id="lessonName" value={lessonName} onChange={e => setLessonName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="moduleName" className="form-label">Module Name</label>
          <input type="text" className="form-control" id="moduleName" value={moduleName} onChange={e => setModuleName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="moduleContent" className="form-label">Module Content</label>
          <textarea className="form-control" id="moduleContent" rows="3" value={moduleContent} onChange={e => setModuleContent(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="moduleName" className="form-label">Password</label>
          <input type="password" className="form-control" id="moduleName" value={password} onChange={e => setPass(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Content</button>
      </form>
    </div>
    </>
    ) : (<p>You do not have access to this page!</p>)
      }
    </>
  );
}
