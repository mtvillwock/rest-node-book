var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/books', function(req, res, next) {
  res.send('respond with all books');
});

module.exports = router;
