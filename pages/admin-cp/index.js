import get_jwt from "../../lib/frontend_functions/get_jwt";
import verify_session from "../../lib/verify_session";
import get_user_data from "../../lib/get_user_data";
import { useState, useEffect } from "react";
import Navbar from "../../components/admin-cp/navbar";

export default function AdminHome() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState("0");

  useEffect(() => {
    const jwt = get_jwt();
    if (jwt) {
      verify_session(jwt)
        .then((result) => {
          if (result === 1) {
            // Session is valid, continue with your main code logic here
            //console.log("Session is valid!");
            get_user_data(jwt)
              .then((udata) => {
                if (udata !== null) {
                  setUserData(udata);
                  setAdmin(udata.admin);
                }
              })
              .catch((error) => {
                console.log(error);
                window.location.href = "/login";
                document.cookie =
                  "app_token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              });
          } else {
            // Session is invalid, the user has been redirected to the login page
            console.log("Session is invalid. User redirected to login page.");
            window.location.href = "/login";
            document.cookie =
              "app_token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during token verification or axios request
          console.error("Error while verifying session:", error);
          window.location.href = "/login";
          document.cookie =
            "app_token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        });
    } else {
      // If the ACCESS_TOKEN cookie is not available, the user is not authenticated
      window.location.href = "/login";
    }
  }, []);

  const CardList = [
    {
      title: "Add course content",
      content: " Add episodes, lessons, etc to a course",
      link: "/admin-cp/add_content",
    },
    {
      title: "Add a course",
      content: " Add or edit a course",
      link: "/admin-cp/add_course",
    },
    {
      title: "Create Live Sessions",
      content: "Create a live session",
      link: "/admin-cp/create_live_session",
    },
    {
      title: "View student details",
      content: "Student data",
      link: "/admin-cp/view_student",
    },
    {
      title: "View analytics",
      content: "Student data",
      link: "/admin-cp/add_content",
    },
    {
      title: "Quiz Contest",
      content: "Create a quiz contest",
      link: "/admin-cp/add_quiz",
    },
    {
      title: "Quiz Questions",
      content: "Create quiz questions",
      link: "/admin-cp/add_question",
    },
    {
      title: "Handouts",
      content: "Create handouts",
      link: "/admin-cp/add_handouts",
    },
    {
      title: "Avidia Projects",
      content: "Create Avidia Projects",
      link: "/admin-cp/add_projects",
    },
    {
      title: "Sales",
      content: "Analyze sales data",
      link: "/admin-cp/sales",
    }
  ];

  return (
    <>
      {admin === "1" ? (
        <>
          <Navbar />
          <div className="col-md-10 mx-3 my-3">
            <div className="row ">
              {CardList.map((item) => (
                <div class="mycard">
                  <div className="TopSection">
                    <h2>{item.title}</h2>
                    <div className="ContentBoxAdmin">
                      <p>{item.content}</p>
                    </div>
                  </div>
                  <button>
                    <a href={item.link}>Go to Portal</a>
                  </button>
                </div>
              ))}
              <style>
                {`
                  .row{
                    min-width:100vw;
                    min-height:70vh;
                    display:flex;
                    align-items:center;
                    justify-content:space-evenly;
                    
                  }
                  .TopSection{
                    z-index:999;
                    position:relative;
                  }
  .mycard {
    box-sizing: border-box;
    width: 250px;
    height: 350px;
    background:  rgba(82, 82, 96, 0.4);
    position: relative;
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    overflow: hidden;
    border-radius: 20px;
    padding:1rem;
    margin:3rem;
    font-family: Poppins, sans-serif;
  }
  .ContentBoxAdmin{
    max-width:100%;
    position:relative;
    min-height:5em;
    z-index:999;
    overflow:hidden auto;
    padding:0 1rem;
  }
  .ContentBoxAdmin > p{
    font-size:1.7rem;
    color:#fff;
    word-wrap: break-word;
    line-height:2.5rem;
    
  }
  
  .mycard h2 {
    z-index: 1;
    color: white;
    font-size: 1.5em;
    // color: linear-gradient(90deg,#eb5c1a,#ed9e0c);
    text-transform:capitalize;
    // color:#2a2f3f; 
    background: linear-gradient(90deg, #eb5c1a, #ed9e0c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity:0.85;
    margin-top:1rem;
    font-weight:600;
    padding:0 1rem;
  }
  
  .mycard::before {
    content: '';
    position: absolute;
    width: 100px;
    // background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    background: linear-gradient(90deg,#eb5c1a,#ed9e0c);
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }
  
  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(360deg);
    }
  }
  
  .mycard::after {
    content: '';
    position: absolute;
    background: rgba(82, 82, 96, 1);
    inset: 3px;
    border-radius: 20px;
  } 
  button {
    --color: #eb5c1a;
    opacity:0.85;
    font-family: inherit;
    display: inline-block;
    width: 8em; 
    height: 2.7em;
    line-height: 2em;
    margin: 20px 10px;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color 0.5s, background-color 0.5s;
    z-index: 1;
    font-size: 14px; 
    border-radius: 6px;
    font-weight: 500;
    color: #000d1;
  }
  
  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }
  
  button:hover > a{
    color: #fff;
    /* Change the background color on hover */
  }
  
  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }
  
  button:hover:before {
    top: -30px;
    left: -30px;
  }
  
  button:active:before {
    background: #eb5c1a;
    transition: background 0s;
  }
  body{
    overflow-x:hidden
  }
  
  `}
              </style>
            </div>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}
