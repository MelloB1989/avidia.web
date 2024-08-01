import Layout from '@/components/lms_components/layout/common';

export default function LabsHome(){
    return(
        <Layout title="Avidia Labs | Beta Launch">
  <a className="close_side_menu" href="javascript:void(0);" />
  {/* Start Banner Area */}
  <div className="rbt-banner-area rbt-banner-8 variation-01 bg_image bg_image--9">
    <div className="wrapper w-100">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="content">
              <div className="inner">
                <div className="rbt-badge-group justify-content-start">
                  <span className="meta-text d-flex align-items-center">
                    <span className="icon"><img src="https://cdn.global.noobsverse.com/logos/nvai/Noobsverse.png" height="50px" width="40px"/></span> Noobsverse presents
                  </span>
                  <a href="#" className="rbt-badge-2">
                    <strong>BETA </strong>
                  </a>
                </div>
                <h1 className="title">Avidia Labs</h1>
                <p className="description has-medium-font-size mt--20">
                  Join the Beta Wave! Instant Access to Any Software, Right from Your Browser - No Downloads, No Hassle!
                </p>
                <div className="slider-btn rbt-button-group justify-content-start">
                  <a
                    className="rbt-btn btn-gradient radius-round hover-icon-reverse"
                    href="/labs/workspaces"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Try now!</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right" />
                      </span>
                    </span>
                  </a>
                  <a
                    className="rbt-btn radius-round hover-icon-reverse btn-white"
                    href="/labs/dashboard"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Dashboard</span>
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
          <div className="col-lg-5 offset-xl-1 order-1 order-lg-2">
            <div className="video-popup-wrapper">
              <img
                className="w-100 rbt-radius"
                src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/cover-removebg-preview.png"
                alt="Video Images"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Banner Area */}
  <div className="rbt-categories-area bg-color-white rbt-section-gapBottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="swiper category-activation-three rbt-arrow-between icon-bg-gray gutter-swiper-30 ptb--20">
            <div className="swiper-wrapper">
              {/* Start Single Category  */}
              <div className="swiper-slide">
                <div className="single-slide">
                  <div className="rbt-cat-box rbt-cat-box-1 variation-2 text-center">
                    <div className="inner">
                      <div className="thumbnail">
                        <a href="course-filter-one-toggle.html">
                          <img
                            src="https://cdn.global.noobsverse.com/vscode.png"
                            alt="VS Code"
                          />
                        </a>
                      </div>
                      <div className="icons">
                        <img
                          src="https://w7.pngwing.com/pngs/210/953/png-transparent-microsoft-visual-studio-code-alt-macos-bigsur-icon.png"
                          alt="Icons Images"
                        />
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <a href="/labs/dashboard">Web Design</a>
                        </h5>
                        <div className="read-more-btn">
                          <a
                            className="rbt-btn-link"
                            href="/labs/workspaces"
                          >
                            Try now
                            <i className="feather-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Category  */}
              {/* Start Single Category  */}
              <div className="swiper-slide">
                <div className="single-slide">
                  <div className="rbt-cat-box rbt-cat-box-1 variation-2 text-center">
                    <div className="inner">
                      <div className="thumbnail">
                        <a href="course-filter-one-toggle.html">
                          <img
                            src="https://cdn.global.noobsverse.com/blender.png"
                            alt="Blender"
                          />
                        </a>
                      </div>
                      <div className="icons">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png"
                          alt="Icons Images"
                        />
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <a href="/labs/dashboard">
                            Blender
                          </a>
                        </h5>
                        <div className="read-more-btn">
                          <a
                            className="rbt-btn-link"
                            href="/labs/workspaces"
                          >
                            Try now
                            <i className="feather-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Category  */}
              {/* Start Single Category  */}
              <div className="swiper-slide">
                <div className="single-slide">
                  <div className="rbt-cat-box rbt-cat-box-1 variation-2 text-center">
                    <div className="inner">
                      <div className="thumbnail">
                        <a href="course-filter-one-toggle.html">
                          <img
                            src="https://cdn.global.noobsverse.com/android-studio.png"
                            alt="Android Studio"
                          />
                        </a>
                      </div>
                      <div className="icons">
                        <img
                          src="https://static-00.iconduck.com/assets.00/android-studio-icon-486x512-zp9um7zl.png"
                          alt="Icons Images"
                        />
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <a href="/labs/dashboard">
                            Android Studio
                          </a>
                        </h5>
                        <div className="read-more-btn">
                          <a
                            className="rbt-btn-link"
                            href="/labs/workspaces"
                          >
                            Try now
                            <i className="feather-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Category  */}
              {/* Start Single Category  */}
              <div className="swiper-slide">
                <div className="single-slide">
                  <div className="rbt-cat-box rbt-cat-box-1 variation-2 text-center">
                    <div className="inner">
                      <div className="thumbnail">
                        <a href="course-filter-one-toggle.html">
                          <img
                            src="https://cdn.global.noobsverse.com/davinci.png"
                            alt="Category Images"
                          />
                        </a>
                      </div>
                      <div className="icons">
                        <img
                          src="https://cdn.icon-icons.com/icons2/3053/PNG/512/davinci_resolve_macos_bigsur_icon_190261.png"
                          alt="Davinci"
                        />
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <a href="/labs/dashboard">
                            Davinci Resolve
                          </a>
                        </h5>
                        <div className="read-more-btn">
                          <a
                            className="rbt-btn-link"
                            href="/labs/workspaces"
                          >
                            Try now
                            <i className="feather-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Category  */}
            </div>
            <div className="rbt-swiper-arrow rbt-arrow-left">
              <div className="custom-overfolow">
                <i className="rbt-icon feather-arrow-left" />
                <i className="rbt-icon-top feather-arrow-left" />
              </div>
            </div>
            <div className="rbt-swiper-arrow rbt-arrow-right">
              <div className="custom-overfolow">
                <i className="rbt-icon feather-arrow-right" />
                <i className="rbt-icon-top feather-arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rbt-service-area bg-color-white rbt-section-gapBottom">
    <div className="container">
      <div className="row row--15 mt_dec--30">
        <div className="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-12 mt--30">
          <div className="section-title text-start">
            <h2 className="title">Any Software, Anytime, Anywhere!</h2>
            <p className="description mt--20">
               Instant Access to Any Software, Right from Your Browser - No Downloads, No Hassle!
            </p>
            <div className="read-more-btn">
              <a
                className="rbt-btn btn-gradient radius rbt-marquee-btn marquee-text-y"
                href="/labs/workspaces"
              >
                <span data-text="Try now">Try now</span>
              </a>
            </div>
          </div>
        </div>
        {/* Start Service Grid  */}
        <div className="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-12 mt--30">
          <div className="service-card service-card-6 bg-color bg-card-color-1">
            <div className="inner">
              <div className="icon">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-01.png"
                  alt="Shape Images"
                />
                <img
                  className="opacity_image"
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-01.png"
                  alt="Shape Images"
                />
              </div>
              <div className="content">
                <h6 className="title">
                  <a href="#">Unparalleled Accessibility</a>
                </h6>
                <p className="description">
                  Skip the downloads and installations. Avidia's cloud platform brings your essential software to you, wherever you are. With just a browser and an internet connection, you have immediate access to a suite of powerful tools like VSCode and Blender, optimized for performance and ready when you are.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Service Grid  */}
        {/* Start Service Grid  */}
        <div className="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-12 mt--30">
          <div className="service-card service-card-6 bg-color bg-card-color-2">
            <div className="inner">
              <div className="icon">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-04.png"
                  alt="Shape Images"
                />
                <img
                  className="opacity_image"
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-04.png"
                  alt="Shape Images"
                />
              </div>
              <div className="content">
                <h6 className="title">
                  <a href="#">Isolated Workspaces</a>
                </h6>
                <p className="description">
                  JEach 'flask' is an isolated virtual machine, ensuring your work remains secure and unaffected by other processes. This isolation offers robust protection against data breaches and interference, providing a private, stable, and consistent environment for all your development needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Service Grid  */}
        {/* Start Service Grid  */}
        <div className="col-lg-4 col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-12 mt--30">
          <div className="service-card service-card-6 bg-color bg-card-color-3">
            <div className="inner">
              <div className="icon">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-03.png"
                  alt="Shape Images"
                />
                <img
                  className="opacity_image"
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-03.png"
                  alt="Shape Images"
                />
              </div>
              <div className="content">
                <h6 className="title">
                  <a href="#">High-Performance Computing</a>
                </h6>
                <p className="description">
                  Leverage the power of high-speed computing without the overhead. Our cloud VMs are equipped with top-tier resources, designed to handle demanding tasks such as 3D rendering in Blender or video processing in Davinci Resolve, delivering a smooth and responsive experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Service Grid  */}
        {/* Start Service Grid  */}
        <div className="col-lg-4 col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-12 mt--30">
          <div className="service-card service-card-6 bg-color bg-card-color-4">
            <div className="inner">
              <div className="icon">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-02.png"
                  alt="Shape Images"
                />
                <img
                  className="opacity_image"
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-02.png"
                  alt="Shape Images"
                />
              </div>
              <div className="content">
                <h6 className="title">
                  <a href="#">Real-Time Collaboration</a>
                </h6>
                <p className="description">
                  Avidia breaks down geographical barriers, enabling real-time collaboration on projects. Share your 'flasks' with team members, facilitating simultaneous coding sessions or content creation, and watch your collective vision come to life in a shared, interactive space.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Service Grid  */}
        {/* Start Service Grid  */}
        <div className="col-lg-4 col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-12 mt--30">
          <div className="service-card service-card-6 bg-color bg-card-color-5">
            <div className="inner">
              <div className="icon">
                <img
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-05.png"
                  alt="Shape Images"
                />
                <img
                  className="opacity_image"
                  src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/shape/service-05.png"
                  alt="Shape Images"
                />
              </div>
              <div className="content">
                <h6 className="title">
                  <a href="#">Tailored Environments</a>
                </h6>
                <p className="description">
                  Customize your cloud environment to suit your workflow. Avidia provides personalized settings for each software, allowing you to tailor your VMs with the plugins and configurations you need. Save your setups and return to your personalized workspace with ease, every time you log in.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Service Grid  */}
      </div>
    </div>
  </div>
  <div className="rbt-about-area about-style-1 bg-color-white rbt-section-gap">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <div className="content">
            <img src="https://cdn.global.noobsverse.com/cover2.png" alt="About Images" />
          </div>
        </div>
        <div className="col-lg-6" data-sal="slide-up" data-sal-duration={700}>
          <div className="inner pl--50 pl_sm--5">
            <div className="section-title text-start">
              <span className="subtitle bg-primary-opacity">About Avidia Labs</span>
              <h2 className="title">What is it Useful For You?.</h2>
              <p className="description mt--20">
                At Avidia, we are pioneers in cloud technology, committed to pushing the boundaries of what's possible in the digital realm. Founded by a passionate team of innovators, our mission is to empower creators, developers, and businesses by providing seamless access to software through our cutting-edge cloud infrastructure. With our unique 'flasks'—isolated cloud VMs—we ensure that every user experiences the pinnacle of performance, accessibility, and security. From the intuitive design of VSCode to the complex modeling capabilities of Blender, the meticulous art of video editing with Davinci Resolve, and the innovative development environment of Android Studio, Avidia brings the full power of these tools directly to your browser. As we venture into our beta launch, we invite you to join us in shaping the future of cloud computing, where the only limit is your imagination.
              </p>
              <div className="read-more-btn mt--40">
                <a
                  className="rbt-btn btn-gradient radius-round rbt-marquee-btn marquee-text-y"
                  href="/about"
                >
                  <span data-text="More About Us">More About Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Start CallTo Action Area  */}
  <div className="rbt-call-to-action-area rbt-section-gap bg-gradient-8">
    <div className="rbt-callto-action rbt-cta-default style-6">
      <div className="container">
        <div className="row g-5 align-items-center content-wrapper">
          <div className="col-xxl-3 col-xl-3 col-lg-6">
            <div className="inner">
              <div className="content text-start">
                <h2 className="title color-white mb--0">
                  Avidia Labs
                </h2>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="inner-content text-start">
              <p className="color-white">
                Ready to Transform Your Digital Experience? Join Our Beta and Step into the New Era of Cloud Computing!
              </p>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-6">
            <div className="call-to-btn text-start text-xl-end">
              <a className="rbt-btn btn-white hover-icon-reverse" href="/labs/workspaces">
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Try now</span>
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
  {/* End CallTo Action Area  */}
</Layout>
        )
}