const express = require('express');
const app = express();
const sendMail = require('./mail');
const port = process.env.PORT || 3000;
const path = require('path');


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/public", express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.post('/email', (req, res) => {
    console.log(req.body.data)
    sendMail(req.body.data.s, req.body.data.e, req.body.data.t)
})

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`);
})