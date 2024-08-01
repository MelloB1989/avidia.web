import { useRouter } from 'next/router';
//import { useState, useEffect } from "react";
import {useState, useEffect} from 'react';
import ProtectedLayout from '../../components/lms_components/layout/protected-raw';
import AvidiaMeet from '../../components/modes/live_sessions/meet';
import get_user_data from '../../lib/get_user_data';

export default function LiveSessions(){
    
    const [userData, setUserData] = useState('');
    
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
}, []);
    
    const router = useRouter();
    const { session } = router.query;
    return(
        <ProtectedLayout title="Live sessions || Avidia">
        <AvidiaMeet meet_id={session} name={userData?.first_name+" "+userData.last_name} email={userData?.email}/>
        </ProtectedLayout>
        )
}