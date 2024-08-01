import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import querygen from '@querygen'
import Layout from '@components/lms_components/layout/protected-raw';
import {toast} from 'react-toastify';
import axios from 'axios';
import get_jwt from '@/lib/frontend_functions/get_jwt';
import {UserContext} from '@/components/lms_components/layout/UserContext';
import decode_jwt from '@/lib/frontend_functions/decode_jwt';

export default function QuizLanding(){
    const router = useRouter();
    const { quiz_slug } = router.query;
    const { userData, setUserData } = useContext(UserContext);
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [current, setCurrent] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [endScreen, setEndScreen] = useState(false);
    const [timer, setTimer] = useState(0);
    const [min, setMin] = useState(Math.floor(timer / 60));
    const [sec, setSec] = useState(timer % 60);
    const [violations, setViolations] = useState(0);
    const [answers, setAnswers] = useState([]);

    const {data, loading, error} = useQuery(querygen("getQuizContestBySlug"), {
        variables: { slug: quiz_slug },
        onCompleted: (data) => {
            setQuiz(data.queryQuizContestsByIdSlugIndex.items[0]);
        },
    });

    const { loading: ql, error: qe, data: qd } = useQuery(querygen("getQuizAnswersByNbspId", (decode_jwt(get_jwt())).userId));
    useEffect(()=>{
      if(qd) {
        const quizzes = qd.queryQuizAnswersByNbspIdCourseIdIndex.items;
        quizzes.map((quiz)=> {
          if(quiz.quizSlug === quiz_slug) {
            console.log("Quiz attempted!");
            window.location.href = '/dashboard'
            setQuizStarted(false);
            setEndScreen(true);
          }
        })
      }  
    }, [qd]);

    const {data: d, loading: l, error: e} = useQuery(querygen("getQuizContestQuestions"), {
        variables: { filter: { contest_slug: {eq: quiz_slug} } },
        onCompleted: (data) => {
            setQuestions((questions) => {
              const newQuestions = data.listQuizQuestions.items;
              setCurrentQuestion(newQuestions[0]);
              return newQuestions;
            });
        },
    });

    const quizSubmit = async () => {
      if (violations >= 300) {
        alert("You have been disqualified from the quiz for violating the rules.");
        return;
      }
      if (answers.length !== questions.length) {
        alert("Please answer all the questions before submitting.");
        return;
      }
      const data = await axios.post('/api/contests/quiz_submit', {
        answers,
        quiz,
        timer,
        token: get_jwt(),
      },{
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (data.status === 200) {
        toast.success(`Quiz submitted successfully.`);
        setQuizStarted(false);
        setEndScreen(true);
      }
    }

    const enterFullscreen = () => {
      // Enter fullscreen and set up event listener
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        document.onfullscreenchange = handleFullscreenChange;
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
        document.onmozfullscreenchange = handleFullscreenChange;
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
        document.onwebkitfullscreenchange = handleFullscreenChange;
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
        document.onmsfullscreenchange = handleFullscreenChange;
      }
      // Handle fullscreen change
      function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          setViolations((violations) => {
            const newViolations = violations + 1;
            alert(`You've exited fullscreen. This comes under quiz violations. If you do this again, you will be disqualified. ${newViolations}/3 violations left.`);
            return newViolations;
          });
        }
      }
      window.onresize = function() {
        if ((window.outerHeight - window.innerHeight) > 200) {
          setViolations((violations) => {
            const newViolations = violations + 1;
            alert(`You've opened inspect tab. This comes under quiz violations. If you do this again, you will be disqualified. ${newViolations}/3 violations left.`);
            return newViolations;
          });
        }
      }
      if (window.console && window.console.firebug) {
        setViolations((violations) => {
          const newViolations = violations + 1;
          alert(`You've opened inspect tab. This comes under quiz violations. If you do this again, you will be disqualified. ${newViolations}/3 violations left.`);
          return newViolations;
        });
      }
      // Show alert when user changes tabs
      document.onvisibilitychange = function () {
        if (document.hidden) {
          setViolations((violations) => {
            const newViolations = violations + 1;
            alert(`You've switched tabs. This comes under quiz violations. If you do this again, you will be disqualified. ${newViolations}/3 violations left.`);
            return newViolations;
          });
        }
      };
    }

    const startQuiz = async () => {
      setQuizStarted(true);
      setTimer(0);
      setInterval(() => {
        setTimer((timer) => {
          const newTimer = timer + 1;
          setMin(Math.floor(newTimer / 60));
          setSec(newTimer % 60);
          return newTimer;
        });
      }, 1000);
      enterFullscreen();
      // Show alert when user tries to exit, change screen, or reload
      window.onbeforeunload = function () {
        return "Are you sure you want to leave? Any progress will be lost.";
      };
    }

    return(
        <Layout title={`${quiz?.name} | Avidia`}>
 <>
  <div className="rbt-lesson-area bg-color-white overflow-hidden" style={{overflow: 'hidden'}}>
    <div className="rbt-lesson-content-wrapper">
    <div className="rbt-lesson-leftsidebar overflow-auto custom-scrollbar-css p-2" style={{overflow: 'auto', height: '100vh'}}>
        <div className="rbt-course-feature-inner rbt-search-activation">
          <div className="section-title">
            <h4 className="rbt-title-style-3">{quiz?.name}</h4>
          </div>
          <div className="accordion-body card-body">
                    <ul className="rbt-course-main-content liststyle">
                      {questions?.map((question, index) => {
                        return (
                          <li>
                        <a href="#" onClick={()=> {
                          setCurrent(index);
                          setCurrentQuestion(question);
                        }}>
                          <div className="course-content-left">
                            <i className="feather-help-circle" />{" "}
                            <span className="text">{question.question}</span>
                          </div>
                          <div className="course-content-right">
                            <span className="rbt-check unread">
                              <i className="feather-circle" />
                            </span>
                          </div>
                        </a>
                      </li>
                        )
                      })}
                    </ul>
                  </div>          
        </div>
      </div>
      <div className="rbt-lesson-rightsidebar overflow-hidden" style={{overflow: 'hidden'}}>
        <div className="lesson-top-bar">
          <div className="lesson-top-left">
            <div className="rbt-lesson-toggle">
              <button
                className="lesson-toggle-active btn-round-white-opacity"
                title="Toggle Sidebar"
              >
                <i className="feather-arrow-left" />
              </button>
            </div>
            <h5>{quiz?.name}</h5>
          </div>
          <div className="lesson-top-right">
            <div className="rbt-btn-close">
              <a
                href="course-details.html"
                title="Go Back to Course"
                className="rbt-round-btn"
              >
                <i className="feather-x" />
              </a>
            </div>
          </div>
        </div>
        {!quizStarted ? (
        <div className="inner">
          <div className="content">
            <div className="section-title">
              <h4>
                Avidia Quiz Constests
              </h4>
              <div className="bg-color-white rbt-shadow-box">
                <h5 className="rbt-title-style-3">{quiz?.name}</h5>
                { (new Date() < new Date(quiz?.start)) ? (<>
                <p>Quiz has not yet started.</p>
                </>) : (
                  <>
                <p>
                  Welcome to the Avidia Quiz Contests. Please read the following rules before starting the quiz:
                  <ul>
                    <li>Each participant can attempt the quiz only once.</li>
                    <li>Do not refresh the page, it will lead to disqualification.</li>
                    <li>Do not close the browser tab until the quiz is submitted, it will lead to disqualification.</li>
                    <li>Switching tabs or windows during the quiz is not allowed.</li>
                    <li>Opening inspect element or developer tools is not allowed.</li>
                    <li>The quiz will automatically submit when the time is up.</li>
                    <li>Questions with incomplete answers will be considered wrong.</li>
                    <li>There is no negative marking for wrong answers.</li>
                  </ul>
                </p>
                <div className="submit-btn">
                  <a
                    className="rbt-btn btn-gradient hover-icon-reverse"
                    href="#"
                    onClick={()=>{
                      startQuiz();
                      toast.success("Quiz started! All the best!");
                    }}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Start the contest</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right" />
                      </span>
                    </span>
                  </a>
                </div>
                </>)}
              </div>
            </div>
          </div>
        </div>
        ) : endScreen ? (
          <>
          <h5 className="rbt-title-style-3">Quiz submitted. Scores will be out soon!</h5>
          </>
        ) : (
          <>
          <div className="inner">
          <div className="content">
            <form id="quiz-form" className="quiz-form-wrapper">
              <div id="question-1" className="question">
                <div className="quize-top-meta">
                  <div className="quize-top-left">
                    <span>
                      Questions No: <strong>{current + 1}/{questions?.length}</strong>
                    </span>
                  </div>
                  <div className="quize-top-right">
                    <span>
                      Timer: <strong>{min}:{sec}</strong>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="rbt-single-quiz">
                  <h4>{currentQuestion?.description}</h4>
                  {currentQuestion?.options_data?.split(",")?.map((option, index) => {
                    return (
                      <div className="row g-3 mt--10">
                        <div className="col-lg-6">
                          <p className="rbt-checkbox-wrapper mb--5">
                          <input
                            id={`rbt-radio-${index}`}
                            name={`rbt-radio`}
                            type="radio"
                            value={option.trim()}
                            checked={answers[current]?.answer === option.trim()}
                            defaultValue={option.trim()}
                            onClick={()=>setAnswers((answers)=>{
                              const newAnswers = [...answers];
                              newAnswers[current] = {
                                id: currentQuestion.id,
                                answer: option.trim(),
                              };
                              return newAnswers;
                            })}
                          />
                            <label htmlFor={`rbt-radio-${index}`}>{option}</label>
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-color-extra2 ptb--15 overflow-hidden">
          <div className="rbt-button-group">
            <a
              className={`rbt-btn ${(current <= 0 ) ? 'disabled' : ''} icon-hover icon-hover-left btn-md bg-primary-opacity`}
              href="#"
              onClick={()=>{
                setCurrent((current) => {
                  const newCurrent = current - 1;
                  setCurrentQuestion(questions[newCurrent]);
                  return newCurrent;
                });
              }}
            >
              <span className="btn-icon">
                <i className="feather-arrow-left" />
              </span>
              <span className="btn-text">Previous</span>
            </a>

            {current === questions?.length - 1 ? (
              <a className={`rbt-btn icon-hover btn-md`} href="#" onClick={() => {
                quizSubmit();
                }}>
                <span className="btn-text">Submit</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
              </a>
            ) : (
              <a className={`rbt-btn ${current === questions.length - 1 ? 'disabled' : ''} icon-hover btn-md`} href="#" onClick={() => {
                setCurrent((current) => {
                  const newCurrent = current + 1;
                  setCurrentQuestion(questions[newCurrent]);
                  return newCurrent;
                });
              }}>
                <span className="btn-text">Next</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right" />
                </span>
              </a>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  </div>
</>
        </Layout>
    )
}