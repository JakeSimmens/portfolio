const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const favicon = require("serve-favicon");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.post('/', async (req, res) => {

    let htmlMsg = 
        `<h1> Portfolio Contact from jakesimmens.com</h1><br>
        <p>Contact Name: ${req.body.contactName}</p>
        <p>Contact Email:  ${req.body.email}</p><br>
        <h2> message: </h2>
        <p> ${req.body.message}</p>`;

    let textMsg =
        `Portfolio Contact from jakesimmens.com\n\n
        Contact Name: ${req.body.contactName}\n
        Contact Email:  ${req.body.email}\n\n
        message:\n
        ${req.body.message}`;

    let emailData = {
        from: {
            name: req.body.contactName,
            address: "contact@jakesimmens.com"
        },
        to: "jake@jakesimmens.com",
        subject: `PORTFOLIO - Contact Request from ${req.body.contactName}`,
        html: htmlMsg,
        text: textMsg
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.jakesimmens.com",
        port: 465,  //will be 587 if secure is false
        secure: true,
        auth: {
            user: "username",
            pass: "password"
        }
    });

    try{
        let info = await transporter.sendMail(emailData);
        console.log(`Message sent: ${info.messageId}`);
        console.log("email data: ", emailData);
    } catch {
        console.log("email not working");
    }

    res.redirect('/');
})

const port = process.env.PORT || 3000;
app.server = app.listen(port, function startServer() {
    console.log("portfolio server running");
   
});