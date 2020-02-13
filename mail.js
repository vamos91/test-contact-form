require('dotenv').config();

const nodeMailer = require('nodemailer');

//step 1
let transporter = nodeMailer.createTransport({
    pool: true,
    service: 'gmail',
    auth: {
        //type: 'OAuth2',
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        // accessToken: 'ya29.Il-9B-dB4KfcQoX-2xaL2__98UxwCQ1UQemtwH2V8AMq2BtXx0f-aSMwapojyIpFsbhnyIOJbHsFZ1nTXPWDV590gejNCSNL9muDxD52ekwFKOy_Kdgh19ROVdP1tkmgDw',
        // expires: 1234543635634524514 + 6000000,
        // refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        // clientId: process.env.EMAIL_CLIENT_ID,
        // clientSecret: process.env.EMAIL_CLIENT_SECRET,
        // accessUrl: 'https://oauth2.googleapis.com/token'
    }
});

transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
        transporter.on('token', token => {
            console.log('A new access token was generated');
            console.log('User: %s', token.user);
            console.log('Access Token: %s', token.accessToken);
            console.log('Expires: %s', new Date(token.expires));
        });
      });

const sendMail = (subject, email, text) => {
    //step2
    const textBody = `From: ${email} et voici son message ${text}`;
    const htmlBody = `<h2>Mail from contact form: From: ${email}</h2><p>${text}</p>`
    const mailOptions = {
        from: email,
        to: 'acardnicolas91@gmail.com',
        // subject: subject,
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




