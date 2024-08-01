const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const send_whatsapp = async (body, to) => {
const sid = client.messages
    .create({
        body: body,
        from: 'whatsapp:+14155238886',
        to: to
    });
    //.then(message => console.log(message.sid));
}

module.exports = send_whatsapp;