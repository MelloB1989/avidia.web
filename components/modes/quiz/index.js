import styles from '../../../styles/Home.module.css';

export default function QuizMode({URL}){
    // const url = "https://ai-quiz-generator-next.vercel.app/quiz?language=c&difficulty=beginner&topic=loops&numQuestions=2"
    return(
        <>
        <iframe className={styles.iframer} loading="lazy" height="100%" width="100%" src={URL}></iframe>
        </>
        )
}