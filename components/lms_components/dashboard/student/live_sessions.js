import LiveSessionsCard from './live_sessions_card';
import {useState, useEffect} from 'react';
import querygen from '@querygen';
import { useQuery } from "@apollo/client";

export default function LiveSessions({course_id}){

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [ongoingSessions, setOngoingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [currentTab, setCurrentTab] = useState("upcoming");

  const { loading, error, data } = useQuery(querygen("getLiveSessions"), {
    variables: { filter: { courseId: { eq: course_id } } },
    onCompleted: (data) => {
      const sessions = data.listLiveSessions.items;
      let upcoming = [];
      let ongoing = [];
      let past = [];
      sessions.forEach((session)=>{
        const timestamp = new Date(session.timestamp).getTime();
        let endTimestamp = session.endTimestamp ? new Date(session.endTimestamp).getTime() : null;
        const now = Date.now();
        if(timestamp > now){
          upcoming.push(session);
        }else if(timestamp < now && endTimestamp && endTimestamp > now){
          ongoing.push(session);
        }else{
          past.push(session);
        }
      })
      setUpcomingSessions(upcoming);
      setOngoingSessions(ongoing);
      setPastSessions(past);
    },
});

useEffect(()=>{
  console.log(upcomingSessions, ongoingSessions, pastSessions)
},[pastSessions, ongoingSessions, upcomingSessions])

    return(
        <>
    <div className="content">
      <div className="advance-tab-button mb--30">
        <ul
          className="nav nav-tabs tab-button-style-2 justify-content-start"
          id="myTab-4"
          role="tablist"
        >
          <li role="presentation">
            <a
              href="#"
              className="tab-button active"
              id="home-tab-4"
              data-bs-toggle="tab"
              data-bs-target="#home-4"
              role="tab"
              aria-controls="home-4"
              aria-selected="true"
              onClick={()=>setCurrentTab("upcoming")}
            >
              <span className="title">Upcoming Sessions</span>
            </a>
          </li>
          <li role="presentation">
            <a
              href="#"
              className="tab-button"
              id="profile-tab-4"
              data-bs-toggle="tab"
              data-bs-target="#profile-4"
              role="tab"
              aria-controls="profile-4"
              aria-selected="false"
              onClick={()=>setCurrentTab("ongoing")}
            >
              <span className="title">Ongoing Sessions</span>
            </a>
          </li>
          <li role="presentation">
            <a
              href="#"
              className="tab-button"
              id="contact-tab-4"
              data-bs-toggle="tab"
              data-bs-target="#contact-4"
              role="tab"
              aria-controls="contact-4"
              aria-selected="false"
              onClick={()=>setCurrentTab("past")}
            >
              <span className="title">Past Sessions</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="home-4"
          role="tabpanel"
          aria-labelledby="home-tab-4"
        >
          <div className="row g-5">
            {currentTab === "upcoming" ? upcomingSessions.map((session)=>{
              return (<LiveSessionsCard type="upcoming" bg={session.thumbnail} title={session.title} starts={session.timestamp} ends={session.endTimestamp} join_url={`https://live.avidia.site/meeting/${session.id}/student`} />)
            }) : currentTab === "ongoing" ? ongoingSessions.map((session)=>{
              return (<LiveSessionsCard type="ongoing" bg={session.thumbnail} title={session.title} starts={session.timestamp} ends={session.endTimestamp} join_url={`https://live.avidia.site/meeting/${session.id}/student`} />)
            } ) : pastSessions.map((session)=>{
              return (<LiveSessionsCard type="past" bg={session.thumbnail} title={session.title} starts={session.timestamp} ends={session.endTimestamp} join_url={`https://live.avidia.site/meeting/${session.id}/student`} />)
            })}
            {currentTab === "upcoming" && upcomingSessions.length === 0 ? <div className="col-12"><h3 className="text-center">No upcoming sessions</h3></div> : currentTab === "ongoing" && ongoingSessions.length === 0 ? <div className="col-12"><h3 className="text-center">No ongoing sessions</h3></div> : currentTab === "past" && pastSessions.length === 0 ? <div className="col-12"><h3 className="text-center">No past sessions</h3></div> : null}
          </div>
        </div>
  </div>
  {/* End Enrole Course  */}
</div>
        </>
        )
}