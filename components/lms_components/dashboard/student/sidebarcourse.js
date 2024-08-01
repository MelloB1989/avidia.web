export default function Sidebar({ first_name, last_name, change_view, course_id }){
    return(
        <>
  {/* Start Dashboard Sidebar  */}
  <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
    <div className="inner">
      <div className="content-item-content">
        <div className="rbt-default-sidebar-wrapper">
          <div className="section-title mb--20">
            <h6 className="rbt-title-style-2">{"Welcome, "+first_name+" "+last_name}</h6>
          </div>
          <nav className="mainmenu-nav">
            <ul className="dashboard-mainmenu rbt-default-sidebar-list">
              <li>
                <a href="#" onClick={(e)=>{
                 // e.preventDefault();
                  change_view("handouts")
                }}>
                  <i className="feather-book" />
                  <span>Handouts</span>
                </a>
              </li>
              <li>
                <a href={`/learn/${course_id}`} onClick={(e)=>{
                 // e.preventDefault();
                  change_view("practise")
                }}>
                  <i className="feather-zap" />
                  <span>Practise</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  change_view("quiz")
                }}>
                  <i className="feather-help-circle" />
                  <span>Quiz Contests</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  change_view("challenge")
                }}>
                  <i className="feather-code" />
                  <span>My Projects</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  change_view("live")
                }}>
                  <i className="feather-monitor" />
                  <span>Live Sessions</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="section-title mt--40 mb--20">
            <h6 className="rbt-title-style-2">User</h6>
          </div>
          <nav className="mainmenu-nav">
            <ul className="dashboard-mainmenu rbt-default-sidebar-list">
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  window.location.href = '/login';
                }}>
                  <i className="feather-log-out" />
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  {/* End Dashboard Sidebar  */}
</>
        )
}