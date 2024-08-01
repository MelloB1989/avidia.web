export default function quizCard({quiz}){
    //console.log("Qsjhd",quiz)
    return(
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
      )
}