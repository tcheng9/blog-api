var express = require('express');
var router = express.Router();


/* GET comment home page */
router.get('/', function(req, res, next) {
    res.send('you are on comments page');
})

module.exports = router;