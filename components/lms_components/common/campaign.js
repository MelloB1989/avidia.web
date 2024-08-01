const ASSETS_CDN_URL = "https://cdn.global.noobsverse.com/avidia.lms/";
export default function Campaign({ campaign_highlight, campaign_des, campaign_img, campaign_call_text, campaign_target_url }){
    return(
        <>
  {/* Start Campain Area  */}
  <div className="rbt-header-campaign rbt-header-campaign-1 rbt-header-top-news bg-image1 d-none d-lg-block">
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner justify-content-center">
              <div className="content">
                <span className="rbt-badge variation-02 bg-color-primary color-white radius-round">
                  {campaign_highlight}
                </span>
                <span className="news-text color-white-off">
                  <img
                    src={`${ASSETS_CDN_URL}assets/images/icons/hand-emojji.svg`}
                    alt="Hand Emojji Images"
                  />{" "}
                  {campaign_des}
                </span>
              </div>
              <div className="right-button">
                <a
                  className="rbt-btn-link color-white"
                  href={campaign_target_url}
                >
                  <span>
                    {campaign_call_text} <i className="feather-arrow-right" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="icon-close position-right">
      <button className="rbt-round-btn btn-white-off bgsection-activation">
        <i className="feather-x" />
      </button>
    </div>
  </div>
  {/* End Campain Area  */}
</>
        )
}