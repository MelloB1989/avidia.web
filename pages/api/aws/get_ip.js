const AWS = require('aws-sdk');
const verifyToken = require('../../../lib/jwt_verify');
const ecs = new AWS.ECS({ region: 'ap-south-2', accessKeyId: '', secretAccessKey: '' });
const ec2 = new AWS.EC2({ region: 'ap-south-2', accessKeyId: '', secretAccessKey: '' });

export default async function getTaskPublicIp(req, res) {
  const taskArn = req.body.arn;
  const token = req.body.token;
    
    if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
        //Verify the JWT token and get the decoded data from the token
        const decodedData = verifyToken(token);
        //console.log('Decoded Data:', decodedData);
        if(decodedData){
  try {
    const response = await ecs.describeTasks({ cluster: 'Respawn', tasks: [taskArn] }).promise();
    const task = response.tasks[0];
    //console.log(task)

    if (task.lastStatus === 'RUNNING') {
        const details = task.attachments[0].details;
        for (const detail of details) {
            if (detail.name === 'networkInterfaceId') {
                const networkInterfaceId = detail.value;
                const networkInterface = await ec2.describeNetworkInterfaces({ NetworkInterfaceIds: [networkInterfaceId] }).promise();
                const publicIp = networkInterface.NetworkInterfaces[0].Association.PublicIp;
                res.status(200).json({ ip: publicIp, deployment_state: "deployed" })
            }
        }
    } else {
      //throw new Error(`Task ${taskArn} is not in the RUNNING state.`);
      res.status(200).json({ip: "", deployment_state: "deploying"});
    }
  }
  catch (error) {
    console.error('Error retrieving the task details:', error.message);
    throw error;
  }
  
        }
  }
  //Catch INVALID TOKEN ERROR
catch (error) {
  if (error.message === 'invalid_token') {
    //console.error('Invalid Token');
    res.status(401).json({ error: 'Invalid JWT token' });
  } else {
    //console.error('Error:', error.message);
    res.status(401).json({ error: error.message });
  }
}
}
