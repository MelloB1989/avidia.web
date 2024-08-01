import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/lms_components/layout/common";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import querygen from "@querygen";

export default function AddQuestion() {
  const [e, setError] = useState("");
  const [slug, setSlug] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [name, setName] = useState("");
  const currentDateTime = new Date().toJSON().split("T")[0] + "T00:00";

  useEffect(() => {
    setStart(currentDateTime);
    setEnd(currentDateTime);
    // console.log(start, end);
  }, []);

  const [addQuizContest, { data, loading, error }] = useMutation(
    querygen("addQuizContest"),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tid = toast.info("Uploading file...");
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://files.avidia.site/upload",
        formData,
      );
      toast.success("File uploaded");
      const url = response.data.url;

      if (
        url === "" ||
        slug === "" ||
        courseId === "" ||
        description === "" ||
        start === "" ||
        end === "" ||
        name === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      } else {
        try {
          const id = toast.info("Adding contest...");
          await addQuizContest({
            variables: {
              input: {
                slug,
                course_id: courseId,
                description,
                start,
                end,
                name,
                image: url,
              },
            },
          });
          setError("Contest added successfully");
          toast.update(id, {
            type: "success",
            render: "Contest added successfully",
          });
          toast.dismiss(tid);
        } catch (e) {
          setError(e.message);
          toast.error(e.message);
        }
      }
    } catch (error) {
      console.error("Error creating contest", error);
    }
  };

  return (
    <Layout title="Add quiz contest | Avidia">
      {/* End Side Vav */}
      <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h2 className="title">Create Quiz Contest</h2>
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
                <h3 className="title">Add Contest</h3>
                <span className="rbt-badge-6 bg-secondary-opacity">{e}</span>
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
                        setSlug(event.target.value);
                      }}
                    />
                    <label>Slug *</label>
                    <span className="focus-border" />
                  </div>
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
                        setDescription(event.target.value);
                      }}
                    />
                    <label>Description *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                      }}
                    />
                    <label className="img-label">Image *</label>
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      className="date-input"
                      value={start}
                      min={currentDateTime}
                      type="datetime-local"
                      onChange={(event) => {
                        setStart(event.target.value);
                      }}
                    />
                    <label>Starting Date *</label>
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      className="date-input"
                      value={end}
                      min={currentDateTime}
                      type="datetime-local"
                      onChange={(event) => {
                        setEnd(event.target.value);
                      }}
                    />
                    <label>Ending date *</label>
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
                  <div className="form-submit-group mb--20">
                    <button
                      type="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                      onClick={handleSubmit}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Add quiz contest</span>
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
