const verifyToken = require('../jwt_verify');
const AWS = require('aws-sdk');
import deregister_task from '../firestore/deregister_user_task';

const ecs = new AWS.ECS({ 
    region: 'ap-south-2', 
    accessKeyId: '', 
    secretAccessKey: '' 
});

const stopAndDeleteEcsTask = async (taskArn, token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    
    try {
        const decodedData = verifyToken(token);

        if(decodedData){
            await ecs.stopTask({ task: taskArn, cluster: 'Respawn' }).promise();
            await deregister_task(decodedData.userId, 'vs_code', taskArn);
            
            console.log('Task stopped and deleted successfully.');
            return { success: true };
        } else {
            throw new Error('Failed to decode data');
        }
    } catch (error) {
        if (error.message === 'invalid_token') {
            throw new Error('Invalid JWT token');
        } else {
            throw error;
        }
    }
}

export default stopAndDeleteEcsTask;
