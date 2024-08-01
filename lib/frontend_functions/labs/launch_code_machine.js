import get_jwt from '@/lib/frontend_functions/get_jwt';
import toast from 'react-hot-toast';

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

const launchFlask = async (userData) => {
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

const requestNewFlask = async (userData) => {
try {
  const flaskDetails = await axios.post('/api/labs/get_flask_details', { id: 'react-flask' }, {
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

const checkForExistingFlask = async (userData) => {
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
    } catch (error) {
      toast.error('Error checking existing flask: ' + error.message);
    }
  };

const launch = async(userData) => {

}