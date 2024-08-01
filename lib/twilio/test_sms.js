const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Test',
        from: '+12512998263',
        to: '+917569236628'
    })
    .then(message => console.log(message.sid));