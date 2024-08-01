const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const send_mail = (to_mail, subject, text, html) => {
const msg = {
  to: to_mail, // Change to your recipient
  from: 'no-reply@avidia.in', // Change to your verified sender
  subject: subject,
  text: text,
  html: html,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = send_mail;