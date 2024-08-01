const AWS = require('aws-sdk');
const ecs = new AWS.ECS({ region: 'ap-south-2' });
const ec2 = new AWS.EC2({ region: 'ap-south-2' });

const getTaskIp = async (taskArn) => {
    
  try {
    const response = await ecs.describeTasks({ cluster: 'Respawn', tasks: [taskArn] }).promise();
    const task = response.tasks[0];

    if (task.lastStatus === 'RUNNING') {
        const details = task.attachments[0].details;
        for (const detail of details) {
            if (detail.name === 'networkInterfaceId') {
                const networkInterfaceId = detail.value;
                const networkInterface = await ec2.describeNetworkInterfaces({ NetworkInterfaceIds: [networkInterfaceId] }).promise();
                const publicIp = networkInterface.NetworkInterfaces[0].Association.PublicIp;
                //console.log(publicIp)
                return publicIp;
            }
        }
    } else {
      console.log(`Task ${taskArn} is not in the RUNNING state.`);
    }
  } catch (error) {
    console.error('Error retrieving the task details:', error.message);
    throw error;
  }
}

module.exports = getTaskIp;
/*Usage
const arn = "arn:aws:ecs:ap-south-2:641688873870:task/Respawn/fd34597aa588440fa66c2c42b214d6a0"
getTaskIp(arn)
*/