import axios from 'axios';
import cron from 'node-cron';

const scheduleTaskKill = async (taskArn, token) => {
  if (!taskArn || !token) {
    throw new Error("Provide all details");
  }

  let date = new Date();
   date.setHours(date.getHours() + 1);
  //date.setMinutes(date.getMinutes() + 2);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  console.log(`Scheduling task kill for ${taskArn}`);

  let task = cron.schedule(`${second} ${minute} ${hour} * * *`, async () => {
    try {
      await axios.post('https://cohort.avidia.in/api/aws/stop_task', { taskArn, token }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`${taskArn} has been killed!`);
      // task.destroy();
    } catch (error) {
      console.log(`Error destroying task: ${taskArn}`);
      console.log(error);
    }
  }, {
    scheduled: false,
    timezone: "Etc/UTC"
  });

  task.start();
  return 'The container will be killed in one hour.';
}

export default scheduleTaskKill;
