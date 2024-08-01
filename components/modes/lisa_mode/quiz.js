import { useState } from 'react';
import Head from 'next/head';
import {toast} from 'react-toastify';

export default function Practise({ set_quiz_url }){
    
    const BASE_URL = "https://ai-quiz-generator-next.vercel.app/quiz?";
    
    const [difficulty, setDifficulty] = useState("begineer");
    const [topic, setTopic] = useState("loops and conditional statements");
    
    const create_quiz = () => {
      set_quiz_url(`${BASE_URL}language=c&difficulty=${difficulty}&topic=${topic}&numQuestions=5`);
    }
    
    return(
        <>
        <Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/js/bootstrap.bundle.min.js"></script>
        </Head>
        <div className="d-flex align-items-center vertical-center">
  <div className="container">
  <div className="row">
      <div className="col">
        <h1 style={{"color":"white"}}>Quiz AI</h1>
       </div>
    </div>
    <div className="row my-3">
        <h6 style={{"color":"orange"}}>
          V2.69<br/>Solve unlimited and unique questions to make yourself completely ready ⚡
<br/><br/>Choose difficulty level below to get started 😎
        </h6>
    </div>
    <div className="row">
      <div className="col">
        <div className="text-center">
<div className="btn-group mx-3 my-3">
<div className="text-center my-3">
        <button type="button" className="btn btn-success btn-rounded mx-3" onClick={()=>{
        toast.success("Generating...");
      setDifficulty("begineer")
      create_quiz();
    }}>
          Beginner
        </button>
        </div>
        <div className="text-center my-3">
        <button type="button" className="btn btn-warning btn-rounded mx-3"  onClick={()=>{
        toast.success("Generating...");
      setDifficulty("intermediate")
      create_quiz();
    }}>
          Intermediate
        </button>
        </div>
        <div className="text-center my-3">
        <button type="button" className="btn btn-danger btn-rounded mx-3" onClick={()=>{
       toast.success("Generating...");
      setDifficulty("advanced")
      create_quiz();
    }}>
          Advanced
        </button>
        </div>
</div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
        )
}