const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//const read_url = "redis://avidiaprod-ro.yk6ins.ng.0001.aps2.cache.amazonaws.com:6379";
const write_url = "redis://avidiaprod.yk6ins.ng.0001.aps2.cache.amazonaws.com:6379";

const USER_JWT_SECRET = 'MelloB1989@69AVIDIAPLATFORM^*(%JDFS';
const JWT_SECRET = 'MelloB@REDISPROD_NOOBSVERSE_HYD_CLUSTER!!1$%W';
const API_KEY = 'mellob_DFsgAfjkrtFGDsgszdgSEDHFGEDvWSgerhrfhfgdafs';

// Configure Redis client
const redisClient = redis.createClient({
    url: write_url, // Redis endpoint
});
redisClient.connect();

// Middleware for API key verification
const verifyApiKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey !== API_KEY) {
        return res.status(401).send('Unauthorized: Invalid API key');
    }
    next();
};

// Middleware for JWT verification
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer Token
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

// Middleware for User JWT verification
const verifyUserToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer Token
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, USER_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

// Write to Redis
app.post('/write', verifyApiKey, verifyToken, async (req, res) => {
    const { key, value } = req.body;
    try {
        await redisClient.set(key, value);
        res.status(200).send({ message: 'Data saved to Redis', key, value });
    } catch (err) {
        res.status(500).send('Error writing to Redis');
    }
});

// Read from Redis
app.get('/read/:key', verifyApiKey, verifyToken, async (req, res) => {
    try {
        const value = await redisClient.get(req.params.key);
        if (value === null) {
            return res.status(404).send('Data not found');
        }
        res.status(200).send({ key: req.params.key, value });
    } catch (err) {
        res.status(500).send('Error reading from Redis');
    }
});

// Get all heartbeats from Redis
app.get('/read_all_heartbeats', verifyApiKey, verifyToken, async (req, res) => {
    try {
        const allHeartbeatKeys = await redisClient.keys('heartbeat:*');
        let allHeartbeats = [];

        for (const key of allHeartbeatKeys) {
            const heartbeatData = await redisClient.hGetAll(key);
            allHeartbeats.push({ key, ...heartbeatData });
        }
        
        res.status(200).send({ heartbeats: allHeartbeats });
    } catch (err) {
        res.status(500).send('Error reading from Redis');
    }
});

// Admin Redis User
const user = { id: 1, username: 'mellob_redis', password: 'MEllobRediSNoobsversE_#$sr42tH5QEtg56#W4t', role: 'admin' };

app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    // Validate the username and password here
    if (username === user.username && password == user.password) {
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).send({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Heartbeat endpoint
app.post('/heartbeat', verifyUserToken, async (req, res) => {
    const { userId, arn, token } = req.body; // Assuming the JWT contains the user ID

    try {
        // Update heartbeat and set a TTL
        await redisClient.hSet(`heartbeat:${userId}`, {
            'status': 'active',
            'token': token,
            'awsArn': arn
        });
        await redisClient.expire(`heartbeat:${userId}`, 500); // 5-minute TTL
        //await redisClient.set(`heartbeat:${userId}`, arn, 'EX', 300); // 5-minute TTL
        // Update state key to 'active'
        await redisClient.set(`state:${userId}`, 'active');

        res.status(200).send({ message: 'Heartbeat updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating heartbeat');
    }
});

// Start server
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwNjcyODcxLCJleHAiOjE3MDA2NzY0NzF9.I1qGVrQ9D19zKmEhx76csI2OMq83BHSsw-Z-SHkJVBo

curl -X POST https://redis-hyd-cluster.noobsverse.com/write \
-H "Content-Type: application/json" \
-H "x-api-key: mellob_DFsgAfjkrtFGDsgszdgSEDHFGEDvWSgerhrfhfgdafs" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwNjcyODcxLCJleHAiOjE3MDA2NzY0NzF9.I1qGVrQ9D19zKmEhx76csI2OMq83BHSsw-Z-SHkJVBo" \
-d '{"key":"testKey", "value":"testValue"}'

curl -X GET https://redis-hyd-cluster.noobsverse.com/read/testKey \
-H "x-api-key: mellob_DFsgAfjkrtFGDsgszdgSEDHFGEDvWSgerhrfhfgdafs" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwNjcyODcxLCJleHAiOjE3MDA2NzY0NzF9.I1qGVrQ9D19zKmEhx76csI2OMq83BHSsw-Z-SHkJVBo"

curl -X POST -H 'Content-Type: application/json' -d '{"username":"mellob_redis","password":"MEllobRediSNoobsversE_#$sr42tH5QEtg56#W4t"}' https://redis-hyd-cluster.noobsverse.com/auth 

HEARTBEATS:

SET:
curl -X POST https://redis-hyd-cluster.noobsverse.com/heartbeat \
-H "Content-Type: application/json" \
-H "x-api-key: mellob_DFsgAfjkrtFGDsgszdgSEDHFGEDvWSgerhrfhfgdafs" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiYWNjZXNzX3Rva2VuIjoiOTM0MjNiZmQ1MTQ0N2Y1NWI3MDA2YTMwZmJmMmY2NTBiOWQ2OGFiOTExMDIxNjhjZTc3ZWY5ZDBkZWM5MWUzY2EyNDk2MmI2Mzc3MTU4Nzg4MmRiY2U3YjRmZjlmMDkzYWE3ZmY5YzQzYWU3MGQ4YSIsImlhdCI6MTcwMDY2ODgyNywiZXhwIjoxNzAwNzU1MjI3fQ.rINaVdQL7nk1GNoAneJ128rLY2oAFeQJeYbHR90KW0c" \
-d '{"userId":"1", "arn":"wert4^^@$R#4@#R$E;va", "token": "asdfqr452"}'

GET:
curl -X GET https://redis-hyd-cluster.noobsverse.com/read_all_heartbeats \
-H "x-api-key: mellob_DFsgAfjkrtFGDsgszdgSEDHFGEDvWSgerhrfhfgdafs" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwNjc4MTUwLCJleHAiOjE3MDA2ODE3NTB9.yFkGJJcn5So5zYDHeNCNhUWT2AKpL7oO53YGYbdUgYA"

*/