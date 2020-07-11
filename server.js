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
    console.log(req.body.data.from)
    //sendMail(req.body.data.e, req.body.data.t)
    const sendMail = () => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'acardnicolas91@gmail.com',
            from: req.body.data.e,
            subject: 'Message de oui-makeweb',
            text: req.body.data.t,
            // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };

        const msg_from_pdf = {
            to: req.body.data.e,
            from: 'oui-makeweb',
            subject: 'Message de oui-makeweb',
            text: 'path to pdf url',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        if (req.body.data.from === 'pdf'){
            sgMail.send(msg_from_pdf, (err, data) => {
                if (!err) {
                    res.json(data);
                }
            });
        }else{
            sgMail.send(msg, (err, data) => {
                if (!err) {
                    res.json(data);
                }
            });
        }
        
    }
    sendMail(req.body.data.e, req.body.data.t, req.body.data.from);   
})

// app.post('/sendpdf', (req, res) => {
//     console.log(req.body.data.e)
//     //sendMail(req.body.data.e, req.body.data.t)
//     const sendPDF = (mail) => {
//         console.log(mail + ' ' +'est bien passé en paramètre');
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//             to: mail,
//             from: 'oui-makeweb',
//             subject: 'Message de oui-makeweb',
//             text: 'Voici votre pdf',
//             // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//         };
//         sgMail.send(msg, (err, data) => {
//             if (!err) {
//                 res.json(data);
//             }else{
//                 console.log('message erreur:' + '' + err.message);
//             }
//         });
//     }
//     sendPDF(req.body.data.e);
// })

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`);
})