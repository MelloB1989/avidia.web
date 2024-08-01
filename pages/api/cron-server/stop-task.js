// pages/api/stop-task.js

//import axios from 'axios';
import cron from 'node-cron';
import stop from '../../../lib/aws/stop-task';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method not allowed if it's not POST.
  }

  const { taskArn, token } = req.body;

  if (!taskArn || !token) {
    return res.status(400).json({ error: "Provide all details" });
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
     /* await axios.post('https://cohort.avidia.in/api/aws/stop_task', { taskArn, token }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });*/
      await stop(taskArn, token)
      console.log(`${taskArn} has been killed!`);
      //task.destroy();
    } catch (error) {
      console.log(`Error destroying task: ${taskArn}`);
      console.log(error);
    }
  }, {
    scheduled: false,
    timezone: "Etc/UTC"
  });

  task.start();
  res.json({ status: 'The container will be killed in one hour.' });
}
