var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {

  res.render('/users/index', { users: users });
});

router.get('/users/new', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

// Post Users - create user in DB
router.post('/users', function(req, res, next) {
  console.log(req.body);
});


module.exports = router;
