const express = require('express');  
const axios = require('axios');                        
const cron = require('node-cron');                     
const app = express();                                 
const port = 6969;                                     
app.use(express.json());                                
app.post('/stop-task', (req, res) => {                  
  const { taskArn, token } = req.body;                  
  console.log(req.body);                               
  if(!taskArn || !token) return res.status(400).json({error: "Provide all details"});
  // Get the current date and time
  let date = new Date();   
  // Add one hour         
  date.setHours(date.getHours() + 1);    
  // Extract the hour, minute, and second for the cron schedule    
  const hour = date.getUTCHours();                      
  const minute = date.getUTCMinutes();               
  const second = date.getUTCSeconds();             
  console.log(`Scheduling task kill for ${taskArn}`);  
  // Schedule the cron job for the calculated time     
  let task = cron.schedule(`${second} ${minute} ${hour} * * *`, async () => {     
    try{                                                                           
      await axios.post('https://cohort.avidia.in/api/aws/stop_task', {taskArn, token}, {     
        headers : {                                                                          
          'Content-Type': 'application/json',                                    
          },                                                               
        });                                                           
      console.log(`${taskArn} has been killed!`);
      task.destroy();
      } catch(error){ console.log(`Error destroying task: ${taskArn}`); console.log(error); }
      // Destroy the task after execution
      //task.destroy();
      }, {
        scheduled: false, // This ensures that the task doesn't start automatically
        timezone: "Etc/UTC"
        });
        // Start the scheduled task
        task.start();
        res.json({ status: 'The container will be killed in one hour.' });
      });
      app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening at http://0.0.0.0:${port}`);
      }); 
      
/*
const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const port = 6996;

app.use(express.json());

app.post('/schedule-stop', (req, res) => {
  const { taskArn, token } = req.body;
  
  if (!taskArn) {
    return res.status(400).json({ error: 'taskArn is required' });
  }

  // Schedule the task to run after an hour
  cron.schedule('* 1 * * *', async () => {
    try {
      await axios.post('https://cohort.avidia.in/api/aws/stop_task',{taskArn, token},{
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type for form data
        },
      });
      console.log('Task stopped successfully!');
    } catch (error) {
      console.error('Error stopping the task:', error);
    }
  }, {
    scheduled: true,
    timezone: "Etc/UTC"
  });

  res.json({ status: 'Cron job scheduled' });
});

app.listen(port, () => {
  console.log(`Cron server listening at http://localhost:${port}`);
});


*/