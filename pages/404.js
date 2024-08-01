import Layout from '../components/lms_components/layout/common';
export default function four_zero_four(){
    return(
        <Layout title="Page not found">
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-error-area bg-gradient-11 rbt-section-gap">
    <div className="error-area">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-10">
            <h1 className="title">404!</h1>
            <h3 className="sub-title">Page not found</h3>
            <p>The page you were looking for could not be found.</p>
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
</Layout>
        )
}