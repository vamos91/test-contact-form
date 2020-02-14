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
    console.log(req.body.data)
    //sendMail(req.body.data.e, req.body.data.t)
    const sendMail = () => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: 'acardnicolas91@gmail.com',
        from: req.body.data.e,
        subject: 'Message de wemakeweb',
        text: req.body.data.t,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg, (err, data) => {
            if(!err){
                res.json(data);
            }   
        });
    }
    sendMail(req.body.data.e, req.body.data.t);
    
    
})

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`);
})