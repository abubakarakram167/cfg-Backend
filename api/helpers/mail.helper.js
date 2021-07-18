const nodemailer = require('nodemailer');
const smtp = require('../config/smtp');
const config = require('../config/config');

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
    sendWelcomeEmail: async (user, passwordRestLink) => {
        const link = `${passwordRestLink}.9CD599A3523898E6A12E13EC787DA50A`;
        await exportObj.sendEmail(
            user.email,
            'Welcome to CFG',
            `Dear ${user.first_name},

            <br><br>

            We are so pleased that you have chosen to join the CFG APP family!
            
            <br><br>
            
            You will now have access to all the tools that you will need to help you unearth and build your inner Greatness; tracking your progress along the way. 
            <br>
            Completing registration is easy! Create a strong password with at least 8 characters, including capital letters, numbers and special characters and you’re all set. 
            <br><br>
            Click the link to create password: <a href="${link}">Create Password</a>
            <br><br>
            
            Blessings,
            <br><br>
            The JMMB Joan Duncan Foundation`
        );
    },

    sendPostEmails: async (emails, authorName) => {
        for(let email of emails){
            await exportObj.sendEmail(
                email.email,
                'New Post Notification',
                `<b>Hi  <strong>${email.first_name}</strong> </b> <br> ${authorName} has just posted something new in the cfg app for you. Check it out Now!`,
            );
        }
        
    },
};

module.exports = exportObj;
