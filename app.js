const {EMAIL_USERNAME, EMAIL_PASSWORD, SESSION_SECRET} = require("./config.js");

const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const favicon    = require("serve-favicon");
const session    = require("express-session");
const flash      = require("connect-flash");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());


app.get('/', (req, res) => {
    res.render("index", {
      messages: req.flash("info"),
      contactMessage: ""
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', {messages: req.flash("info")});
});

app.post('/', async (req, res) => {

    if(!req.body.contactName || !req.body.email || !req.body.message){
      req.flash("info","Please fill out all 3 areas of the 'Contact Me' form.");
      res.render("index", {
        messages: req.flash("info"),
        contactMessage: req.body.message
      });
      return;
    }

    let htmlMsg = 
        `<h3> Portfolio Contact from jakesimmens.com</h3><br>
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
        subject: `PORTFOLIO Site - ${req.body.contactName}`,
        html: htmlMsg,
        text: textMsg
    }

    let transporter = nodemailer.createTransport({
        host: "mail.jakesimmens.com",
        port: 465,  //will be 587 if secure is false
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME || EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD || EMAIL_PASSWORD
        }
    });

    try{
        let info = await transporter.sendMail(emailData);
        req.flash("info","Your message has been sent to Jake.");
        console.log(`Message sent: ${info.messageId}`);
    } catch {
        req.flash("info",`I'm sorry, your message did not go thru.  Please email jake@jakesimmens.com.  Your message read: ${req.body.message}` );
        console.log("email not working");
    }

    res.redirect('/');
})

const port = process.env.PORT || 3000;
app.server = app.listen(port, function startServer() {
    console.log("portfolio server running");
});