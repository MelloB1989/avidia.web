const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hi, your next class is at 3pm! Happy learning',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917569236628'
    })
    .then(message => console.log(message.sid));
    //.done();