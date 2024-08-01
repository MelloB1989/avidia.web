import Layout from '../../components/admin-cp/layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from "@apollo/client";
import querygen from "@querygen";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import get_jwt from '@/lib/frontend_functions/get_jwt';

export default function LiveSession(){
    const [sdata, setSession] = useState({
        title: "",
        start: "",
        end: "",
        instructor: "",
        courseId: "",
        thumbnail: "",
        slug: "",
        recorded: "",
        id: "",
        room: ""
    });
    const [mode, setMode] = useState("create");
    const [file, setFile] = useState();
    const [updateLiveSession, { data, loading, error }] = useMutation(querygen("updateSession"));
    const [createLiveSession, { data: cd, loading: cl, error: ce }] = useMutation(querygen("createSession"));
    
    const get_live_session = async() => {
      const r = await axios.post("https://ai-lisa.coffeecodes.in/v1/liveSessions/getBySlug", {
        slug: sdata.slug
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+get_jwt()
        }
      });
      if(r.data.data) {
        setSession({
          title: r.data.data.title,
          start: r.data.data.timestamp,
          end: r.data.data.endTimestamp,
          instructor: r.data.data.instructor,
          courseId: r.data.data.courseId,
          thumbnail: r.data.data.thumbnail,
          slug: r.data.data.slug,
          recorded: r.data.data.recordedURL,
          id: r.data.data.id,
          room: r.data.data.joinRoomID
        });
        setMode("update");
      }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target; // Get the field id and value from the event
        setSession((prevSdata) => ({
            ...prevSdata,   // Spread the previous state to preserve other fields
            [id]: value     // Update the value for the specific field id
        }));
    };

    useEffect(()=> {
      console.log(sdata);
    }, [sdata]);

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
        setSession((prevSdata) => ({
          ...prevSdata,
          thumbnail: url
        }));
      } catch(e){
        toast.update(tid, { type: "error", render: "Failed to upload file" });
        console.log(e);
      }
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const jwt = document.cookie.replace(
              /(?:(?:^|.*;\s*)admin\s*=\s*([^;]*).*$)|^.*$/,
              '$1'
            );
            if(!jwt) document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            
            if(mode === "create") {
              await createLiveSession({
                variables: {
                  input: {
                    title: sdata.title,
                    timestamp: sdata.start,
                    thumbnail: sdata.thumbnail,
                    slug: sdata.slug,
                    recordedURL: sdata.recorded,
                    joinRoomID: sdata.room,
                    instructor: sdata.instructor,
                    id: uuidv4(),
                    endTimestamp: sdata.end,
                    courseId: sdata.courseId
                  }
                }
              });
            } else {
              await updateLiveSession({
                variables: {
                  input: {
                    title: sdata.title,
                    timestamp: sdata.start,
                    thumbnail: sdata.thumbnail,
                    slug: sdata.slug,
                    recordedURL: sdata.recorded,
                    joinRoomID: sdata.room,
                    instructor: sdata.instructor,
                    id: sdata.id,
                    endTimestamp: sdata.end,
                    courseId: sdata.courseId
                  }
                }
              });
            }
            
            toast.success("Session Created!");
        }
        catch(e){
            toast.error("Failed to create a session!");
            console.log(e);
        }
    }
    return(
      <Layout title="Add quiz contest | Avidia">
      {/* End Side Vav */}
      <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h2 className="title">Create Live Session</h2>
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
                <h3 className="title">Add Session</h3>
                <span className="rbt-badge-6 bg-secondary-opacity">{sdata.slug}</span>
                <form
                  className="max-width-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="form-group">
                    <input
                      name="slug"
                      id="slug"
                      type="text"
                      value={sdata.slug}
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Slug *</label>
                    <span className="focus-border" />
                    <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     get_live_session();
                     setMode("update");
                   }}>Get Live Session<i class="feather-arrow-right"></i></a>
                  </div>
                  <div className="form-group">
                    <input
                      name="courseId"
                      id="courseId"
                      type="text"
                      value={sdata.courseId}
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Course ID *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      name="instructor"
                      id="instructor"
                      type="text"
                      value={sdata.instructor}
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Instructor *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      id="title"
                      type="text"
                      value={sdata.title}
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
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                      }}
                    />
                    <label className="img-label">Thumbnail *</label>
                    <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     uploadFile();
                   }}>Upload<i class="feather-arrow-right"></i></a>
                  </div>
                  <div className="form-group">
                    <input
                      id="start"
                      className="date-input"
                      value={sdata.start}
                      type="datetime-local"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Starting Date *</label>
                  </div>
                  <div className="form-group">
                    <input
                      id="end"
                      className="date-input"
                      value={sdata.end}
                      type="datetime-local"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Ending date *</label>
                  </div>
                  <div className="form-group">
                    <input
                      id="room"
                      type="text"
                      value={sdata.room}
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>RoomID *</label>
                    <span className="focus-border" />
                  </div>
                  <div className="form-group">
                    <input
                      id="recorded"
                      value={sdata.recorded}
                      type="text"
                      onChange={(event) => {
                        handleInputChange(event)
                      }}
                    />
                    <label>Recorded URL *</label>
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
        )
}