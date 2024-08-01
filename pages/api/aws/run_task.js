import verifyToken from '../../../lib/jwt_verify';
import lab_access from '../../../lib/check_access/lab_access';
import register_task from '../../../lib/firestore/register_user_task';
import getTaskIp from '../../../lib/aws/get_task_ip';
import get_access from '../../../lib/firestore/access/get_access';
import scheduleTaskKill from '../../../lib/cron-server/stop-task';
import axios from 'axios';

const AWS_DEPLOY_API = process.env.AWS_DEPLOY_API;
const AWS_DEPLOY_API_KEY = process.env.AWS_DEPLOY_API_KEY;

export default async function run_task(req, res){
  if(req.method === 'POST'){
    const token = req.body.token;
    const access_token = req.body.access;
    const lab = 'vs_code';//req.body.lab;
    const jwt_data = verifyToken(token);
    
    const data = await get_access(access_token);
    if(data === null) res.status(401).json({ error: 'Access Denied, Invalid JWT tokens' });
    
    if(jwt_data && data){
        //console.log(data);
        const access = await lab_access(jwt_data.userId, lab);
        //console.log(access);
        if (access.access !== false && !(data.labs.length === 0)) {
            //We have the lab access
            if(access.running === false){
                //If no lab is already running
                const response = await axios.post(AWS_DEPLOY_API, {
                    "task_definition": "arn:aws:ecs:ap-south-2:641688873870:task-definition/vscode:18"
                }, {
                    headers: {
                        'x-api-key' : AWS_DEPLOY_API_KEY,
                        'Content-Type': 'application/json' // Set the appropriate content type for form data
                    },
                });
                if (response){
                    console.log(`Spawned a container ${response.data}`);
                    const r = await register_task(jwt_data.userId, lab, response.data);
                    //const resp = await scheduleTaskKill(response.data, token);
                    /*const resp = await axios.post('http://db-mumbai-1.noobsverse.com:6969/stop-task', {"token" : token, "taskArn" : response.data}, {
                      headers: {
                        'Content-Type': 'application/json', // Set the appropriate content type for form data
                      },
                  });//.then(function (res){console.log(res);});*/
                    //console.log(r)
                    if(r === true) res.status(200).json( {success: true, taskArn : response.data, newtask: true} );
                    else res.status(500).json( {success: false, error: r} );
                }
                else {
                    res.status(500).json( {success: false} );
                }
            }
            
            else{
                //There is already a running lab available
                const ip = getTaskIp(access.running);
                res.status(200).json( {success : true, ip : ip, taskArn: access.running} )
            }
        }
        //res.status(200).json( {access: true} );
        else res.status(200).json( {success: false} );
    }
    else{
        res.status(500).json( {error: "Invalid token!"} );
    }
  }
  else res.status(500).json( {error: "Invalid method" });
}