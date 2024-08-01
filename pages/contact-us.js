import Layout from '../components/lms_components/layout/common';

export default function PrivacyPolicy(){
    return(
        <>
        <Layout title="Contact Us || Avidia">
        <>
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-conatct-area bg-gradient-11 rbt-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center mb--60">
            <span className="subtitle bg-secondary-opacity">Contact Us</span>
            <h2 className="title">
              Avidia Contact <br /> can join with us.
            </h2>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
          data-sal="slide-up"
          data-sal-delay={150}
          data-sal-duration={800}
        >
          <div className="rbt-address">
            <div className="icon">
              <i className="feather-headphones" />
            </div>
            <div className="inner">
              <h4 className="title">Contact Phone Number</h4>
              <p>
                <a href="tel:+917569236628">+91 7569236628</a>
              </p>
              <p>
                <a href="tel:+917013154979">+91 7013154979</a>
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
          data-sal="slide-up"
          data-sal-delay={200}
          data-sal-duration={800}
        >
          <div className="rbt-address">
            <div className="icon">
              <i className="feather-mail" />
            </div>
            <div className="inner">
              <h4 className="title">Our Email Address</h4>
              <p>
                <a href="mailto:support@avidia.in">support@avidia.in</a>
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
          data-sal="slide-up"
          data-sal-delay={250}
          data-sal-duration={800}
        >
          <div className="rbt-address">
            <div className="icon">
              <i className="feather-map-pin" />
            </div>
            <div className="inner">
              <h4 className="title">Our Location</h4>
              <p>
                Anurag University<br /> Ghatkesar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
        </Layout>
        </>
        )
}