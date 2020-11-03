var express = require('express');
var router = express.Router();


// Method to generate random 6 digit code
function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// return the accessCode back to frontend 
router.get('/', function(req, res, next) {
  accessCode = getRandomString(6)
  return res.send(accessCode)
});

module.exports = router;