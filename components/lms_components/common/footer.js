const ASSETS_CDN_URL = "https://cdn.global.noobsverse.com/avidia.lms/";
const LOGO_URL = "https://avidia.in/assets/images/logo.png";

export default function Footer(){
    return(
        <>
  {/* Start Footer aera */}
  <footer className="rbt-footer footer-style-1 bg-color-white overflow-hidden">
    <div className="footer-top">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="footer-widget">
              <div className="logo">
                <a href="index.html">
                  <img src={LOGO_URL} alt="Avidia" />
                </a>
              </div>
              <p className="description mt--20">
                Empowering Project-Based Learning with AI.<br/>
                Made with ❤️ by <a href="https://instagram.com/mellob.ai">MelloB</a>
              </p>
              <ul className="social-icon social-default justify-content-start">
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
              <div className="contact-btn mt--30">
                <a
                  className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                  href="/contact"
                >
                  <div className="icon-reverse-wrapper">
                    <span className="btn-text">Contact With Us</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget">
              <h5 className="ft-title">Useful Links</h5>
              <ul className="ft-link">
                <li>
                  <a href="/terms/cancellation-policy">Cancellation Policy</a>
                </li>
                <li>
                  <a href="/terms/terms-and-conditions">Terms and Conditions</a>
                </li>
                <li>
                  <a href="/terms/privacy-policy">Privacy policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget">
              <h5 className="ft-title">Our Company</h5>
              <ul className="ft-link">
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/instructors">Our Instructors</a>
                </li>
                <li>
                  <a href="/courses">Courses</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="footer-widget">
              <h5 className="ft-title">Get Contact</h5>
              <ul className="ft-link">
                <li>
                  <span>Phone:</span> <a href="#">(+91) 7569236628</a>
                </li>
                <li>
                  <span>E-mail:</span>{" "}
                  <a href="mailto:support@avidia.in">support@avidia.in</a>
                </li>
              </ul>
              <form className="newsletter-form mt--20" action="#">
                <h6 className="w-600">Subscribe to our Newsletter</h6>
                <p className="description">
                  200+ Our students are subscribe Around the World.
                  <br /> Don’t be shy introduce yourself!
                </p>
                <div className="form-group right-icon icon-email mb--20">
                  <label htmlFor="email">Enter Your Email Here</label>
                  <input id="email" type="email" />
                </div>
                <div className="form-group mb--0">
                  <button
                    className="rbt-btn rbt-switch-btn btn-gradient radius-round btn-sm"
                    type="submit"
                  >
                    <span data-text="Submit Now">Submit Now</span>
                  </button>
                </div>
              </form>
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
    {/* Start Copyright Area  */}
    <div className="copyright-area copyright-style-1 ptb--20">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12">
            <p className="rbt-link-hover text-center text-lg-start">
              Copyright © 2024{" "}
              <a href="https://noobsverse.com">
                Noobsverse private limited.
              </a>{" | "}
              All Rights Reserved
            </p>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12">
            <ul className="copyright-link rbt-link-hover justify-content-center justify-content-lg-end mt_sm--10 mt_md--10">
              <li>
                <a href="/terms/terms-and-conditions">Terms of service</a>
              </li>
              <li>
                <a href="/terms/privacy-policy">Privacy policy</a>
              </li>
              <li>
                <a href="/terms/cancellation-policy">Cancellation Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* End Copyright Area  */}
  </footer>
  {/* End Footer aera */}
  <div className="rbt-progress-parent">
    <svg
      className="rbt-back-circle svg-inner"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
            {/*<!-- Modernizer JS -->*/}
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/modernizr.min.js`} ></script>
    {/*<!-- jQuery JS -->*/}
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/jquery.js`} ></script>
    {/*<!-- Bootstrap JS -->*/}
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/bootstrap.min.js`} ></script>
    {/*<!-- sal.js -->*/}
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/sal.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/swiper.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/magnify.min.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/jquery-appear.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/odometer.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/backtotop.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/isotop.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/imageloaded.js`} ></script>

    <script src={`${ASSETS_CDN_URL}assets/js/vendor/wow.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/waypoint.min.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/easypie.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/text-type.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/jquery-one-page-nav.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/bootstrap-select.min.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/jquery-ui.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/magnify-popup.min.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/paralax-scroll.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/paralax.min.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/countdown.js`} ></script>
    <script src={`${ASSETS_CDN_URL}assets/js/vendor/plyr.js`} ></script>
    {/*<!-- Main JS -->*/}
    <script src={`${ASSETS_CDN_URL}assets/js/main.js`} ></script>
</>

        )
}