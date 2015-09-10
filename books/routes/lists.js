var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/lists', function(req, res, next) {
  res.send('respond with all lists');
});

module.exports = router;
