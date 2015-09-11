var express = require('express');
var router = express.Router();

// Get form for new session
router.get('/sessions/new', function(req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

// Post Session &&& create session to login user
router.post('/sessions', function(req, res, next) {
    var body = req.body;
    var params = req.params;
    var user = models.User.findOne({
            where: {
                // email: req.params.email
                email: body["email"]
            }
        })
        .then(function(user) {
            console.log(user);
            res.send(user);
        })
        .error(function(err) {
            console.log(err);
        })
});


module.exports = router;
