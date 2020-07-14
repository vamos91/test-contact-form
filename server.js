const express = require('express');
const app = express();
// const sendMail = require('./mail');
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');


app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.post('/email', (req, res) => {
    //sendMail(req.body.data.e, req.body.data.t)
    const sendMail = (mail, content, from) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'acardnicolas91@gmail.com',
            from: mail,
            subject: 'Message de oui-makeweb',
            text: content,
            // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };

        const msg_from_pdf = {
            to: mail,
            from: 'oui-makeweb',
            subject: 'Message de oui-makeweb',
            text: content,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        if (from === 'pdf'){
            console.log(msg_from_pdf);
            sgMail.send(msg_from_pdf, (err, data) => {
                if (!err) {
                    res.json(data);
                }
            });
        }else{
            console.log(msg)
            sgMail.send(msg, (err, data) => {
                if (!err) {
                    res.json(data);
                }
            });
        }    
    }
    sendMail(req.body.data.e, req.body.data.t, req.body.data.from);   
})

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`);
})