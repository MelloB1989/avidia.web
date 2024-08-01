import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import Skeleton from 'react-loading-skeleton';
import AnalyzeQuiz from './analyze_quiz';

export default function Courses({access_token, user_data}){
  
  const [quizzes, setQuizzes] = useState();
  const { loading, error, data } = useQuery(querygen("getQuizAnswersByNbspId", user_data.user_id));
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizSlug, setQuizSlug] = useState();
  
  useEffect(()=>{
    if(data) setQuizzes(data.queryQuizAnswersByNbspIdCourseIdIndex.items)  
  }, [data]);
    //console.log(courses?.length);
    return(
        <>
        {loading? (<Skeleton height={300}/>) : (<div className="col-lg-9">
         { show ? (<AnalyzeQuiz answers={answers} quizSlug={quizSlug} onClose={()=> setShow(false)}/>) : `` }
      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="home-4"
          role="tabpanel"
          aria-labelledby="home-tab-4"
        >
          <div className="row g-5">
           {!(quizzes?.length === 0) ? quizzes?.map((quiz) => {
            return (
            <div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <a href="#" onClick={() => {
                      setShow(true);
                      setAnswers(quiz.answers);
                      setQuizSlug(quiz.quizSlug);
                    }}>
                    <img
                      src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/Untitled_design-removebg-preview.png"
                      alt="Card image"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                <h1 className="rbt-card-title">
                    <a href="#" onClick={() => {
                      setShow(true);
                      setAnswers(quiz.answers);
                      setQuizSlug(quiz.quizSlug);
                    }}>{quiz.quizSlug}</a>
                  </h1>
                </div>
                <p>Score: <strong>{quiz.score}</strong>
                  </p>
                  <p>Solved in <strong>{Math.floor(quiz.timeTaken/60)} minutes ⚡</strong></p>
              </div>
            </div>
            )
        }) : <h1>No solved Quizzes</h1>}
          </div>
        </div>
      </div>
      </div>
      )}
      </>
        )
}