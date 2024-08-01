const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

const send_sms = async (body, to) => {
const sid = client.messages
    .create({
        body: body,
        from: '+12512998263',
        to: to
    });
    //.then(message => console.log(message.sid));
}

module.exports = send_sms;