import Heads from '../common/header';
import Footer from '../common/footer';
import verify_session from '../../../lib/verify_session';
import get_access_jwt from '../../../lib/frontend_functions/get_access_jwt';
import get_user_data from '../../../lib/get_user_data';
import { UserContext } from './UserContext';
import { useEffect, useContext } from 'react';
import {ASSETS_CDN_URL} from '@/unprotected_config';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

export default function Layout({ children, title }) {
  const { userData, setUserData } = useContext(UserContext);
  
  function loadExternalScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}
    
    useEffect(()=>{
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/main.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/modernizr.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/bootstrap.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/sal.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/swiper.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/magnify.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-appear.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/odometer.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/backtotop.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/isotop.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/imageloaded.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/wow.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/waypoint.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/easypie.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/text-type.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-one-page-nav.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/bootstrap-select.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-ui.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/magnify-popup.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/paralax-scroll.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/paralax.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/countdown.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/plyr.js`);
    
  }, []);
        
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
      <Heads title={title}/>
      { userData ? (<div>{children}</div>) : (<Skeleton height={600}/>)}
      <Footer />
    </>
  );
}