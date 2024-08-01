import verify_session from '../../../lib/verify_session';
import get_access_jwt from '../../../lib/frontend_functions/get_access_jwt';
import get_user_data from '../../../lib/get_user_data';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Layout({ children, title }) {
    const [userData, setUserData] = useState('');
    //let access_token;
        
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
              const formData = new URLSearchParams();
              formData.append('user_id', udata.user_id);
              const rep = axios.post('/api/user/set_access', formData, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
                },
              });

      if (rep.status === 200 && rep.data.success) {
        // Redirect to the dashboard page upon successful authentication
        const access_token = get_access_jwt();
      } else {
        console.log('Error while generating access token');
        //window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      }
            }
          })
          .catch((error) => {
            console.log(error)
            const message = encodeURIComponent('Please login first');
  const nextUrl = encodeURIComponent(window.location.pathname);
  window.location.href = `/login?message=${message}&nextUrl=${nextUrl}`;
  document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          })
          
        } else {
          // Session is invalid, the user has been redirected to the login page
          console.log("Session is invalid. User redirected to login page.");
          const message = encodeURIComponent('Please login first');
  const nextUrl = encodeURIComponent(window.location.pathname);
  window.location.href = `/login?message=${message}&nextUrl=${nextUrl}`;
  document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during token verification or axios request
        console.error("Error while verifying session:", error);
        const message = encodeURIComponent('Please login first');
  const nextUrl = encodeURIComponent(window.location.pathname);
  window.location.href = `/login?message=${message}&nextUrl=${nextUrl}`;
  document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      });
    }
    else {
      // If the ACCESS_TOKEN cookie is not available, the user is not authenticated
      const message = encodeURIComponent('Please login first');
  const nextUrl = encodeURIComponent(window.location.pathname);
  window.location.href = `/login?message=${message}&nextUrl=${nextUrl}`;
  document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }, []);
    
  return (
    <>
      <Head>
      <title>{title}</title>
      <meta name="robots" content="noindex, follow" />
  <meta name="description" content="Join the Avidia Cohort, a comprehensive 6-month program designed for first-year B.Tech students to master C programming, web development, and Python. Benefit from our AI-powered LMS platform, 24/7 AI mentor support, weekly live Q&A sessions with expert mentors, and access to the Zenith+ premium community for peer-to-peer learning and collaboration. Launching on 29th September 2024." />
  <meta name="keywords" content="Avidia Cohort, B.Tech, C programming, web development, Python, AI-powered LMS, AI mentor support, Zenith+ premium community, peer-to-peer learning, collaboration"/>
  <meta name="author" content="Avidia"/>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  {/* Favicon */}
  <link
    rel="shortcut icon"
    type="image/x-icon"
    href="https://avidia.in/assets/images/logo.png"
  />
      </Head>
      { userData ? (<div>{children}</div>) : (<p></p>)}
    </>
  );
}