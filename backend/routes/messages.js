var express = require('express');
var router = express.Router();

require('dotenv').config();
// Intialize Twilio client
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Handle when client side post to messages route
router.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    // Send messages using Twilio Api
    client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.phoneNum,
      body: req.body.accessCode
    })
    // Return result to the client side
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

module.exports = router;