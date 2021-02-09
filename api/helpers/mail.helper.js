const nodemailer = require('nodemailer');
const smtp = require('../config/smtp');

const exportObj = {
    sendEmail: async (emailTo, subject, message, messageHtml = message) => {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: smtp.host,
            port: smtp.port,
            auth: {
                user: smtp.user, // generated ethereal user
                pass: smtp.pass, // generated ethereal password
            },
            secure: false,
            // port: 25,
            tls: {
                rejectUnauthorized: false,
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"CFG Admin" <${smtp.user}>`, // sender address
            to: emailTo, // list of receivers
            subject, // Subject line
            text: message, // plain text body
            html: messageHtml, // html body
        });

        // eslint-disable-next-line no-console
        console.log('Message sent: %s', info.messageId);
    },
    sendWelcomeEmail: async (email, passwordRestLink) => {
        const link = `${passwordRestLink}.9CD599A3523898E6A12E13EC787DA50A`;
        await exportObj.sendEmail(
            email,
            'Welcome to CFG',
            `Welcome to CFG <br/> click link to set the password: ${link}`,
        );
    },
};

module.exports = exportObj;
