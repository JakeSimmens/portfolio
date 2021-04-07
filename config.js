
const {SESSION_SECRET, EMAIL_PASSWORD, EMAIL_USERNAME}  = require("./secrets.js");


module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || EMAIL_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET || SESSION_SECRET
}