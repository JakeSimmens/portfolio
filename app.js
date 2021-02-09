const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/', (req, res) => {
    console.log("contact post request received");
    console.log(req.body);
    res.redirect('/');
})

const port = process.env.PORT || 3000;
app.server = app.listen(port, function startServer() {
    console.log("portfolio server running");
   
});