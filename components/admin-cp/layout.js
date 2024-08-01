import Navbar from './navbar';
import { useState, useEffect } from 'react';
import get_jwt from '../../lib/frontend_functions/get_jwt';
import verify_session from '../../lib/verify_session';
import get_user_data from '../../lib/get_user_data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children}){
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
  
    return(
        <>
        <ToastContainer />
        <Navbar/>
        { admin === "1" ? (<>{children}</>) : (<p>404</p>) }
        </>
        )
}