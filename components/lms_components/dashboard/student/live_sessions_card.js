export default function LiveSessionCard({bg, title, starts, ends, type, join_url}){
    return(
        <>
        <div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <a href={join_url}>
                    <img
                      src={bg}
                      alt="Avidia Live"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <div className="rbt-card-top">
                  </div>
                  <h4 className="rbt-card-title">
                    <a href="course-details.html">{title}</a>
                  </h4>
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-clock" />
                      Starts at {starts}
                    </li>
                    <li>
                      <i className="feather-clock" />
                      Ends at {ends}
                    </li>
                  </ul>
                  <div className="rbt-card-bottom">
                    <a
                      className="rbt-btn btn-sm bg-primary-opacity w-100 text-center"
                      href={join_url}
                    >
                      {type === "ongoing" ? "Join now" : type === "upcoming" ? "Remind me" : "Watch recorded"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}