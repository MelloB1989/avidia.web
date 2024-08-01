import Head from 'next/head';
import { useState, useEffect } from 'react';
import get_jwt from '../../../lib/frontend_functions/get_jwt';
const ASSETS_CDN_URL = "https://cdn.global.noobsverse.com/avidia.lms/";
const LOGO_URL = "https://avidia.in/assets/images/logo.png";
//const ASSETS_CDN_URL = "https://d99gnvg3g7wwg.cloudfront.net/avidia.lms/";
export default function Heads({ title, avc }){
  const [login_status, setStatus] = useState(0);
  useEffect(() => {
    if(get_jwt()) {
        setStatus(1);
    }
}, []);

    return(
        <>
        <Head>
  <meta charSet="utf-8" />
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
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
    href={LOGO_URL}
  />
        </Head>
  {/* Start Header Area  */}
  <header className="rbt-header rbt-header-10">
    <div className="rbt-sticky-placeholder" />
    <div className="rbt-header-wrapper header-space-betwween header-transparent header-sticky">
      <div className="container-fluid">
        <div className="mainbar-row rbt-navigation-start align-items-center">
          <div className="header-left rbt-header-content">
            <div className="header-info">
              <div className="logo">
                <a href="/">
                  <img
                    src={LOGO_URL}
                    alt="Avidia Logo"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="rbt-main-navigation d-none d-xl-block">
            <nav className="mainmenu-nav">
              <ul className="mainmenu">
                <li className="with-megamenu has-menu-child-item position-static">
                  <a href="/">
                    Home
                  </a>
                </li>
                <li className="with-megamenu has-menu-child-item">
                  <a href="/plans">
                    Cohorts
                  </a>
                </li>
                <li className="with-megamenu has-menu-child-item">
                  <a href="/labs">
                    Labs
                  </a>
                </li>
                <li className="with-megamenu has-menu-child-item">
                  <a href="/labs/dashboard/active_flasks">
                    My Flasks
                  </a>
                </li>
                <li className="with-megamenu has-menu-child-item position-static">
                  <a href="https://in.linkedin.com/company/noobsverse">
                    About Us
                  </a>
                </li>
                <li className="with-megamenu has-menu-child-item position-static">
                  <a href="/blogs">
                    Blogs 
                  </a>
                </li>
                <li className="with-megamenu has-menu-child-item position-static">
                  <a href={login_status === 0 ? "/login" : "/dashboard"}>
                    {login_status === 0 ? ("Login/Signup") : ("Dashboard")} 
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className="rbt-btn-wrapper d-none d-xl-block">
            <ul className="quick-access">
            <li className="access-icon rbt-mini-cart">
  <a className="rbt-cart-sidenav-activation rbt-round-btn" href="/labs/dashboard">
    <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="50px"/>
    <span className="rbt-cart-count">{avc}</span>
  </a>
</li>
<li>&nbsp;&nbsp;&nbsp;&nbsp;
              <a
                className="rbt-btn rbt-marquee-btn marquee-auto btn-border-gradient radius-round btn-sm hover-transform-none"
                href="/plans"
              >
                <span data-text="Enroll to cohort">Enroll to cohort</span>
              </a>
              </li>
              </ul>
            </div>
            {/* Start Mobile-Menu-Bar */}
            <div className="mobile-menu-bar d-block d-xl-none">
              <div className="hamberger">
                <button className="hamberger-button rbt-round-btn">
                  <i className="feather-menu" />
                </button>
              </div>
            </div>
            {/* Start Mobile-Menu-Bar */}
          </div>
        </div>
      </div>
    </div>
  </header>
  {/* End Header Area  */}
  {/* Mobile Menu Section */}
  <div className="popup-mobile-menu">
    <div className="inner-wrapper">
      <div className="inner-top">
        <div className="content">
          <div className="logo">
            <a href="index.html">
              <img
                src={LOGO_URL}
                alt="Avidia Logo"
              />
            </a>
          </div>
          <div className="rbt-btn-close">
            <button className="close-button rbt-round-btn">
              <i className="feather-x" />
            </button>
          </div>
        </div>
        <p className="description">
          Empowering Project-Based Learning with AI.
        </p>
        <ul className="navbar-top-left rbt-information-list justify-content-start">
          <li>
            <a href="mailto:support@avidia.in">
              <i className="feather-mail" />
              support@avidia.in
            </a>
          </li>
          <li>
            <a href="#">
              <i className="feather-phone" />
              (+91) 7569236628
            </a>
          </li>
        </ul>
      </div>
      <nav className="mainmenu-nav">
        <ul className="mainmenu">
          <li className="position-static">
            <a href="/">
              Home
            </a>
          </li>
          <li className="position-static">
            <a href="/plans">
              Cohorts
            </a>
          </li>
          <li className="position-static">
            <a href="/labs">
              Labs
            </a>
          </li>
          <li className="position-static">
            <a href="/labs/dashboard/active_flasks">
              My Flasks
            </a>
          </li>
          <li className="position-static">
            <a href="https://in.linkedin.com/company/noobsverse">
              About Us
            </a>
          </li>
          <li className="position-static">
            <a href="/blogs">
              Blogs
            </a>
          </li>
          <li className="position-static">
            <a href={login_status === 0 ? "/login" : "/dashboard"}>
             {login_status === 0 ? ("Login/Signup") : ("Dashboard")}
            </a>
          </li>
        </ul>
      </nav>
      <div className="mobile-menu-bottom">
        <div className="rbt-btn-wrapper mb--20">
        <ul className="access-icon">
        <li className="access-icon rbt-mini-cart">
  <a className="rbt-cart-sidenav-activation rbt-round-btn" href="/labs/dashboard">
    <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="50px"/>
    <span className="rbt-cart-count">{avc}</span>
  </a>
</li>
<li>
          <a
            className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center"
            href="/plans"
          >
            <span>Enroll to cohort</span>
          </a>
          </li>
          </ul>
        </div>
        <div className="social-share-wrapper">
          <span className="rbt-short-title d-block">Find With Us</span>
          <ul className="social-icon social-default transparent-with-border justify-content-start mt--20">
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
              <a href="https://in.linkedin.com/company/noobslearning">
                <i className="feather-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End Mobile Area  */}
        </>
        )
}
