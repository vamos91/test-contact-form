const express = require('express');
const app = express();
// const sendMail = require('./mail');
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
require('dotenv').config();



app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.post('/email', (req, res) => {
    console.log(req.body.data)

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

const sendMail = (email, text) => {
    //step2
    const textBody = `From: ${email} et voici son message ${text}`;
    const htmlBody = `<h2>Mail from contact form: From: ${email}</h2><p>${text}</p>`
    const mailOptions = {
        from: email,
        to: 'acardnicolas91@gmail.com',
        subject: 'Message de wemakeweb !',
        text: textBody,
        html: htmlBody
    };
    
    //step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log('erreur', err)
            res.json(err);
        }else{
            console.log('message sent');
            console.log(data);
            res.json(data);
        }
    });
}
sendMail(req.body.data.e, req.body.data.t)
})

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`);
})