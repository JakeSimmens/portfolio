const express = require("express");
const app = express();

app.get("/", (req,res) => {
    res.send("Future Portfolio site");
});

const port = process.env.PORT || 3000;
app.server = app.listen(port, ()=> {
    console.log("Launched portfolio server");
});

module.exports = app;