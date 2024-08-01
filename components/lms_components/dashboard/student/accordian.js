export default function Accordian({ cover, avatar, first_name, last_name, username }){
    return(
        <>
  {/* Start Dashboard Top  */}
  <div className="rbt-dashboard-content-wrapper">
    <div className="tutor-bg-photo bg_image bg_image--23 height-350 width-450">
    <img src={cover} alt={first_name} />
    </div>
    {/* Start Tutor Information  */}
    <div className="rbt-tutor-information">
      <div className="rbt-tutor-information-left">
        <div className="thumbnail rbt-avatars size-lg">
          <img src={avatar} alt={first_name}/>
        </div>
        <div className="tutor-content">
          <h5 className="title">{first_name+" "+last_name}</h5>
        </div>
      </div>
      { username ? (
      <div className="rbt-tutor-information-right">
        <div className="tutor-btn">
          <a className="rbt-btn btn-md hover-icon-reverse" href={`https://spaces.noobsverse.com/${username}`}>
            <span className="icon-reverse-wrapper">
              <span className="btn-text">View your profile</span>
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
      ) : (<p></p>)
      }
    </div>
    {/* End Tutor Information  */}
  </div>
  {/* End Dashboard Top  */}
</>
        )
}