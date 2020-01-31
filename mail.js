require('dotenv').config();

const nodeMailer = require('nodemailer');

//step 1
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendMail = (subject, email, text) => {
    //step2
    const textBody = `From: ${email} et voici son message ${text}`;
    const htmlBody = `<h2>Mail from contact form: From: ${email}</h2><p>${text}</p>`
    const mailOptions = {
        from: email,
        to: 'acardnicolas91@gmail.com',
        subject: subject,
        text: textBody,
        html: htmlBody
    };

    //step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log('erreur', err)
        }else{
            console.log('message sent')
        }
    });
}

module.exports = sendMail;




