import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import get_jwt from "@/lib/frontend_functions/get_jwt";
import decode_jwt from "@/lib/frontend_functions/decode_jwt";
import {UserContext} from '@/components/lms_components/layout/UserContext';
import Coder from '@/components/coder';
import Layout from '@/components/lms_components/layout/protected-void'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Flex, Button } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import {ChatIcon, CloseIcon} from '@chakra-ui/icons';
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { HiEye } from "react-icons/hi2";
import { Tooltip } from '@chakra-ui/react'
import { HiEyeSlash } from "react-icons/hi2";
import { FaGitlab } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { RiShutDownLine } from "react-icons/ri";
import { ChakraProvider } from '@chakra-ui/react';
import config from "@/unprotected_config";
import Lisa from '@/components/modes/lisa_mode/index';

// import gfm from 'remark-gfm';
// import remarkImages from 'remark-images';
// import rehypeRaw from 'rehype-raw';
// import rehypeSanitize from 'rehype-sanitize';

export default function ProjectPlayground(){
    const { userData } = useContext(UserContext);
    const [mode, setMode] = useState("code");
    const [allow, setAllow] = useState(false);
    const [subdomain, setDomain] = useState('');
    const [flaskLaunched, setFlaskLaunch] = useState(false);
    const [loader, setLoader] = useState('Provisioning...');
    const [lsidebar, setLsidebar] = useState(true);
    const router = useRouter();
    const [modal, setModal] = useState("");
    const [app, setApp] = useState();
    const [m, setM] = useState(`# Avidia Project Playground`);
    const [projects, setprojects] = useState({});
    const [userProjects, setUserProjects] = useState({});
    const { courseID, projectSlug } = router.query;
    const { loading, error, data } = useQuery(querygen("getCourseProjectsBySlug", projectSlug ? projectSlug : ""));
    const { loading: upl, error: upe, data: upd } = useQuery(querygen("getUserProjects", {nbspID: (decode_jwt(get_jwt())).userId, slug: projectSlug ? projectSlug : ""}));


    const Popup = () => {
      return(
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
    height: auto; /* Adjust this value to change the height */
    margin: auto 0; /* This will add equal padding to the top and bottom */
  }
`}
</style>
        <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
    <div className="content">
      <div className="section-title">
        <h4 className="rbt-title-style-3">CodeSarathi AI Feedback</h4>
      </div>
      <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
        <p>{modal}</p>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
</>
      )
    }

    const get_user_projects = async() => {
      const response = await axios.get(`${config.AVIDIA_AI_API}/v1/projects/getUserProjects/${projectSlug}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${get_jwt()}`
        }
      });
      setUserProjects(response.data.data);
    }

    const get_instructions = async(commit) => {
      const response = await axios.get(`https://noobsverse-internal.s3.amazonaws.com/karma-files/avidia/${commit}.md`);
      setM(response.data.replace(/^```markdown\n|```$/g, ''));
    }

    useEffect(() => {
      const s = async () => {
        if (!loading && data) {
          setprojects(data.getAvidiaProjectDetails);
        }
        if (!upl && upd) {
          setUserProjects(upd.getAvidiaProjects);
        }
      };
      s();
    }, [loading, upl, data, upd]);

    useEffect(()=>{
      if(!userProjects) window.location.href = `/projects/setup/${courseID}/${projectSlug}`;
      else{
        setUserProjects((prev) => {
          const newPoints = [];
          const newFeedbacks = [];
          prev.points?.forEach((point, index) => {
            if (parseInt(point) >= 60) {
              newPoints.push(point);
              newFeedbacks.push(prev.verified_feedback[index]);
            }
          });
          return {
            ...prev,
            points: newPoints,
            verified_feedback: newFeedbacks
          };
        });
      }
    }, [userProjects])

    const getJwt = () => document.cookie.replace(/(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  const verifyUser = async (token) => {
    try {
      const response = await axios.post('/api/verify_user', { token }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200 && response.data.success) {
        setAllow(true);
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      redirectToLogin();
    }
  };

  const redirectToLogin = () => {
    console.log('Redirecting to login page...');
    //window.location.href = '/login';
    //document.cookie = 'app_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

async function checkStatus(f){
      const fid = f;
    return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post('/api/labs/get_flask',{
                userid: userData?.username,
                token: get_jwt(),
                fid: fid
            },{
                headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
            });
            const b = response.data.data.length - 1;
            //console.log(build);
            // if (response.data.data[b].resources[1]?.agents[0]?.apps?.length > 1) {
            //   setApp(response.data.data[b].resources[1].agents[0].apps[1].subdomain_name);
            // }
            const build = 0;
        if (response.data && response.data?.data[build].status === 'running' && response.data?.data[build].resources.length > 0) {
          setLoader("setting up...");
          clearInterval(interval); // Stop the interval when task is deployed
          const apps = response.data.data[build].resources.map((resource)=>{
                    if(resource.agents) return resource.agents[0].apps;
                }).filter(app => app !== undefined);
           apps[0].map((app)=>{
                if(app.slug === "code-server"){
                  toast.success('Connecting...');
                  setTimeout(() => {
                        setDomain(app.subdomain_name);
                        setLoader("false");
                  }, 6000);
                    }
            });
          resolve(response.data); // Resolve the promise with the IP address
        } else if (response.data && response.data?.data[build].status === 'starting' || response.data?.data[build].resources.length > 0) {
          // Continue polling if state is 'deploying'
          setLoader("waking up...");
        } else {
          clearInterval(interval);
          reject(new Error('Unexpected deployment state or response format.'));
        }
      } catch (error) {
        clearInterval(interval); // Stop the interval on any error
        reject(error); // Reject the promise with the error
      }
    }, 5000); // Poll every 5 seconds
  });
  }

const launchFlask = async () => {
  setLoader("Starting...");
  try {
    const response = await axios.post('/api/labs/get_my_flasks', {
      userid: userData?.username,
      token: get_jwt()
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.data.data.count > 0) {
      const workspaces = response.data.data.workspaces;
      const targetWorkspace = workspaces.find(workspace => workspace.name === `${userData.username}VSLab`);

      if (!targetWorkspace) {
        requestNewFlask();
      } else {
        handleExistingWorkspace(targetWorkspace);
      }
    } else {
      requestNewFlask();
    }
  } catch (error) {
    toast.error('Error fetching flasks: ' + error.message);
  }
};

const requestNewFlask = async () => {
  try {
    const flaskDetails = await axios.post('/api/labs/get_flask_details', { id: 'aws-linux' }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const flaskTemplateId = flaskDetails.data.data.active_version_id;

    const requestResponse = await axios.post('/api/labs/request_flask', {
      token: get_jwt(),
      email: userData.email,
      flask_template_id: flaskTemplateId,
      flask_given_name: `${userData.username}VSLab`,
      plan: "basic",
      hours: 1,
      username: userData.username,
      nbspid: userData.user_id
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    toast.success('Lab launched! Waiting to start');
    checkStatus(requestResponse.data.data).then(() => {
      toast.success('Flask launched!');
    }).catch(error => {
      toast.error('Unexpected error: ' + error.message);
    });
  } catch (error) {
    toast.error('Error requesting new flask: ' + error.message);
  }
};

const handleExistingWorkspace = async (workspace) => {
  const fid = workspace.id;
  console.log(workspace)
  const latestWorkspace = workspace; // Assuming latest workspace is already fetched
  const latestStatus = latestWorkspace ? latestWorkspace.status : 'No workspaces found';

  if (latestStatus === "stopped" || latestWorkspace.latest_build.status === "stopped") {
    try {
      await axios.post('/api/labs/start_flask', {
        tid: latestWorkspace.template_version_id || latestWorkspace.template_active_version_id,
        fid: latestWorkspace.workspace_id || latestWorkspace.id,
        token: get_jwt()
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      toast.success("Workspace is stopped, starting...");
      checkStatus(latestWorkspace.workspace_id || latestWorkspace.id);
    } catch (error) {
      toast.error('Failed to start the workspace: ' + error.message);
    }
  } else if (latestStatus === "starting") {
    checkStatus(fid);
  } else if (latestStatus === "running") {
    const apps = latestWorkspace.resources.flatMap(resource => 
      resource.agents ? resource.agents[0].apps : []
    );

    apps.forEach(app => {
      if (app.slug === "code-server") {
        setDomain(app.subdomain_name);
        setLoader("false");
      }
    });
  }
};

const checkForExistingFlask = async () => {
  try {
    if(userData){
      const response = await axios.post('/api/labs/get_my_flasks', {
        userid: userData.username,
        token: get_jwt()
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.data.count > 0) {
        //console.log(response.data.data.workspaces)
        const existingFlask = response.data.data.workspaces.find(workspace => workspace.name === `${userData.username}VSLab`);
        console.log(existingFlask?.latest_build.status);
        if (existingFlask && existingFlask?.latest_build.status === 'running') {
          checkStatus(existingFlask.id);
        }
        else if(existingFlask && existingFlask?.latest_build.status === 'stopped') handleExistingWorkspace(existingFlask);
        else if(existingFlask && existingFlask?.latest_build.status === 'starting') checkStatus(existingFlask.id);
        else {
          setFlaskLaunch(false);
          launchFlask();
        }
      } else {
        setFlaskLaunch(false);
        launchFlask();
      }
    } else {
      console.log("hbsd")
    }
  } catch (error) {
    toast.error('Error checking existing flask: ' + error.message);
  }
};

useEffect(() => {
  const jwtToken = getJwt();
  const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  

  if (jwtToken) {
    setAllow(true)
    if(true){
    verifyUser(jwtToken).then(() => {
      if (!flaskLaunched) {
        //checkForExistingFlask();
        setLoader("is sleeping, turn on to start coding.")
      } else{
        console.log("Flask already launched");
      }
    }).catch((e)=>{
      console.log("hgdfhgdgf",e)
    });
    } else {
      redirectToLogin();
    }
  } else {
    redirectToLogin();
  }
}, [userData, flaskLaunched]);

    return(
      <ChakraProvider>
        <Layout>
          <Flex
            as="footer"
            p="4"
            bg="orange.300"
            color="black"
            justifyContent="center"
            alignItems="center" // Added this
            position="fixed"
            bottom="5" // Changed this to 0 to center vertically
            left="0" // Added this to center horizontally
            right="0" // Added this to center horizontally
            zIndex="sticky"
            boxShadow="lg"
            borderRadius="xl"
            maxWidth="md"
            marginX="auto"
            width="full"
          >
          <Tooltip placement='top' label='Chat with Lisa'><Button mx="2" colorScheme="orange" onClick={()=>setMode("help")}><ChatIcon color="white.100"/></Button></Tooltip>
          <Tooltip placement='top' label='Code'><Button mx="2" colorScheme="orange" onClick={()=>setMode("code")}><HiOutlineCodeBracket /></Button></Tooltip>
          <Tooltip placement='top' label='Read steps'><Button mx="2" colorScheme="orange" onClick={()=>setMode("documentation")}><HiOutlineDocumentText /></Button></Tooltip>
          <Tooltip placement='top' label='Toggle Sidebar'><Button mx="2" colorScheme="orange" onClick={()=>setLsidebar(!lsidebar)}>{lsidebar ? (<HiEyeSlash/>) : (<HiEye />)}</Button></Tooltip>
          <Tooltip placement='top' label='Open GIT repository'><Button mx="2" colorScheme="orange" onClick={()=>{window.open(`https://git.noobsverse.com/${userData.username}/${projectSlug}`)}}><FaGitlab/></Button></Tooltip>
          <Tooltip placement='top' label='Open public view'><Button mx="2" colorScheme="orange" onClick={()=>{window.open(`https://react-dev--dev--${decode_jwt(get_jwt()).username}vslab--${decode_jwt(get_jwt()).username}.internal.avidia.site/`)}}><IoLinkOutline/></Button></Tooltip>
          <Tooltip placement='top' label='Turn on workspace'><Button mx="2" colorScheme="orange" onClick={()=>{
            checkForExistingFlask();
            setLoader("Starting...");
          }}><RiShutDownLine/></Button></Tooltip>
          {modal !== "" && <Tooltip placement='top' label='Close Popup'><Button mx="2" colorScheme="orange" onClick={()=>setModal("")}><CloseIcon color="white.100"/></Button></Tooltip>}
        </Flex>
        {modal !== "" && <Popup />}
  <div className="rbt-lesson-area bg-color-white">
    <div className="rbt-lesson-content-wrapper">
      {mode === "helpL" ? (
        <>
        <div className="rbt-lesson-leftsidebar">
        <div className="rbt-course-feature-inner rbt-search-activation">
        <Lisa change_mode={setMode} />
        </div>
        </div>
        </>
      ) : lsidebar && (
        <div className="rbt-lesson-leftsidebar">
        <div className="rbt-course-feature-inner rbt-search-activation">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Project Steps</h4>
          </div>
          <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
            <div className="accordion" id="accordionExampleb2">
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingTwo1">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    data-bs-target="#collapseTwo1"
                    aria-controls="collapseTwo1"
                  >
                    Welcome Avidian! Let's make something amazing ✨{" "}
                    <button className="rbt-btn btn-gradient w-100" onClick={()=>{get_user_projects()}}>
                      Update progress
                    </button>
                  </button>
                </h2>
                <div
                  id="collapseTwo1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingTwo1"
                >
                  <div className="accordion-body card-body">
                    <ul className="rbt-course-main-content liststyle">
                      {
                        projects?.steps?.length > 0 ? projects?.steps?.map((step, index) => {
                          return(
                            <li>
                        <a href="#" onClick={()=>get_instructions(projects?.commits[index])}>
                          <div className="course-content-left">
                            <i className="feather-file-text" />{" "}
                            <span className="text">
                              {step}
                              <sup>
                                {userProjects?.points?.[index] ? userProjects.points[index]+" marks" : ""}
                              </sup>
                            </span>
                          </div>
                          <div className="course-content-right">
                            
                              {userProjects?.points?.[index] /*&& parseInt(userProjects?.points?.[index]) > 60*/ ? (<a href="#" onClick={()=>{
                                //toast.success('Feedback: '+userProjects?.verified_feedback[index]);
                                setModal(userProjects?.verified_feedback[index]);
                              }}><span className="rbt-check"><i className="feather-check" /></span></a>) : (<i className="feather-x" />)}
                            
                          </div>
                        </a>
                      </li>
                          )
                        }) : (
                          <li>
                        <a href="#" onClick={()=>get_instructions("1")}>
                          <div className="course-content-left">
                            <i className="feather-file-text" />{" "}
                            <span className="text">No steps yet</span>
                          </div>
                        </a>
                      </li>
                        )
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="rbt-lesson-rightsidebar overflow-hidden" style={{height: "100vh"}}>
        <div style={{height: "100%"}}>
            {
                mode === "code" || mode === "helpL" ? (
                  <>
                  <Coder subdomain={subdomain} loader={loader} />
                  </>
                ) : mode === "help" || mode === "helpL" ? (<>
                <iframe src={`https://lisa.avidia.in/sign-in?username=${(decode_jwt(get_jwt())).userId}&password=${get_jwt()}`} style={{height: "100%", width: "100%"}}/>
                </>) : (<>
                <div className="content overflow-auto custom-scrollbar-css" style={{"overflowY": "auto", "max-height": "800px"}}>
                <ReactMarkdown>
                  {m}
                </ReactMarkdown>
                    </div>
                </>)
            }
        </div>
        </div>
    </div>
  </div>
  <div className="rbt-progress-parent">
    <svg
      className="rbt-back-circle svg-inner"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
</Layout>
</ChakraProvider>
    )
}