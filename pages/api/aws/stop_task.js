const verifyToken = require('../../../lib/jwt_verify');
const AWS = require('aws-sdk');
import deregister_task from '../../../lib/firestore/deregister_user_task';
const ecs = new AWS.ECS({ region: 'ap-south-2', accessKeyId: '', secretAccessKey: '' });

export default async function stopAndDeleteEcsTask(req, res) {
  //console.log(req.body.taskArn);
    const taskArn = req.body.taskArn;
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
    // Stop the task
    await ecs.stopTask({ task: taskArn, cluster: 'Respawn' }).promise();
    await deregister_task(decodedData.userId, 'vs_code', taskArn);

    console.log('Task stopped and deleted successfully.');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error stopping and deleting the ECS task:', error.message);
    res.status(500).json({ error: error.message });
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

/*
// Usage
const taskArn = 'arn:aws:ecs:your-region:your-account-id:task/task-id';
stopAndDeleteEcsTask(taskArn)
  .catch(err => console.error('Error:', err));
*/