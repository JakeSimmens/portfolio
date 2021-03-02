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

app.post('/', (req, res) => {
    let emailData = {
        contactName: req.body.contactName,
        contactEmail: req.body.email,
        subject: "PORTFOLIO - Contact Request",
        text: req.body.message
    }
    console.log("email send request: ", emailData);

    res.redirect('/');
})

const port = process.env.PORT || 3000;
app.server = app.listen(port, function startServer() {
    console.log("portfolio server running");
   
});