import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../lms_components/layout/common';

const testimonialsCareerAdvancement = [
  "Joining Avidia's coding cohort was a game-changer for my career. The in-depth lessons and real-world projects prepared me for a tech role I thought was years away.",
  "Avidia turned my coding hobby into a professional skill set. Within months, I landed my first developer job, thanks to their comprehensive curriculum and dedicated mentors.",
  "The personalized feedback and challenging projects at Avidia helped me grow from a novice to a confident coder. It's not just a course; it's a career accelerator.",
  "Thanks to Avidia, I transitioned from a non-tech role to a software engineer. The hands-on approach and industry insights were invaluable.",
  "Avidia's cohort connected me with like-minded peers and opened doors to tech networks. Their emphasis on practical skills over theory made all the difference.",
  "Never thought I could switch careers so smoothly. Avidia's coding cohorts are structured for real-world success, guiding you every step of the way.",
  "The projects I worked on at Avidia became the highlight of my portfolio. It's clear employers respect their training—the job offers prove it.",
  "Avidia not only taught me how to code but how to think like a programmer. This shift in mindset was crucial for securing a role in a competitive tech company.",
  "The career support from Avidia is unmatched. From resume workshops to mock interviews, they ensure you're job-ready in every aspect.",
  "Completing a coding cohort at Avidia was the best decision for my tech career. The skills I gained led to a promotion and a significant salary increase."
];
const testimonialsLearningExperience = [
  "Avidia is more than an education platform; it's a community where everyone uplifts each other. The collaborative projects and peer programming sessions were highlights for me.",
  "The innovative teaching methods at Avidia, especially the live coding sessions and hackathons, kept me engaged and accelerated my learning process.",
  "Avidia's blend of theory, practice, and mentorship provided a holistic learning experience. It's the perfect environment for anyone serious about mastering coding.",
  "The support I received from both peers and instructors at Avidia made daunting coding challenges approachable and fun. It's a nurturing space for beginners and advanced coders alike.",
  "What sets Avidia apart is its commitment to each learner's success. The regular check-ins, feedback, and encouragement helped me stay motivated throughout the course.",
  "Learning to code at Avidia felt like embarking on an adventure with a group of friends guided by wise mentors. It's an experience I'll always cherish.",
  "The diverse cohort at Avidia enriched my learning with different perspectives and approaches to problem-solving. This diversity is a strength that fosters creativity and innovation.",
  "Avidia's flexible learning paths allowed me to balance my studies with personal commitments, making it possible to pursue my coding dreams without sacrificing other aspects of my life.",
  "The real-world projects at Avidia not only honed my technical skills but also taught me about teamwork, communication, and project management—skills essential for any tech professional.",
  "Choosing Avidia was the best decision for my personal and professional development. The engaging curriculum, supportive community, and innovative teaching methods surpassed all my expectations."
];

export default function Home(){
    return(
        <>
        <Layout title={"Avidia Cohort || Home"}>
        
  {/* Start Slider Area  */}
  <div className="rbt-splash-slider d-flex align-items-center">
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-12 col-xl-6 order-2 order-xl-1">
            <div className="inner">
              <div className="banner-top">
                <div className="banner-badge-top">
                  <div className="icon">
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
                  <span className="subtitle">
                    Trusted by 5700+ Community members
                  </span>
                </div>
                <div className="banner-badge-top">
                  <div className="icon">
                    <img
                      src="https://cdn.global.noobsverse.com/logos/nvai/Noobsverse.png"
                      alt="Noobsverse"
                    />
                  </div>
                  <span className="subtitle">Powered by Noobsverse</span>
                </div>
              </div>
              <h1 className="title">
                Avidia 2.0 is here <br /> with <br/> 
                <span className="header-caption">
                    <span className="cd-headline rotate-1">
                      <span className="cd-words-wrapper">
                        <b className="is-visible theme-gradient">AI mentors</b>
                        <b className="is-hidden theme-gradient">Cloud labs</b>
                        <b className="is-hidden theme-gradient">Premium guidance</b>
                        <b className="is-hidden theme-gradient">Zenith+ Community</b>
                      </span>
                    </span>
                </span>
              </h1>
              <p className="description">
                The most <strong>unique</strong> way of learning to
                <strong>&nbsp;code</strong> yet.
              </p>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6 order-1 order-xl-2">
            <div className="video-popup-wrapper">
              <img
                className="w-100 rbt-radius"
                src="https://cdn.global.noobsverse.com/logos/nvai/lisa-removebg-preview.png"
                alt="Avidia"
              />
              <a
                className="rbt-btn rounded-player-2 popup-video position-to-top with-animation d-none"
                href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
              >
                <span className="play-icon" />
              </a>
              <div className="banner-group-shape">
                <div className="shape-image scene shape-4">
                  <span data-depth={2}>
                    <img
                      width={48}
                      height={48}
                      src="https://img.icons8.com/deco/48/saving-book.png"
                      alt="saving-book"
                    />
                  </span>
                </div>
                <div className="shape-image scene shape-5">
                  <span data-depth={-2}>
                    <img
                      width={64}
                      height={64}
                      src="https://img.icons8.com/nolan/64/bot.png"
                      alt="bot"
                    />
                  </span>
                </div>
                <div className="shape-image scene shape-6">
                  <span data-depth={5}>
                    <img
                      width={48}
                      height={48}
                      src="https://img.icons8.com/color-glass/48/artificial-intelligence.png"
                      alt="artificial-intelligence"
                    />
                  </span>
                </div>
                <div className="shape-image scene shape-7">
                  <span data-depth={-3}>
                    <img
                      width={48}
                      height={48}
                      src="https://img.icons8.com/fluency/48/online-coding.png"
                      alt="online-coding"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="splash-service-main position-relative">
              <div className="service-wrapper service-white">
                <div className="row g-0">
                  <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12 service__style--column">
                    <div className="service service__style--1">
                      <div className="icon">
                        <img
                          src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/icons-01.png"
                          alt="Icon Images"
                        />
                      </div>
                      <div className="content">
                        <h4 className="title">Avidia LMS Platform</h4>
                        <p>
                          Experience seamless learning with the Avidia LMS,
                          powered by AI teachers and Cloud Labs. Access VS Code
                          and essential software directly from your browser,
                          covering C, web development, and Python basics to
                          advanced levels.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12 service__style--column">
                    <div className="service service__style--1">
                      <div className="icon">
                        <img
                          src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/icons-02.png"
                          alt="Icon Images"
                        />
                      </div>
                      <div className="content">
                        <h4 className="title">24/7 AI Mentors</h4>
                        <p>
                          Get real-time assistance from AI mentors, available
                          24/7 for doubt solving, quizzes, and challenges.
                          Enhance your skills anytime with our dedicated AI
                          mentors.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12 service__style--column">
                    <div className="service service__style--1">
                      <div className="icon">
                        <img
                          src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/icons-03.png"
                          alt="Icon Images"
                        />
                      </div>
                      <div className="content">
                        <h4 className="title">Mentor Guidance</h4>
                        <p>
                          Benefit from weekly doubt-solving sessions with expert
                          mentors. Receive personalized guidance to ensure a
                          thorough understanding of all topics.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12 service__style--column">
                    <div className="service service__style--1">
                      <div className="icon">
                        <img
                          src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/icons-04.png"
                          alt="Icon Images"
                        />
                      </div>
                      <div className="content">
                        <h4 className="title">Zenith+ Premium Community</h4>
                        <p>
                          Access the Zenith+ batch, a vibrant space for
                          peer-to-peer and community-based learning.
                          Collaborate, share knowledge, and build a supportive
                          network.
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
    </div>
    <div className="shape-wrapper">
      <div className="shape-image shape-1">
        <img src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/shape-1.png" alt="Shape Images" />
      </div>
      <div className="shape-image shape-2">
        <img src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/shape-2.png" alt="Shape Images" />
      </div>
      <div className="shape-image shape-3">
        <img src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/shape-3.png" alt="Shape Images" />
      </div>
    </div>
  </div>
  {/* End Slider Area  */}
  {/* Start Coding Quality Area  */}
  <div className="rbt-splash-coding-quality-area bg-color-white rbt-section-gapBottom">
    <div className="wrapper">
      <div className="container">
        <div className="row mb--60">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle bg-secondary-opacity">
                Avidia Cohort
              </span>
              <h2 className="title">Why Choose Avidia?</h2>
            </div>
          </div>
        </div>
        <div className="row g-5">
          {/* Start Top Feature  */}
          <div
            className="col-lg-4 col-md-6 col-12"
            data-sal-delay={150}
            data-sal="slide-up"
            data-sal-duration={800}
          >
            <div className="top-features-box h-100 text-center bg-gradient-15">
              <div className="inner">
                <div className="content">
                  <span className="pre-title text-uppercase">Cloud labs</span>
                  <h4 className="title">
                    Practise without wasting time for installing GCC, VSCode,
                    NPM..
                  </h4>
                </div>
                <div className="thumbnail">
                  <img
                    src="https://cdn.global.noobsverse.com/5940169-middle-removebg-preview.png"
                    alt="Image"
                  />
                </div>
                <div className="rbt-badge-group">
                  <span className="rbt-badge">100% uptime</span>
                  <span className="rbt-badge">No installation needed</span>
                  <span className="rbt-badge">Easy practise</span>
                  <span className="rbt-badge">&amp; More...</span>
                </div>
              </div>
              <div className="shape-image">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/sun-shadow-right.png"
                  alt="Shape Images"
                />
              </div>
            </div>
          </div>
          {/* End Top Feature  */}
          {/* Start Top Feature  */}
          <div
            className="col-lg-4 col-md-6 col-12"
            data-sal-delay={200}
            data-sal="slide-up"
            data-sal-duration={800}
          >
            <div className="top-features-box h-100 text-center bg-gradient-16">
              <div className="inner">
                <div className="content">
                  <span className="pre-title text-uppercase">AI Mentors</span>
                  <h4 className="title">
                    Our AI mentors would be available to you anytime.
                  </h4>
                </div>
                <div className="thumbnail">
                  <img
                    src="https://cdn.global.noobsverse.com/ai-image__3_-removebg-preview.png"
                    alt="Image"
                  />
                </div>
                <div className="rbt-badge-group">
                  <span className="rbt-badge">Availability</span>
                  <span className="rbt-badge">Responsiveness</span>
                  <span className="rbt-badge">Personalization</span>
                  <span className="rbt-badge">Doubt solving</span>
                  <span className="rbt-badge">&amp; More...</span>
                </div>
              </div>
              <div className="shape-image">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/sun-shadow-right-2.png"
                  alt="Shape Images"
                />
              </div>
            </div>
          </div>
          {/* End Top Feature  */}
          {/* Start Top Feature  */}
          <div
            className="col-lg-4 col-md-6 col-12"
            data-sal-delay={250}
            data-sal="slide-up"
            data-sal-duration={800}
          >
            <div className="top-features-box h-100 text-center bg-gradient-17">
              <div className="inner">
                <div className="content">
                  <span className="pre-title text-uppercase">
                    Zenith+ Community{" "}
                  </span>
                  <h4 className="title">Peer to peer learning opportuinity</h4>
                </div>
                <div className="thumbnail">
                  <img
                    src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/topfeature/03.png"
                    alt="Image"
                  />
                </div>
                <div className="rbt-badge-group">
                  <span className="rbt-badge">Collaboration</span>
                  <span className="rbt-badge">Networking</span>
                  <span className="rbt-badge">Empowerment</span>
                  <span className="rbt-badge">&amp; More...</span>
                </div>
              </div>
              <div className="shape-image">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/sun-shadow-right-3.png"
                  alt="Shape Images"
                />
              </div>
            </div>
          </div>
          {/* End Top Feature  */}
        </div>
      </div>
    </div>
  </div>
  {/* End Coding Quality Area  */}
  {/* Start Elements Presentation Area  */}
  <div className="rbt-elements-presentation-area overflow-hidden bg-color-white rbt-section-gapBottom pt--80">
    <div className="wrapper">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <span className="subtitle bg-primary-opacity">
              Start your journey now!
            </span>
            <h2 className="title">
              Take your Skills to The{" "}
              <strong className="theme-gradient">Next Level!</strong>
            </h2>
          </div>
        </div>
      </div>
      <div className="scroll-animation-all-wrapper">
        <div className="scroll-animation-wrapper mt--30">
          <div className="scroll-animation scroll-right-left">
            {/* Start Single Testimonial  */}
            <div className="single-column-100">
              <div className="rbt-categori-list">
                <a href="#">Git</a>
                <a href="#">LinkedIn</a>
                <a href="#">Linux</a>
                <a href="#">C Programming</a>
                <a href="#">Python</a>
                <a href="#">Card</a>
                <a href="#">HTML</a>
                <a href="#">CSS</a>
                <a href="#">SQL</a>
                <a href="#">Javascript</a>
                <a href="#">Cloud Computing</a>
                <a href="#">
                  <i className="feather-twitter" /> Networking
                </a>
                <a href="#">Java</a>
                <a href="#">Data structures</a>
                <a href="#">C++</a>
                <a href="#">Data Analysis</a>
                <a href="#">Machine Learning</a>
                <a href="#">Cybersecurity</a>
              </div>
            </div>
            {/* End Single Testimonial  */}
          </div>
        </div>
        <div className="scroll-animation-wrapper mt--30">
          <div className="scroll-animation scroll-left-right">
            {/* Start Single Testimonial  */}
            <div className="single-column-100">
              <div className="rbt-categori-list">
                <a href="#">Git</a>
                <a href="#">LinkedIn</a>
                <a href="#">Linux</a>
                <a href="#">C Programming</a>
                <a href="#">Python</a>
                <a href="#">Card</a>
                <a href="#">HTML</a>
                <a href="#">CSS</a>
                <a href="#">SQL</a>
                <a href="#">Javascript</a>
                <a href="#">Cloud Computing</a>
                <a href="#">
                  <i className="feather-twitter" /> Networking
                </a>
                <a href="#">Java</a>
                <a href="#">Data structures</a>
                <a href="#">C++</a>
                <a href="#">Data Analysis</a>
                <a href="#">Machine Learning</a>
                <a href="#">Cybersecurity</a>
              </div>
            </div>
            {/* End Single Testimonial  */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center mt--30">
            <span className="rbt-title-style-2">
              We are here to give the best
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Elements Presentation Area  */}
  {/* Start Home Demo Area  */}
  <div className="home-demo-area rbt-section-gap bg-gradient-6 splash-masonary-wrapper-activation">
    <div className="wrapper plr--120 plr_lg--30 plr_md--30 plr_sm--30 plr_mobile--15">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 col-xl-6 offset-xl-3">
          <div className="section-title text-center has-section-before-title mb--150 mt--50 mb_lg--100 mb_md--100 mb_sm--100">
            <h2 className="rbt-display-1 theme-gradient">
              India's first AI LMS platform.
            </h2>
            <h3 className="title">
              AI mentors and cloud labs{" "}
              <span className="heading-opacity">to your rescue.</span>
            </h3>
            <div className="indicator-icon ">
              <img
                className="edu_bounce_loop"
                src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/arrow-down.png"
                alt="arrow down icon"
              />
            </div>
            <p className="description has-medium-font-size mt--20">
              Register and join the cohort today!
            </p>
            <div className="section-before-title theme-gradient new-big-heading-gradient">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Start Campain Area  */}
  <div className="rbt-buy-now-area bg-gradient-8 rbt-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="rbt-buy-now-content text-center">
            <h2 className="title color-white">Join the cohort now</h2>
            <h4 className="subtitle color-white">
              {" "}
              Learn ☕ Practise ⭐ Build ⚡{" "}
            </h4>
            <a
              className="rbt-btn btn-white radius hover-icon-reverse btn-xl"
              href="/plans"
            >
              <span className="icon-reverse-wrapper">
                <span className="btn-text">Count me in</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
              </span>
            </a>
            <span className="label-text color-white d-block text-uppercase">
              Powered by Noobsverse
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="map-image">
      <img src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/map.png" alt="Map Image" />
    </div>
  </div>
  {/* End Campain Area  */}
  <br />
  {/* Start Testimonial Area  */}
  <div className="rbt-splash-testimonial-area bg-color-white overflow-hidden position-relative">
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle bg-primary-opacity">
                A FEW WORDS FROM OUR COMMUNITY MEMBERS
              </span>
              <h2 className="title">
                What People Are <br /> Saying About &nbsp;
                <span className="header-caption">
                  <span className="cd-headline zoom">
                    <span className="cd-words-wrapper">
                      <b className="is-visible theme-gradient">
                        Noobs Community.
                      </b>
                      <b className="is-hidden theme-gradient">
                        Avidia LMS platform.
                      </b>
                    </span>
                  </span>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="splash-testimonial-all-wrapper pb--60">
      <div className="scroll-animation-wrapper no-overlay mt--50">
        <div className="scroll-animation scroll-right-left">
          {/* Start Single Testimonial  */}
          {testimonialsCareerAdvancement.map((item, index) => {
            return (
              <div className="single-column-20 bg-theme-gradient-odd" key={index}>
            <div className="rbt-testimonial-box style-2">
              <div className="inner">
                <div className="icons">
                  <img
                    src="https://avidia.in/assets/images/logo.png"
                    alt="Clint Images"
                  />
                </div>
                <div className="description">
                  <p className="subtitle-3">
                   {item}
                  </p>
                  <div className="clint-info-wrapper">
                    <div className="thumb">
                      <img
                        src="https://img.icons8.com/emoji/48/man-student.png"
                        alt="Clint Images"
                      />
                    </div>
                    <div className="client-info">
                      <h5 className="title">Cohort student</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          })}
          {/* End Single Testimonial  */}
        </div>
      </div>
      <div className="scroll-animation-wrapper no-overlay mt--50">
        <div className="scroll-animation scroll-left-right">
          {/* Start Single Testimonial  */}
          {testimonialsLearningExperience.map((item, index) => {
            return (
              <div className="single-column-20 bg-theme-gradient-odd" key={index}>
            <div className="rbt-testimonial-box style-2">
              <div className="inner">
                <div className="icons">
                  <img
                    src="https://avidia.in/assets/images/logo.png"
                    alt="Clint Images"
                  />
                </div>
                <div className="description">
                  <p className="subtitle-3">
                   {item}
                  </p>
                  <div className="clint-info-wrapper">
                    <div className="thumb">
                      <img
                        src="https://img.icons8.com/emoji/48/man-student.png"
                        alt="Clint Images"
                      />
                    </div>
                    <div className="client-info">
                      <h5 className="title">Cohort student</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          })}
          {/* End Single Testimonial  */}
        </div>
      </div>
      <div className="read-more-review">
        <div className="section-title text-center mb--30">
          <h5 className="title color-white">
            Be next. <br /> Join Us.
          </h5>
        </div>
        <a
          className="rbt-btn btn-gradient hover-icon-reverse  btn-xxl"
          href="/plans"
        >
          <span className="icon-reverse-wrapper">
            <span className="btn-text"> ⭐ Register to cohort </span>
            <span className="btn-icon">
              <i className="feather-arrow-right" />
            </span>
            <span className="btn-icon">
              <i className="feather-arrow-right" />
            </span>
          </span>
        </a>
        <div className="section-title text-center mt--20">
          <h5 className="title rbt-title-style-2 color-white">
            Designed by <br /> Noobsverse{" "}
            <strong className="color-white">Brought to you by</strong> NBL.
          </h5>
        </div>
      </div>
    </div>
    <div className="line-shape text-center">
      <img src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/splash/icons/line-shape.png" alt="Shape" />
    </div>
  </div>
  {/* End Testimonial Area  */}
  {/* Start Accordion Area  */}
  <div className="rbt-accordion-area accordion-style-1 rbt-accordion-color-white bg-color-darker rbt-section-gapBottom pt--60 pt_sm--0 overflow-hidden position-relative top-circle-shape-top overlpping-call-to-action">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-8 offset-lg-2 col-sm-12">
          <div className="section-title text-center pb--60">
            <span className="subtitle bg-secondary-opacity">
              Check out our FAQ section to see if we can help.
            </span>
            <h2 className="title mb_sm--0 text-center color-white-off">
              Do you have any Question
            </h2>
          </div>
          <div className="rbt-accordion-style rbt-accordion-02 accordion">
            <div className="accordion" id="accordionExamplea1">
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    What is the Avidia Cohort?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    The Avidia Cohort is a 6-month comprehensive program
                    designed for first-year B.Tech students. It provides a
                    complete learning journey from basic to advanced levels of C
                    programming, web development (HTML, CSS, JS), and Python,
                    along with additional benefits like 24/7 AI mentors, expert
                    mentor guidance, and access to the Zenith+ premium
                    community.
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Who can join the Avidia Cohort?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    The Avidia Cohort is specifically designed for first-year
                    B.Tech students who are looking to enhance their technical
                    skills in C programming, web development, and Python.
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    What is the Avidia LMS Platform?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    The Avidia Learning Management System (LMS) is a
                    revolutionary platform powered by AI teachers and Cloud
                    Labs. It allows students to access VS Code and other
                    essential software directly from their browser, eliminating
                    the need for installations.
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    What is the Zenith+ Premium Community?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    The Zenith+ Premium Community is an exclusive space for
                    peer-to-peer and community-based learning. It provides an
                    opportunity for students to engage with fellow students,
                    share knowledge, collaborate on projects, and build a strong
                    network.
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    How does the 24/7 AI Mentor support work?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    The 24/7 AI Mentor support provides real-time assistance
                    from AI mentors who are available round-the-clock for doubt
                    solving, quizzes, and challenges. Students can resolve their
                    queries, test their knowledge, and enhance their skills at
                    any time of the day or night.
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    When does the Avidia Cohort start, and what is the duration?
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    The Avidia Cohort starts on 29th September 2024 and lasts
                    for a duration of 6 months. It is a comprehensive and
                    supportive learning experience designed to provide a strong
                    foundation in C programming, web development, and Python.
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingSeven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    What kind of guidance can I expect from the mentors?
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    <p>
                      Apart from 24/7 AI Mentor support, we also have expert
                      mentors who will conduct weekly Q&amp;A sessions. These
                      sessions are designed for doubt solving and providing
                      further explanations on certain topics. It's an
                      opportunity to interact directly with our mentors (not AI
                      mentors) to get personalized guidance and clarify any
                      conceptual challenges you may encounter.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingEight">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    What is the structure of the Avidia Cohort program?
                  </button>
                </h2>
                <div
                  id="collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingEight"
                  data-bs-parent="#accordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    <p>
                      The Avidia Cohort program is structured into three main
                      modules covering C programming, web development (HTML,
                      CSS, JS), and Python, from basic to advanced levels. Each
                      module consists of interactive learning materials
                      available on the Avidia LMS platform, quizzes and
                      challenges provided by 24/7 AI mentors, weekly live
                      Q&amp;A sessions with expert mentors, and collaborative
                      activities within the Zenith+ premium community. The
                      program is designed to provide a comprehensive and
                      supportive learning experience over a duration of 6
                      months.
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
  {/* End Accordion Area  */}
        </Layout>
        </>
        )
}
