const API_KEY = "";
const DOMAIN = 'mellob.in';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

const send_mail = async (to, subject, text, html) => {
  try {
    const data = {
      from: 'Noobsverse <support@mellob.in>',
      to: [to],
      subject: subject,
      text: text,
      html: html,
    };

    const result = await client.messages.create(DOMAIN, data);
    console.log(result, "sent");
  } catch (error) {
    console.error(error);
  }
}

module.exports = send_mail;
//send_mail("kartikdd90@gmail.com", "adsada", "dsawds", "<p>das</p>");