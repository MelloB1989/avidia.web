import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import Skeleton from 'react-loading-skeleton';
import quizCard from './quiz_card';

export default function QuizContests({course_id}){
  
    const [quizzes, setQuizzes] = useState();
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState("upcoming");
    const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
    const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
    const [pastQuizzes, setPastQuizzes] = useState([]);
    

    const { loading: quizLoading, error, data } = useQuery(querygen("getQuizContestByCourseId", course_id));

    useEffect(()=>{
      if(data){
        let upcoming = [];
        let ongoing = [];
        let past = [];
        setQuizzes(data.queryQuizContestsByIdCourseIndex.items);
        const now = new Date();
        data.queryQuizContestsByIdCourseIndex.items.forEach(quiz => {
          const start = new Date(quiz.start);
          const end = new Date(quiz.end);

          if (start > now) {
            upcoming.push(quiz);
          } else if (start <= now && end >= now) {
            ongoing.push(quiz);
          } else if (end < now) {
            past.push(quiz);
          }
        });
        setUpcomingQuizzes(upcoming);
        setOngoingQuizzes(ongoing);
        setPastQuizzes(past);
        setLoading(false);
      }
    }
    ,[data]);

    useEffect(()=>{
      console.log(upcomingQuizzes, ongoingQuizzes, pastQuizzes);
    }, [upcomingQuizzes, ongoingQuizzes, pastQuizzes])

    return(
        <>
        {loading? (<Skeleton height={300}/>) : (<div className="content">
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
              <span className="title">Upcoming Quizzes</span>
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
              <span className="title">Ongoing Quizzes</span>
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
              <span className="title">Past Quizzes</span>
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
            {currentTab === "upcoming" ? upcomingQuizzes.map((quiz)=>{
              return (<div className="col-lg-4 col-md-6 col-12">
                <div className="rbt-card variation-01 rbt-hover">
              <div className="rbt-card-img">
                <a href={`/contests/${quiz.slug}`}>
                  <img
                    src={quiz.image ? quiz.image : "https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg"}
                    alt="Avidia Quiz Background"
                  />
                </a>
              </div>
              <div className="rbt-card-body">
                <h4 className="rbt-card-title">
                  <a href={`/contests/${quiz.slug}`}>{quiz.name}</a>
                </h4>
                <p>{quiz.description.substring(0, 30)}{quiz.description.length > 30 ? "..." : ""}</p>
              </div>
            </div>
            </div>
            )
            }) : currentTab === "ongoing" ? ongoingQuizzes.map((quiz)=>{
              return (<div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <a href={`/contests/${quiz.slug}`}>
                <img
                  src={quiz.image ? quiz.image : "https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg"}
                  alt="Avidia Quiz Background"
                />
              </a>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <a href={`/contests/${quiz.slug}`}>{quiz.name}</a>
              </h4>
              <p>{quiz.description.substring(0, 30)}{quiz.description.length > 30 ? "..." : ""}</p>
            </div>
          </div>
          </div>)
            } ) : pastQuizzes.map((quiz)=>{
              return (<div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <a href={`/contests/${quiz.slug}`}>
                <img
                  src={quiz.image ? quiz.image : "https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg"}
                  alt="Avidia Quiz Background"
                />
              </a>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <a href={`/contests/${quiz.slug}`}>{quiz.name}</a>
              </h4>
              <p>{quiz.description.substring(0, 30)}{quiz.description.length > 30 ? "..." : ""}</p>
            </div>
          </div>
          </div>)
            })}
            {currentTab === "upcoming" && upcomingQuizzes.length === 0 ? <div className="col-12"><h3 className="text-center">No upcoming Quizzes</h3></div> : currentTab === "ongoing" && ongoingQuizzes.length === 0 ? <div className="col-12"><h3 className="text-center">No ongoing Quizzes</h3></div> : currentTab === "past" && pastQuizzes.length === 0 ? <div className="col-12"><h3 className="text-center">No past Quizzes</h3></div> : null}
          </div>
        </div>
  </div>
  {/* End Enrole Course  */}
</div>
      )}
      </>
        )
}