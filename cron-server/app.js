const cron = require('node-cron');
const redis = require('redis');
const axios = require('axios');
const read_url = "redis://avidiaprod-ro.yk6ins.ng.0001.aps2.cache.amazonaws.com:6379";
//const write_url = "redis://avidiaprod.yk6ins.ng.0001.aps2.cache.amazonaws.com:6379";
const redisClient = redis.createClient({
    url: read_url, // Redis endpoint
});
redisClient.connect();

const STOP_API_URL = 'https://cohort.avidia.in/api/aws/stop_task'; // Kill Docker API

// Function to check for nearly expired heartbeats
async function checkForNearlyExpiredHeartbeats() {
    try {
        const allHeartbeatKeys = await redisClient.keys('heartbeat:*');
        const currentTimestamp = Date.now();

        for (const key of allHeartbeatKeys) {
            const heartbeatData = await redisClient.hGetAll(key);
            const lastUpdated = parseInt(heartbeatData.lastUpdated, 10);
            const ttl = await redisClient.ttl(key);

            // Check if the key is about to expire in the next minute (or your preferred threshold)
            if (currentTimestamp - lastUpdated >= (ttl - 90) * 1000) {
                // Send POST request to stop API with necessary data
                await axios.post(STOP_API_URL, {
                    token: heartbeatData.token,
                    taskArn: heartbeatData.awsArn
                });
            }
        }
    } catch (error) {
        console.error('Error checking for nearly expired heartbeats:', error);
    }
}

// Schedule the cron job to run every minute (or your preferred frequency)
cron.schedule('* * * * *', () => {
    console.log('Running a task every minute');
    checkForNearlyExpiredHeartbeats();
});
