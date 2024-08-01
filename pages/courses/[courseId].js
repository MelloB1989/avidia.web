import Layout from '../../components/lms_components/layout/common';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'

export default function CourseDetailsPage(){
    
  const router = useRouter();
  const { courseId } = router.query;
  
  const [course_details, setCourseDetails] = useState({});
  const [course_structure, setCourseStructure] = useState({});
  const [formattedDate, setDate] = useState();
  
    const { loading, error, data } = useQuery(querygen("getCohort", courseId));
      if(error) router.push('/404');
      
      function Instructor({ instructorId }) {
        const { loading, error, data } = useQuery(querygen("getInstructor", instructorId));
        if(loading) return(<Skeleton height={150}/>);
        if(data){
          const instructor = data.getInstructor;
        return(
          <>
          <div key={instructor.name}>
                <div className="media align-items-center">
                  <div className="thumbnail">
                    <a href="#">
                      <img
                        src={instructor.profile}
                        alt="Tutors"
                        height="50px"
                        width="50px"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <div className="author-info">
                      <h5 className="title">
                        <a
                          className="hover-flip-item-wrapper"
                          href={`https://spaces.noobsverse.com/${instructor.nbspUsername}`}
                        >
                          {instructor.name}
                        </a>
                      </h5>
                      <span className="b3 subtitle">{instructor.designation}</span>
                    </div>
                    <div className="content">
                      <p className="description">
                        {instructor.description}
                      </p>
                      <ul className="social-icon social-default icon-naked justify-content-start">
                        <li>
                          <a href="#">
                            <i className="feather-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="feather-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="feather-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="feather-linkedin" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <br/><br/>
                  </div>
          </>
          )
        }
      }
  
   useEffect(() => {
    if (!router.isReady) return;

    const formData = new URLSearchParams();
    formData.append('courseId', courseId);
    
    if(data){
      setCourseDetails(data.queryCohortsByIdPermalinkIndex.items[0]);
      let date = new Date(parseInt(data.queryCohortsByIdPermalinkIndex.items[0].startDate, 10) * 1000);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let formattedDate = year + "-" + String(month).padStart(2, '0') + "-" + String(day).padStart(2, '0');
      setDate(formattedDate);
    }
    axios.post('/api/lms/courses/get_course_structure', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      if(response.status === 200){
        setCourseStructure(response.data.structure);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      router.push('/404');
    });
}, [router.isReady, data]);
    return(
        <>
        <Layout title={`${course_details.name ? course_details.name : "Courses"} || Avidia`}>
        {loading ? (<p>Loading...</p>) : (
        <>
  {/* Start breadcrumb Area */}
  <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
    <div className="breadcrumb-inner">
      <img src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/bg/bg-image-10.jpg" alt="Education Images" />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="content text-start">
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right" />
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">Web Development</li>
            </ul>
            <h2 className="title">
              {course_details.catchLine}
            </h2>
            <p className="description">
              {course_details.description}
            </p>
            <br/>
            <div className="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
              <div className="feature-sin best-seller-badge">
                <span className="rbt-badge-2">
                  <span className="image">
                    <img
                      src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/card-icon-1.png"
                      alt="Best Seller Icon"
                    />
                  </span>{" "}
                  Bestseller
                </span>
              </div>
              
              <div className="feature-sin total-rating">
                <a className="rbt-badge-4" href="#">
                  Latest
                </a>
              </div>
              <div className="feature-sin total-student">
                <span></span>
              </div>
            </div>
            <ul className="rbt-meta">
              <li>
                <i className="feather-globe" />
                English, Telugu, Hindi
              </li>
              <li>
                <i className="feather-award" />
                Certified Course
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumb Area */}
  <div className="rbt-course-details-area ptb--60">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-8">
          <div className="course-details-content">
            <div className="rbt-course-feature-box rbt-shadow-box thuumbnail">
              <img
                className="w-100"
                src={course_details.thumb}
                alt="Card image"
              />
            </div>
            <div className="rbt-inner-onepage-navigation sticky-top mt--30">
              <nav className="mainmenu-nav onepagenav">
                <ul className="mainmenu">
                  <li className="current">
                    <a href="#overview">Overview</a>
                  </li>
                  <li>
                    <a href="#coursecontent">Course Content</a>
                  </li>
                  <li>
                    <a href="#details">Details</a>
                  </li>
                  <li>
                    <a href="#intructor">Intructor</a>
                  </li>
                  <li>
                    <a href="#review">Review</a>
                  </li>
                </ul>
              </nav>
            </div>
            {/* Start Course Feature Box  */}
            <div
              className="rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30 has-show-more"
              id="overview"
            >
              <div className="rbt-course-feature-inner has-show-more-inner-content">
                <div className="section-title">
                  <h4 className="rbt-title-style-3">What you'll learn</h4>
                </div>
                <p>
                  {course_details.description}{" "}
                </p>
                <div className="row g-5 mb--30">
                  {/* Start Feture Box  */}
                  <div className="col-lg-6">
                    <ul className="rbt-list-style-1">
                      <li>
                        <i className="feather-check" />
                        Personalized Learning: Lisa, the AI-powered tutor, provides personalized, real-time guidance to enhance the learning experience.
                      </li>
                      <li>
                        <i className="feather-check" />
                        No Installation Required: Cloud labs allow access to essential desktop applications directly from a web browser, eliminating installation hassles.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Comprehensive Curriculum: Covers essential topics from basic to advanced levels in C programming, web development, and Python.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Interactive Learning: The platform promotes active engagement and interaction, making the learning process more dynamic.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Real-Time Support: Immediate support and feedback are provided, promoting continuous improvement and building confidence.
                      </li>
                    </ul>
                  </div>
                  {/* End Feture Box  */}
                  {/* Start Feture Box  */}
                  <div className="col-lg-6">
                    <ul className="rbt-list-style-1">
                      <li>
                        <i className="feather-check" />
                        Accessible Anywhere: Being a browser-based solution, it is accessible from any device with an internet connection.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Cost-Effective: Eliminates the need for expensive software and hardware, making it a cost-effective solution for students.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Time-Saving: Streamlines the learning process by providing all necessary tools and guidance in one platform.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Peer Interaction: Opportunities for interaction with other students, fostering a sense of community and collaborative learning.
                      </li>
                      <li>
                        <i className="feather-check" />
                        Regular Updates: The platform is continuously updated based on user feedback and needs, ensuring it stays relevant and helpful.
                      </li>
                    </ul>
                  </div>
                  {/* End Feture Box  */}
                </div>
              </div>
              <div className="rbt-show-more-btn">Show More</div>
            </div>
            {/* End Course Feature Box  */}
            {/* Start Course Content  */}
            <div
              className="course-content rbt-shadow-box coursecontent-wrapper mt--30"
              id="coursecontent"
            >
              <div className="rbt-course-feature-inner">
                <div className="section-title">
                  <h4 className="rbt-title-style-3">Course Content</h4>
                </div>
                <div className="rbt-accordion-style rbt-accordion-02 accordion">
                  <div className="accordion" id="accordionExampleb2">
                    <div className="accordion-item card">
  {course_details?.syllabus?.map((topic, index) => (
    <div key={index}>
      <h2 className="accordion-header card-header" id={`heading${index}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded="true"
          aria-controls={`collapse${index}`}
        >
          {topic}
          <span className="rbt-badge-5 ml--10">Full syllabus</span>
        </button>
      </h2>
      <div
        id={`collapse${index}`}
        className="accordion-collapse collapse show"
        aria-labelledby={`heading${index}`}
        data-bs-parent="#accordionExampleb2"
      >
        <div className="accordion-body card-body pr--0">
          <ul className="rbt-course-main-content liststyle">
            {episode.lessons.map((lesson, index) => (
              <li key={index}>
                <a href="#">
                  <div className="course-content-left">
                    <i className="feather-play-circle" />
                    <span className="text">{lesson.lesson_name}</span>
                  </div>
                  <div className="course-content-right">
                    <span className="min-lable">30 min</span>
                    <span className="rbt-badge variation-03 bg-primary-opacity">
                      <i className="feather-eye" /> Preview
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ))}
</div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Course Content  */}
            {/* Start Course Feature Box  */}
            <div
              className="rbt-course-feature-box rbt-shadow-box details-wrapper mt--30"
              id="details"
            >
              <div className="row g-5">
                {/* Start Feture Box  */}
                <div className="col-lg-6">
                  <div className="section-title">
                    <h4 className="rbt-title-style-3 mb--20">Requirements</h4>
                  </div>
                  <ul className="rbt-list-style-1">
                    {course_details?.requirements?.map((requirement, index) => {
                      return(
                        <li key={index}>
                      <i className="feather-check" />
                      {requirement}
                    </li>
                      )
                    })}
                  </ul>
                </div>
                {/* End Feture Box  */}
                {/* Start Feture Box  */}
                <div className="col-lg-6">
                  <div className="section-title">
                    <h4 className="rbt-title-style-3 mb--20">Offerings</h4>
                  </div>
                  <ul className="rbt-list-style-1">
                     {course_details?.offerings?.map((offering, index) => {
                      return(
                        <li key={index}>
                        <i className="feather-check" />
                        {offering}
                      </li>
                      )
                     })}
                  </ul>
                </div>
                {/* End Feture Box  */}
              </div>
            </div>
            {/* End Course Feature Box  */}
            {/* Start Intructor Area  */}
            <div
              className="rbt-instructor rbt-shadow-box intructor-wrapper mt--30"
              id="intructor"
            >
              <div className="about-author border-0 pb--0 pt--0">
                <div className="section-title mb--30">
                  <h4 className="rbt-title-style-3">Instructor</h4>
                </div>
                {course_details.instructors?.map((instructorId) => { return (
                <Instructor instructorId={instructorId}/>
                  )})
                }
              </div>
            </div>
            {/* End Intructor Area  */}
            
            <div className="about-author-list rbt-shadow-box featured-wrapper mt--30 has-show-more">
              <div className="section-title">
                <h4 className="rbt-title-style-3">Featured review</h4>
              </div>
              <div className="has-show-more-inner-content rbt-featured-review-list-wrapper">
                <div className="rbt-course-review about-author">
                  <div className="media">
                    <div className="thumbnail">
                      <a href="#">
                        <img
                          src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/testimonial/testimonial-3.jpg"
                          alt="Author Images"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <div className="author-info">
                        <h5 className="title">
                          <a className="hover-flip-item-wrapper" href="#">
                            Unavailable
                          </a>
                        </h5>
                        <div className="rating">
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </div>
                      </div>
                      <div className="content">
                        <p className="description">
                          Currently Unavailable
                        </p>
                        <ul className="social-icon social-default transparent-with-border justify-content-start">
                          <li>
                            <a href="#">
                              <i className="feather-thumbs-up" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="feather-thumbs-down" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rbt-show-more-btn">Show More</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="course-sidebar sticky-top rbt-shadow-box course-sidebar-top rbt-gradient-border">
            <div className="inner">
              {/* Start Viedo Wrapper  */}
              <a
                className="video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15"
                href={course_details.previewVideo}
                onClick={(e)=>e.preventDefault}
              >
                <div className="video-content">
                  <img
                    className="w-100 rbt-radius"
                    src={course_details.thumb}
                    alt="Video Images"
                  />
                  <div className="position-to-top">
                    <span className="rbt-btn rounded-player-2 with-animation">
                      <span className="play-icon" />
                    </span>
                  </div>
                  <span className="play-view-text d-block color-white">
                    <i className="feather-eye" /> Preview this course
                  </span>
                </div>
              </a>
              {/* End Viedo Wrapper  */}
              <div className="content-item-content">
                <div className="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between">
                  <div className="rbt-price">
                    <span className="current-price">₹{course_details.priceInr}</span>
                    <span className="off-price">₹8499.99</span>
                  </div>
                  <div className="discount-time">
                    <span className="rbt-badge color-danger bg-color-danger-opacity">
                      <i className="feather-clock" /> Enroll now!
                    </span>
                  </div>
                </div>
                {/*<div className="add-to-card-button mt--15">
                  <a
                    className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
                    href="#"
                  >
                    <span className="btn-text">Add to Cart</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                  </a>
                </div>*/}
                <div className="buy-now-btn mt--15">
                  <a
                    className="rbt-btn btn-border icon-hover w-100 d-block text-center"
                    href={`/checkout/${courseId}`}
                  >
                    <span className="btn-text">Buy Now</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                  </a>
                </div>
                <span className="subtitle">
                  <i className="feather-info" /> Powered by NBL
                </span>
                <div className="rbt-widget-details has-show-more">
                  <ul className="has-show-more-inner-content rbt-course-details-list-wrapper">
                    <li>
                      <span>Start Date</span>
                      <span className="rbt-feature-value rbt-badge-5">
                          {formattedDate}
                      </span>
                    </li>
                    <li>
                      <span>Internship Opportunities</span>
                      <span className="rbt-feature-value rbt-badge-5">Yes</span>
                    </li>
                    <li>
                      <span>Hands on projects</span>
                      <span className="rbt-feature-value rbt-badge-5">
                        Yes
                      </span>
                    </li>
                    <li>
                      <span>Language</span>
                      <span className="rbt-feature-value rbt-badge-5">
                        English, Hindi and Telugu
                      </span>
                    </li>
                    <li>
                      <span>Quizzes</span>
                      <span className="rbt-feature-value rbt-badge-5">Unlimited</span>
                    </li>
                    <li>
                      <span>Certificate</span>
                      <span className="rbt-feature-value rbt-badge-5">Yes</span>
                    </li>
                    <li>
                      <span>Pass Percentage</span>
                      <span className="rbt-feature-value rbt-badge-5">85%</span>
                    </li>
                  </ul>
                  <div className="rbt-show-more-btn">Show More</div>
                </div>
                <div className="social-share-wrapper mt--30 text-center">
                  <div className="rbt-post-share d-flex align-items-center justify-content-center">
                    <ul className="social-icon social-default transparent-with-border justify-content-center">
                      <li>
                        <a href="https://www.facebook.com/">
                          <i className="feather-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com/noobs_learning">
                          <i className="feather-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/noobs_learning">
                          <i className="feather-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/">
                          <i className="feather-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <hr className="mt--20" />
                  <div className="contact-with-us text-center">
                    <p>For details about the course</p>
                    <p className="rbt-badge-2 mt--10 justify-content-center w-100">
                      <i className="feather-phone mr--5" /> Call Us:{" "}
                      <a href="#">
                        <strong>+91 7569236628</strong>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
  {/* Start Course Action Bottom  */}
  <div className="rbt-course-action-bottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6">
          <div className="section-title text-center text-md-start">
            <h5 className="title mb--0">
              {course_details.name}
            </h5>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 mt_sm--15">
          <div className="course-action-bottom-right rbt-single-group">
            <div className="rbt-single-list rbt-price large-size justify-content-center">
              <span className="current-price color-primary">₹{course_details.priceInr}</span>
              <span className="off-price">₹8999.00</span>
            </div>
            <div className="rbt-single-list action-btn">
              <a
                className="rbt-btn btn-gradient hover-icon-reverse btn-md"
                href={`/checkout/${courseId}`}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Enroll Now</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Course Action Bottom  */}
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