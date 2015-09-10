var express = require('express');
var router = express.Router();

// GET form for new session
router.get('/sessions/new', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

// Post Session - create session to login user
router.post('/sessions', function(req, res, next) {
  console.log(req.body);
});


module.exports = router;
