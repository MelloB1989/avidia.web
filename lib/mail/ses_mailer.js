const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

const ses = new AWS.SES();

async function ses_mailer(params) {
    const mailOptions = {
        Source: params.from,
        Destination: {
            ToAddresses: Array.isArray(params.to) ? params.to : [params.to]
        },
        Message: {
            Subject: {
                Data: params.subject,
                Charset: 'UTF-8'
            },
            Body: {
                Text: {
                    Data: params.body,
                    Charset: 'UTF-8'
                }
            }
        }
    };

    return new Promise((resolve, reject) => {
        ses.sendEmail(mailOptions, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
try {
        const emailParams = {
            from: 'no-reply@noobsverse.com',
            to: 'kartikdd90@gmail.com',
            subject: 'Hello from SES!',
            body: 'This is a test email sent using SES in Node.js.'
        };

        ses_mailer(emailParams);
    } catch (error) {
        console.error('Error sending email:', error);
    }
//module.exports = ses_mailer;