var express = require('express');
var router = express.Router();


/* GET comment home page */
router.get('/', function(req, res, next) {
    res.send('you are on comments page');
})

router.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
})

router.put('/', (req, res, next) => {
    return res.send('Received a PUT HTTP method');
})

router.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
})

// app.get('/', (req, res) => {
//     return res.send('Received a GET HTTP method');
//   });
  
//   app.post('/', (req, res) => {
//     return res.send('Received a POST HTTP method');
//   });
  
//   app.put('/', (req, res) => {
//     return res.send('Received a PUT HTTP method');
//   });
  
//   app.delete('/', (req, res) => {
//     return res.send('Received a DELETE HTTP method');
//   });
  

module.exports = router;