import Layout from '../components/lms_components/layout/common';

export default function plans(){

  const offerings = ['Certification', 'Hands on Projects', 'Cloud labs', 'AI mentors', 'Live sessions', 'Internships', 'Bounty programs', 'Hackathons'];
  const sigma = [1,1,0,1,1,1,0,0];
  const beta = [1,1,1,1,1,1,0,0];
  const alpha = [1,1,1,1,1,1,1,1];
  const technologies = [{
    title: "HTML, CSS, JS basics",
    image: "https://p92.com/binaries/content/gallery/p92website/technologies/htmlcssjs-overview.png",
  }, {
    title: "React JS",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*x0d41ns8PTQZz4a3VbMrBg.png"
  }, {
    title: "Next JS",
    image: "https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg"
  }, {
    title: "Node JS",
    image: "https://academyclass.com/wp-content/uploads/2021/11/ACCL-NodeJS-1200x1200.png"
  }, {
    title: "Mongo DB",
    image: "https://www.mongodb.com/assets/images/global/favicon.ico"
  }, {
    title: "Express JS",
    image: "https://youteam.io/blog/wp-content/uploads/2022/04/expressjs_logo.png"
  }, {
    title: "Redux",
    image: "https://miro.medium.com/v2/resize:fit:500/1*tOI6UC5EaS2fPItCesI-AQ.png"
  }, {
    title: "GraphQL",
    image: "https://graphql.org/img/og-image.png"
  }, {
    title: "AWS",
    image: "https://yt3.googleusercontent.com/HRJKaJg70sqBrCNh7Tf2RSjXTb_5hCUn7Hht7mxUJMg77EWkihh55JklD-KhwAMhwY31ox5O=s900-c-k-c0x00ffffff-no-rj"
  }, {
    title: "Docker",
    image: "https://bunnyacademy.b-cdn.net/what-is-docker.png"
  }, {
    title: "Twilio API integreation",
    image: "https://smbhd.com/wp-content/uploads/2022/02/Twilio-Logo-1.png"
  }, {
    title: "Open AI integration",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBl5CgMuFP51OU_N49Ukp20IR7RayImCwgttcpQwhNg&s"
  }];

  const mentors = [
    {
      name: "Shaik Farhan",
      socials: "https://www.linkedin.com/in/shak1rfarhan/",
      profile: "https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/farhan.png",
      designation: "Backend developer"
    },
    {
      name: "Varad Prabhu",
      socials: "https://www.linkedin.com/in/varadprabhu/",
      profile: "https://media.licdn.com/dms/image/D4D03AQFc80k_r9xgIQ/profile-displayphoto-shrink_200_200/0/1698804322827?e=1717027200&v=beta&t=cv-gk_LAJ1zypC2PYPEWUmZR5gro4w4T4n3SdcKI-qQ",
      designation: "Full stack developer"
    },
    {
      name: "Rishabh Pandey",
      socials: "https://www.linkedin.com/in/rizzabh/",
      profile: "https://media.licdn.com/dms/image/D4D03AQEhyyRHZgrG6A/profile-displayphoto-shrink_200_200/0/1703186024354?e=1717027200&v=beta&t=Eg6zMdocdbK6ioPknr2-E0BJ_qrbp-AhVCYgx-UgSmc",
      designation: "Frontend developer"
    },
    {
      name: "Kartik Deshmukh",
      socials: "https://www.linkedin.com/in/kartik-deshmukh-404945252/",
      profile: "https://media.licdn.com/dms/image/D5603AQEgOhqZld_fJA/profile-displayphoto-shrink_200_200/0/1706109676220?e=1717027200&v=beta&t=3r9rgiJ20BFNmd2-VjEjYRcx0gqUslVutyTrJoNJvaA",
      designation: "Backend & Cloud engineer"
    },
    {
      name: "Abhinav",
      socials: "",
      profile: "https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/abhinav.jpeg",
      designation: "Full stack developer"
    },
    {
      name: "Aymaan",
      social: "",
      profile: "https://cdn-icons-png.flaticon.com/512/6854/6854607.png",
      designation: "Flutter developer"
    },
    {
      name: "Manas",
      social: "",
      profile: "https://avatars.githubusercontent.com/u/129392161?v=4",
      designation: "Full stack developer"
    },
    {
      name: "Rahul",
      social: "",
      profile: "https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/rahul.jpeg",
      designation: "Frontend developer"
    }
  ];

  const features = ['AI mentors', 'Hands on projects', 'Cloud labs', 'No ads', 'Advanced technologies', 'Learn by doing', 'Live sessions', 'Community access', 'Internships', 'Bounty programs'];
  const avidia = [1,1,1,1,1,1,1,1,1,1];
  const codedamn = [0,1,0,1,1,1,0,0,0,0];
  const youtube = [0,0,0,0,0,0,0,0,0,0];
  const apnaCollege = [0,0,0,1,1,0,0,1,1,1];

    return(
        <Layout title="Avidia Cohort 24 plans">
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-pricing-area bg-color-white rbt-section-gap">
  <div className="container">
    <div className="row g-5 mb--60">
      <div className="col-lg-6 col-md-6 col-12">
        <div className="section-title text-start">
          <span className="subtitle bg-secondary-opacity">Early bird offers!</span>
          <h2 className="title">Avidia Cohort 24'</h2>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-12">
        <div className="pricing-billing-duration text-start text-md-end">
          <ul>
            <li className="nav-item">
              <button className="nav-link yearly-plan-btn" type="button">
              Monthly Plan
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link monthly-plan-btn active"
                type="button"
              >
                One-time plan
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row g-5">
      {/* Start Single Pricing  */}
      <div className="col-xl-4 col-lg-6 col-md-6 col-12">
        <div className="pricing-table style-2">
          <div className="pricing-header">
            <h3 className="title color-primary">Sigma batch</h3>
            <span className="rbt-badge mb--35">Good for begineers</span>
            <div className="price-wrap">
              <div className="yearly-pricing" style={{ display: "none" }}>
              <span className="amount color-primary">Not available</span>
                <span className="duration color-primary">/monthly</span>
              </div>
              <div className="monthly-pricing" style={{ display: "block" }}>
              <span className="amount color-primary">₹2999</span>
                <span className="duration color-primary">/one time</span>
                
              </div>
            </div>
          </div>
          <div className="pricing-btn">
            <a
              className="rbt-btn bg-primary-opacity hover-icon-reverse w-100"
              href="/checkout/cohort_2024_sigma"
            >
              <div className="icon-reverse-wrapper">
                <span className="btn-text">Join Course Plan</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
              </div>
            </a>
          </div>
          <div className="pricing-body">
            <ul className="list-item">
              {offerings.map((offering, index) => {
                return (
                  <li key={index} className={sigma[index] === 0 ? "off" : ""}>
                <i className={sigma[index] === 1 ? "feather-check" : "feather-x"} /> {offering}
              </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* End Single Pricing  */}
      {/* Start Single Pricing  */}
      <div className="col-xl-4 col-lg-6 col-md-6 col-12">
        <div className="pricing-table style-2 active">
          <div className="pricing-header">
            <div className="pricing-badge">
              <span>Recommended</span>
            </div>
            <h3 className="title color-secondary">Beta batch</h3>
            <span className="rbt-badge mb--35">Begineer to intermediate</span>
            <div className="price-wrap">
              <div className="yearly-pricing" style={{ display: "none" }}>
              <span className="amount color-primary">Not available</span>
                <span className="duration color-primary">/monthly</span>
              </div>
              <div className="monthly-pricing" style={{ display: "block" }}>
              <span className="amount color-secondary">₹4999</span>
                <span className="duration color-secondary">/one time</span>
              </div>
            </div>
          </div>
          <div className="pricing-btn">
            <a
              className="rbt-btn bg-secondary-opacity hover-icon-reverse w-100"
              href="/checkout/cohort_2024_beta"
            >
              <div className="icon-reverse-wrapper">
                <span className="btn-text">Join Course Plan</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
              </div>
            </a>
          </div>
          <div className="pricing-body">
            <ul className="list-item">
            {offerings.map((offering, index) => {
                return (
                  <li key={index} className={beta[index] === 0 ? "off" : ""}>
                <i className={beta[index] === 1 ? "feather-check" : "feather-x"} /> {offering}
              </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* End Single Pricing  */}
      {/* Start Single Pricing  */}
      <div className="col-xl-4 col-lg-6 col-md-6 col-12">
        <div className="pricing-table style-2">
          <div className="pricing-header">
            <h3 className="title color-pink">Alpha batch</h3>
            <span className="rbt-badge mb--35">Intermediate to advanced</span>
            <div className="price-wrap">
              <div className="yearly-pricing" style={{ display: "none" }}>
              <span className="amount color-pink">₹2500</span>
                <span className="duration color-pink">/monthly</span>
              </div>
              <div className="monthly-pricing" style={{ display: "block" }}>
              <span className="amount color-pink">₹7999</span>
                <span className="duration color-pink">/one time</span>
              </div>
            </div>
          </div>
          <div className="pricing-btn">
            <a
              className="rbt-btn bg-pink-opacity hover-icon-reverse w-100"
              href="/checkout/cohort_2024_alpha"
            >
              <div className="icon-reverse-wrapper">
                <span className="btn-text">Join Course Plan</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
              </div>
            </a>
          </div>
          <div className="pricing-body">
            <ul className="list-item">
            {offerings.map((offering, index) => {
                return (
                  <li key={index} className={alpha[index] === 0 ? "off" : ""}>
                <i className={alpha[index] === 1 ? "feather-check" : "feather-x"} /> {offering}
              </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* End Single Pricing  */}
    </div>
    <div className="rbt-pricing-area bg-color-white rbt-section-gap">
  <div className="container">
    <div className="row g-5 mb--60">
      <div className="col-12">
        <div className="section-title text-center">
          <span className="subtitle bg-pink-opacity">Limited offer</span>
          <h2 className="title">Pool registration for Sigma batch</h2>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        <div className="advance-pricing">
          <div className="inner">
            <div className="row row--0">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="pricing-left">
                  <h3 className="main-title">Sigma Batch</h3>
                  <p className="description">
                    Register with your friends together to get a discount.
                  </p>
                  <br/>
                  <div className="price-wrapper">
                    <span className="price-amount">
                    ₹9,999<sup><del>₹12,000</del></sup>
                    </span>
                  </div>
                  <br/>
                  <div className="pricing-btn-group">
                    <button className="rbt-btn btn-gradient w-100" onClick={()=>{window.open('https://rzp.io/l/0ZMo79c')}}>
                      Register now!!
                    </button>
                  </div>
                  <small className="subtitle">
                    Offer ends soon. Hurry up!
                  </small>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="pricing-right position-relative">
                  <div className="pricing-offer">
                    <div className="single-list">
                      <h4 className="price-title">
                        Advance Plans You can Get.
                      </h4>
                      <ul className="plan-offer-list">
                      {offerings.map((offering, index) => {
                        return (
                          <li key={index} className={sigma[index] === 0 ? "off" : ""}>
                        <i className={sigma[index] === 1 ? "feather-check" : "feather-x"} /> {offering}
                      </li>
                        )
                      })}
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-badge">
                    <span>Popular</span>
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

  </div>
   {/* Start Service Area */}
   <div className="rbt-service-area bg-color-extra2 rbt-section-gap">
    <div className="container">
      <div className="row mb--60">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <h2 className="title">Technologies you will learn.</h2>
          </div>
        </div>
      </div>
      {/* Start Card Area */}
      <div className="row g-5">
        {/* Start Service Grid  */}
        {technologies.map((technology, index) => {
          return(
            <div className="col-lg-4 col-xl-3 col-xxl-3 col-md-6 col-sm-6 col-12" key={index}>
              <div className="service-card service-card-5">
                <div className="inner">
                  <div className="icon">
                    <img src={technology.image} alt="Shape Images" />
                  </div>
                  <div className="content">
                    <h6 className="title">
                      <a href="#">{technology.title}</a>
                    </h6>
                    <p className="description"></p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {/* End Service Grid  */}
      </div>
      {/* End Card Area */}
    </div>
  </div>
  {/* End Service Area */}
  {/* Start Service Area */}
  <div className="rbt-service-area bg-color-white rbt-section-gap">
    <div className="container">
      <div className="row mb--60">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <h2 className="title">Our differentiating factors</h2>
          </div>
        </div>
      </div>
      {/* Start Card Area */}
      <div className="row row--15 mt_dec--30">
        {/* Start Single Card  */}
        <div className="col-xl-3 col-md-6 col-sm-6 col-12 mt--30">
          <div className="rbt-flipbox">
            <div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-1">
              <div className="rbt-flipbox-front rbt-flipbox-face inner">
                <div className="icon">
                  <img
                    src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/card-icon-1.png"
                    alt="card-icon"
                  />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="#">Best way to learn coding</a>
                  </h5>
                  <p>
                    
                  </p>
                  <a className="rbt-btn-link stretched-link" href="#">
                    Learn More
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="rbt-flipbox-back rbt-flipbox-face inner">
                <p>
                  Say bye to boring recorded videos, say hi to Avidia!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Card  */}
        {/* Start Single Card  */}
        <div className="col-xl-3 col-md-6 col-sm-6 col-12 mt--30">
          <div className="rbt-flipbox">
            <div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-2">
              <div className="rbt-flipbox-front rbt-flipbox-face inner">
                <div className="icon">
                  <img
                    src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/card-icon-2.png"
                    alt="card-icon"
                  />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="#">Practise on projects</a>
                  </h5>
                  <p> 
                  </p>
                  <a className="rbt-btn-link stretched-link" href="#">
                    Learn More
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="rbt-flipbox-back rbt-flipbox-face inner">
                <p>
                Work on real world projects and get hands on experience. 
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Card  */}
        {/* Start Single Card  */}
        <div className="col-xl-3 col-md-6 col-sm-6 col-12 mt--30">
          <div className="rbt-flipbox">
            <div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-3">
              <div className="rbt-flipbox-front rbt-flipbox-face inner">
                <div className="icon">
                  <img
                    src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/card-icon-3.png"
                    alt="card-icon"
                  />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="#">Live sessions</a>
                  </h5>
                  <p>
                   
                  </p>
                  <a className="rbt-btn-link stretched-link" href="#">
                    Learn More
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="rbt-flipbox-back rbt-flipbox-face inner">
                <p>
                  Live sessions by the best mentors who have already worked on production services. Get to know the tips and tricks which are not available on the internet.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Card  */}
        {/* Start Single Card  */}
        <div className="col-xl-3 col-md-6 col-sm-6 col-12 mt--30">
          <div className="rbt-flipbox">
            <div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-4">
              <div className="rbt-flipbox-front rbt-flipbox-face inner">
                <div className="icon">
                  <img
                    src="https://cdn.global.noobsverse.com/avidia.lms/assets/images/icons/card-icon-4.png"
                    alt="card-icon"
                  />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="#">Zenith+ Community</a>
                  </h5>
                  <p>
                   
                  </p>
                  <a className="rbt-btn-link stretched-link" href="#">
                    Learn More
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="rbt-flipbox-back rbt-flipbox-face inner">
                <p>
                  Get access to a vibrant community of peer students, engage, collaborate and learn together.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Card  */}
      </div>
      {/* End Card Area */}
    </div>
  </div>
  {/* End Service Area */}
  <div className="rbt-list-style-area bg-color-white rbt-section-gap">
  <div className="container">
  <div className="row g-5">
    <div className="col-lg-3 col-md-6 col-12">
      <h3>Avidia</h3>
      <ul className="plan-offer-list">
        {
          features.map((feature, index)=> {
            return(
              <li className={ avidia[index] === 0 ? "off" : "" } key={index}><i className={ avidia[index] === 1 ? "feather-check" : "feather-x" } /> {feature}</li>
            )
          })
        }
      </ul>
    </div>
    <div className="col-lg-3 col-md-6 col-12">
      <h3>Codedamn</h3>
      <ul className="plan-offer-list">
      {
          features.map((feature, index)=> {
            return(
              <li className={ codedamn[index] === 0 ? "off" : "" } key={index}><i className={ codedamn[index] === 1 ? "feather-check" : "feather-x" } /> {feature}</li>
            )
          })
        }
      </ul>
    </div>
    <div className="col-lg-3 col-md-6 col-12">
      <h3>Youtube</h3>
      <ul className="plan-offer-list">
      {
          features.map((feature, index)=> {
            return(
              <li className={ youtube[index] === 0 ? "off" : "" } key={index}><i className={ youtube[index] === 1 ? "feather-check" : "feather-x" } /> {feature}</li>
            )
          })
        }
      </ul>
    </div>
    <div className="col-lg-3 col-md-6 col-12">
      <h3>Apna College</h3>
      <ul className="plan-offer-list">
      {
          features.map((feature, index)=> {
            return(
              <li className={ apnaCollege[index] === 0 ? "off" : "" } key={index}><i className={ apnaCollege[index] === 1 ? "feather-check" : "feather-x" } /> {feature}</li>
            )
          })
        }
      </ul>
    </div>
  </div>
</div>
  </div>
  <div className="rbt-team-area bg-color-white rbt-section-gap">
  <div className="container">
    <div className="row mb--60">
      <div className="col-lg-12">
        <div className="section-title text-center">
          <h5 className="title">Our mentors</h5>
          <p className="description mt--10">Get to know about our amazing mentors</p>
        </div>
      </div>
    </div>
    <div className="row row--15 mt_dec--30">
      {/* Start Single Team  */}
      {
        mentors.map((mentor, index)=>{
          return(
            <div className="col-lg-4 col-md-6 col-12 mt--30" key={index}>
              <div className="team team-style--bottom">
                <div className="thumbnail">
                  <img src={mentor.profile} alt="Blog Images" />
                </div>
                <div className="content">
                  <h4 className="title">{mentor.name}</h4>
                  <p className="designation">{mentor.designation}</p>
                </div>
                <ul className="social-icon">
                  <li>
                    <a href={mentor.socials}>
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )
        })
      }
      {/* End Single Team  */}
    </div>
  </div>
</div>
</div>
  <div className="rbt-separator-mid">
    <div className="container">
      <hr className="rbt-separator m-0" />
    </div>
  </div>
</Layout>
        )
}