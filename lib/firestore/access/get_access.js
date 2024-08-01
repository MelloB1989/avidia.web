import access_token_verify from '../../../lib/access_jwt_verify';

async function get_access(token) {
    
    if (access_token_verify(token) === null) {
        console.log("WRong!");
        return false;
    }

    // Decode the token
    //const [encodedHeader, encodedPayload] = token.split('.');
    //const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
    //const decoded = payload['access_token'];
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    //console.log(decoded);

    let subscriptions = {
        labs: [],
        courses: []
    };

    if (decoded.active_labs && decoded.active_labs.length > 0) {
        subscriptions.labs = decoded.active_labs.map(lab => lab.lab_id);
    }

    if (decoded.my_courses && decoded.my_courses.length > 0) {
        subscriptions.courses = decoded.my_courses.map(course => course.id);
    }

    return subscriptions;
}

module.exports = get_access;
/*
import axios from 'axios';

async function verifyToken(token) {
    try {
        const response = await axios.post('/api/access_user_check', {
            token: token
        });
        return response.status === 200 && response.data.success === "true";
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}

function getDecodedJWT() {
    // Get the token from the cookie
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        .split('=')[1];

    return cookieValue;
}

async function get_access() {
    const token = getDecodedJWT();

    if (!await verifyToken(token)) {
        // Delete the cookie
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return false;
    }

    // Decode the token
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));

    let subscriptions = {
        labs: [],
        courses: []
    };

    if (decoded.active_labs && decoded.active_labs.length > 0) {
        subscriptions.labs = decoded.active_labs.map(lab => lab.lab_id);
    }

    if (decoded.my_courses && decoded.my_courses.length > 0) {
        subscriptions.courses = decoded.my_courses.map(course => course.id);
    }

    return subscriptions;
}

module.exports = get_access;
//getUserSubscriptions().then(console.log);
*/