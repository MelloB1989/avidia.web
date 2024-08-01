import { useState } from "react";
import Layout from "@/components/lms_components/layout/common";
import {useMutation} from "@apollo/client";
import querygen from "@querygen";
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify";

export default function AddQuestion() {
  const [e, setError] = useState("");
  const [id, setId] = useState("");
  const [contest_slug, setContestSlug] = useState("");
  const [options_data, setOptionsData] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");

  const [addQuizQuestion, {data, loading, error}] = useMutation(querygen("addQuizQuestion"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(contest_slug === "" || options_data === "" || question === "" || description === "" || score === "" || answer === "") {
      setError("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
    else{
      try{
        const id = toast.info("Adding question...");
        await addQuizQuestion({
          variables: {
            input: {
              id: uuidv4(),
              contest_slug,
              options_data,
              question,
              description,
              score,
              answer
            }
          }
        });
        setError("Question added successfully");
        toast.update(id, {type: "success", render: "Question added successfully"});
      }
      catch(e){
        setError(e.message);
        toast.error(e.message);
      }
    }
  };

  return (
    <Layout title="Add quiz question | Avidia">
      {/* End Side Vav */}
      <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h2 className="title">{contest_slug}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="close_side_menu" href="javascript:void(0);" />
      <div className="rbt-elements-area bg-color-white rbt-section-gap">
        <div className="container">
          <div className="row gy-5 row--30">
            <div className="col-lg-6">
              <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                <h3 className="title">Add Question</h3>
                <span className="rbt-badge-6 bg-secondary-opacity">
                  {e}
                </span>
                <form
                  className="max-width-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      onChange={(event) => {
                        setContestSlug(event.target.value);
                      }}
                    />
                    <label>Contest Slug *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      onChange={(event) => {
                        setQuestion(event.target.value);
                      }}
                    />
                    <label>Question *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                    <label>Description *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="number"
                      onChange={(event) => {
                        setScore(event.target.value);
                      }}
                    />
                    <label>Score *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      onChange={(event) => {
                        setAnswer(event.target.value);
                      }}
                    />
                    <label>Correct Option *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      onChange={(event) => {
                        setOptionsData(event.target.value);
                      }}
                    />
                    <label>Other options seperated by comma *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-submit-group mb--20">
                    <button
                      type="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                      onClick={handleSubmit}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Add question</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
