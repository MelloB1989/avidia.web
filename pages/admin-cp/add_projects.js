import { useState } from "react";
import Layout from "@/components/lms_components/layout/common";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import querygen from "@querygen";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import get_jwt from "@/lib/frontend_functions/get_jwt";

export default function AddQuestion() {
  const [e, setError] = useState("Only add one Project at a time");
  const [project, setProject] = useState({
                courseID: "", 
                description: "", 
                price: "", 
                project_slug: "", 
                template_url: "", 
                title: "", 
                thumbnail: ""
  });
  const [file, setFile] = useState();

  const [addProject, { data, loading, error }] = useMutation(querygen("createAvidiaProjectDetails"));


  const get_project_by_slug = async () => {
    const r = await axios.get(`http://localhost:8081/v1/projects/getProjectBySlug/${project.project_slug}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+get_jwt()
        }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
        try{
          const id = toast.info("Adding Project...");
          await addProject({
            variables: {
              input: {
                courseID: project.courseID, 
                description: project.description, 
                price: project.price, 
                project_slug: project.project_slug, 
                template_url: project.template_url, 
                title: project.title, 
                thumbnail: project.thumbnail
              }
            }
          });
          setError("Project added successfully");
          toast.update(id, {type: "success", render: "Project added successfully"});
        } catch (err) {
          toast.update(tid, {type: "error", render: "Error adding Project"});
          return;
        }
    }

  const uploadFile = async() => {
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
      setProject((prevProjectData) => ({
        ...prevProjectData,
        thumbnail: url
      }));
    } catch(e){
      toast.update(tid, { type: "error", render: "Failed to upload file" });
      console.log(e);
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target; // Get the field id and value from the event
    setProject((prevProjectData) => ({
        ...prevProjectData,   // Spread the previous state to preserve other fields
        [id]: value     // Update the value for the specific field id
    }));
};

  return (
    <Layout title="Add Projects | Avidia">
      {/* End Side Vav */}
      <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h2 className="title">Create Avidia Project</h2>
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
                <h3 className="title">Add Project</h3>
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
                      id="project_slug"
                      type="text"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Project Slug *</label>
                    <span className="focus-border" />
                    <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     get_project_by_slug()
                   }}>Get latest<i class="feather-arrow-right"></i></a>
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      id="courseID"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Course ID *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      id="title"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Title *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      id="description"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Description *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="con_name"
                      type="text"
                      id="template_url"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Template URL *</label>
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
                    <label className="img-label">Thumbnail *</label>
                    <span className="focus-border" />
                    <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     uploadFile();
                   }}>Upload<i class="feather-arrow-right"></i></a>
                  </div>
                  <div className="form-submit-group mb--20">
                    <button
                      type="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                      onClick={handleSubmit}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Add Project</span>
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