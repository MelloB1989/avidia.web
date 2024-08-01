import {useQuery} from '@apollo/client'
import querygen from '@querygen'
import Skeleton from 'react-loading-skeleton'
import {useState, useEffect} from 'react'

export default function Analyze({quizSlug, answers, onClose}){

  const [questions, setQuestions] = useState([]);
  const {data, loading, error} = useQuery(querygen("getQuizContestQuestion", quizSlug));
  const parsedAnswers = JSON.parse(answers);
  
  useEffect(()=>{
    if(data) setQuestions(data.listQuizQuestions.items);
  }, [data]);

    return (
        <>
        <style>
{`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    padding: 20px;
    border-radius: 4px;
    width: 80%;
    max-width: 800px;
    height: 0px; /* Adjust this value to change the height */
    margin: auto 0; /* This will add equal padding to the top and bottom */
  }
`}
</style>
        <div className="modal">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-body">
          {loading ? (<Skeleton height={500}/>) : (
        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
    <div className="content">
      <div className="section-title">
        <h4 className="rbt-title-style-3">My Quiz Attempts</h4>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
        <table className="rbt-table table table-borderless">
          <thead>
            <tr>
            <th>ID</th>
              <th>Question</th>
              <th>Score</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>Result</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {questions?.map((question, index)=>{
              return (
                <tr>
              <th>
                <span className="b3">
                  {question.id}
                </span>
              </th>
              <td>
                <p className="h6 mb--5">{question.question}</p>
              </td>
              <td>
                <p className="b3">{question.score}</p>
              </td>
              <td>
                <p className="b3">{parsedAnswers[index].answer}</p>
              </td>
              <td>
                <p className="b3">{question.answer}</p>
              </td>
              <td>
                {parsedAnswers[index].answer === question.answer ? (<span className="rbt-badge-5 bg-color-success-opacity color-success">
                  Pass
                </span>) : (
                  <span class="rbt-badge-5 bg-color-danger-opacity color-danger">Fail</span>
                )}
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
          )}
        </div>
      </div>
    </div>
</>
    )
}