import Accordian from './accordian';
import Sidebar from './sidebar';
import Dash from './dash';
import Courses from './enrolled_courses';
import Quizzes from './attempted_quizzes';
import Transactions from './transactions';
import { useState } from 'react';

export default function Dashboard({userData, access_token}){
  const [sidebar_view, setSidebar] = useState("quiz");
  
  const change_view = (view) => {
    setSidebar(view);
    //console.log(view);
  }
  
    return(
        <>
          <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-page-banner-wrapper">
    {/* Start Banner BG Image  */}
    <div className="rbt-banner-image" />
    {/* End Banner BG Image  */}
  </div>
  {/* Start Card Style */}
  <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          {/* Start Dashboard Top  */}
          <Accordian cover={userData.cover} avatar={userData.avatar} username={userData.username} first_name={userData.first_name} last_name={userData.last_name}/>
          {/* End Dashboard Top  */}
          <div className="row g-5">
            <div className="col-lg-3">
              {/* Start Dashboard Sidebar  */}
              <Sidebar first_name={userData.first_name} last_name={userData.last_name} change_view={change_view}/>
              {/* End Dashboard Sidebar  */}
            </div>
            <div className="col-lg-9">
              <div className="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
                <div className="content">
                  <div className="section-title">
                    <h4 className="rbt-title-style-3">{sidebar_view === "dash" ? "Dashboard" : sidebar_view === "profile" ? "Profile" : sidebar_view === "quiz" ? "My Quiz Attempts" : sidebar_view === "courses" ? "My courses" : sidebar_view === "order_history" ? "My orders" : "WTF"}</h4>
                  </div>
                  
                    {sidebar_view === "courses" ? (<Courses access_token={access_token} user_data={userData}/>) : sidebar_view === "order_history" ? (<Transactions user_id={userData.user_id}/>) : (<Quizzes access_token={access_token} user_data={userData}/>)}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Card Style */}
</>
        )
}