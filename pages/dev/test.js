import Heads from '../../components/lms_components/common/header';
import Footer from '../../components/lms_components/common/footer';
import Dashboard from '../../components/lms_components/dashboard/student/index';
import verify_session from '../../lib/verify_session';
import get_user_data from '../../lib/get_user_data';
import { useEffect, useState } from 'react';

export default function Test(){
        const [userData, setUserData] = useState('');
        
        useEffect(() => {
    // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //console.log(jwt_token)

    if (jwt_token) {
      verify_session(jwt_token)
      .then((result) => {
        if (result === 1) {
          // Session is valid, continue with your main code logic here
          //console.log("Session is valid!");
          get_user_data(jwt_token)
          .then((udata) => {
            if(udata !== null){
              setUserData(udata);
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
        <Heads title={"Avidia || Cohort"}/>
        <Dashboard userData={userData}/>
        <Footer/>
        </>
        )
}