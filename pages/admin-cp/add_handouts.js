//{courseId: "", description: "", id: "", name: "", url: ""}
import { useState } from "react";
import Layout from "@/components/lms_components/layout/common";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import querygen from "@querygen";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function AddQuestion() {
  const [e, setError] = useState("Only add one handout at a time");
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const [addHandout, { data, loading, error }] = useMutation(querygen("addHandouts"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const tid = toast.info("Uploading file...");
    try {
      const response = await axios.post(
        "https://files.avidia.site/upload",
        formData,
      );
      toast.update(tid, { type: "success", render: "File uploaded" });
      const url = response.data.url;

      if(url === "" || courseId === "" || name === ""){
        toast.error("Please fill all the fields");
        return;
      }
      else{
        try{
          const id = toast.info("Adding handout...");
          await addHandout({
            variables: {
              input: {
                id: uuidv4(),
                courseId,
                name,
                description,
                url
              }
            }
          });
          setError("Handout added successfully");
          toast.update(id, {type: "success", render: "Handout added successfully"});
        } catch (err) {
          toast.update(tid, {type: "error", render: "Error adding handout"});
          return;
        }
      }
    } catch (err) {
      toast.error("Error uploading handout");
      console.log(err);
      return;
    }
    setError("Added Handouts ✅");
  };

  return (
    <Layout title="Add Handouts | Avidia">
      {/* End Side Vav */}
      <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h2 className="title">Create Handouts</h2>
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
                <h3 className="title">Add Handout</h3>
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
                        setCourseId(event.target.value);
                      }}
                    />
                    <label>Course ID *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    <label>Name *</label>
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
                    <label>Description (optional)</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="file"
                      className="file-input"
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                      }}
                    />
                    <label className="img-label">File *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-submit-group mb--20">
                    <button
                      type="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                      onClick={handleSubmit}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Add Handout</span>
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
