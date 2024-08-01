import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import querygen from '@querygen'
import Layout from '@components/lms_components/layout/protected';

export default function QuizLanding(){
    const router = useRouter();
    const { quiz_slug } = router.query;
    const [quiz, setQuiz] = useState({});
    const [date, setDate] = useState();

    const {data, loading, error} = useQuery(querygen("getQuizContestBySlug"), {
        variables: { slug: quiz_slug },
        onCompleted: (data) => {
            setQuiz(data.queryQuizContestsByIdSlugIndex.items[0]);
        },
    });

    useEffect(()=>{
        if (data) {
            setQuiz(data.queryQuizContestsByIdSlugIndex.items[0]);
            setDate(new Date());
        }
    } ,[data]);

    function CountdownTimer({ targetDate }) {
      const calculateTimeLeft = () => {
          const difference = +new Date(targetDate) - +new Date();
          let timeLeft = {};
  
          if (difference > 0) {
              timeLeft = {
                  days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                  hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                  minutes: Math.floor((difference / 1000 / 60) % 60),
                  seconds: Math.floor((difference / 1000) % 60)
              };
          }
  
          return timeLeft;
      };
  
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
      useEffect(() => {
          const timer = setTimeout(() => {
              setTimeLeft(calculateTimeLeft());
          }, 1000);
  
          return () => clearTimeout(timer);
      });
  
      return (
          <div className="countdown justify-content-center" data-time={targetDate}>
              <div className="countdown-container days" style={{backgroundColor: 'rgba(128, 128, 128, 0.8)'}}>
                  <span className="countdown-value">{timeLeft.days}</span>
                  <span className="countdown-heading">Days</span>
              </div>
              <div className="countdown-container hours" style={{backgroundColor: 'rgba(128, 128, 128, 0.8)'}}>
                  <span className="countdown-value">{timeLeft.hours}</span>
                  <span className="countdown-heading">Hours</span>
              </div>
              <div className="countdown-container minutes" style={{backgroundColor: 'rgba(128, 128, 128, 0.8)'}}>
                  <span className="countdown-value">{timeLeft.minutes}</span>
                  <span className="countdown-heading">Minutes</span>
              </div>
              <div className="countdown-container seconds" style={{backgroundColor: 'rgba(128, 128, 128, 0.8)'}}>
                  <span className="countdown-value">{timeLeft.seconds}</span>
                  <span className="countdown-heading">Seconds</span>
              </div>
          </div>
      );
  }

    return(
        <Layout title={`${quiz?.name} | Avidia`}>
            <a className="close_side_menu" href="javascript:void(0);" />
            <br/><br/><br/><br/>
        <div className="rbt-dashboard-content-wrapper">
        <div >
        <img src={quiz?.image} alt={quiz?.name} style={{width: '1300px', height: '350px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px', marginRight: '20px', marginLeft: '20px'}} />
</div>
        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="tutor-content">
              <h5 className="title">{quiz?.name}</h5>
              <strong><p>{quiz?.description}</p></strong>
            </div>
          </div>
          <div className="rbt-tutor-information-right">
            <div className="tutor-btn">
            <a className={`rbt-btn btn-md hover-icon-reverse ${date < new Date(quiz?.start) ? 'disabled' : ''}`} href={date < new Date(quiz?.start) ? '#' : `/contests/solve/${quiz.slug}`}>
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Solve</span>
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
          </div>
          </div>

          <div className="rbt-page-banner-wrapper">
          <div className="rbt-banner-image" />
          <h2 className="title color-orange" style={{textAlign: 'center'}}>Starts in</h2>
          <div className="countdown-style-1 mt--50 justify-content-center">
          <CountdownTimer targetDate={quiz ? quiz?.start : ""} />
</div>
  </div>
        </Layout>
    )
}