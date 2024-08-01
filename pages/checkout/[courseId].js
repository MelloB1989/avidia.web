import Checkout from '../../components/lms_components/checkout/new';
import Layout from '../../components/lms_components/layout/protected-raw';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CheckoutPage(){
    
  const router = useRouter();
  const { courseId } = router.query;
  const [success, setSuccess] = useState('');
  
  const change_success = (status) => {
    setSuccess(status);
  }
  
//   useEffect(() => {
//     if (!router.isReady) return; // Wait until router.isReady is true
//     //const d = axios.post()
//     // const formData = new URLSearchParams();
//     // formData.append('courseId', courseId);
//     // axios.post('/api/lms/courses/get_course_details', formData, {
//     //   headers: {
//     //     'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
//     //   },
//     // })
//     // .then((response) => {
//     //   if(response.status === 200){
//     //     //console.log("RES: ", response);
//     //     setCourseDetails(response.data);
//     //   }
//     // })
//     // .catch((error) => {
//     //   console.error("Error: ", error);
//     //   router.push('/404');
//     // });
// }, [router.isReady]);
  
    return(
        <>
        <Layout title="Checkout || Avidia">
       { success === '' ? (<Checkout change_success={change_success} course_id={courseId} />):(
       <>
        <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-error-area bg-gradient-11 rbt-section-gap">
    <div className="error-area">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-10">
            <h1 className="title"> 🥳</h1>
            <h3 className="sub-title">You registration for cohort was successful. You will soon receive a <strong>conformation mail.</strong> </h3>
            <p>You will soon receive a mail with the whatsapp group invite.</p>
            <a className="rbt-btn btn-gradient icon-hover" href="/">
              <span className="btn-text">Back To Home</span>
              <span className="btn-icon">
                <i className="feather-arrow-right" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rbt-separator-mid">
    <div className="container">
      <hr className="rbt-separator m-0" />
    </div>
  </div>
       </>
       )}
        </Layout>
        </>
        )
}