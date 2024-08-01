import Layout from '@/components/lms_components/layout/common';

export default function Contact(){
    return(
        <Layout title="Contact Us || Avidia">
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-conatct-area bg-gradient-11 rbt-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center mb--60">
            <span className="subtitle bg-secondary-opacity">Contact Us</span>
            <h2 className="title">
              Contact Avidia Team <br />
            </h2>
            <h4>A CoffeeCodes x Noobsverse Project</h4>
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
                <a href="tel:+917569236628">+91 75692 36628</a>
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
                <a href="mailto:cs@avidia.in">cs@avidia.in</a>
              </p>
              <p>
                <a href="mailto:kartikdd90@gmail.com">kartikdd90@gmail.com</a>
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
              H.no: 7-11-27, Srinivasa teachers colony, Nallakunta,<br />Gadwal, Telangana. <br />PIN:509125 <br /> India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rbt-contact-address">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="thumbnail">
            <img
              className="w-100 radius-6"
              src="https://avidia.in/assets/images/logo.png"
              alt="Contact Images"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="rbt-contact-form contact-form-style-1 max-width-auto">
            <div className="section-title text-start">
              <span className="subtitle bg-primary-opacity">
                Avidia Labs
              </span>
            </div>
            <h3 className="title">Leave us a feedback.</h3>
            <form
              id="contact-form"
              method="POST"
              action="mail.php"
              className="rainbow-dynamic-form max-width-auto"
            >
              <div className="form-group">
                <input name="contact-name" id="contact-name" type="text" />
                <label>Name</label>
                <span className="focus-border" />
              </div>
              <div className="form-group">
                <input name="contact-phone" type="email" />
                <label>Email</label>
                <span className="focus-border" />
              </div>
              <div className="form-group">
                <input type="text" id="subject" name="subject" />
                <label>Your Subject</label>
                <span className="focus-border" />
              </div>
              <div className="form-group">
                <textarea
                  name="contact-message"
                  id="contact-message"
                  defaultValue={""}
                />
                <label>Message</label>
                <span className="focus-border" />
              </div>
              <div className="form-submit-group">
                <button
                  name="submit"
                  type="submit"
                  id="submit"
                  className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">GET IT NOW</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
        </Layout>
        )
}