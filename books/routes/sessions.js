var express = require('express');
var router = express.Router();

// Get form for new session
router.get('/sessions/new', function(req, res, next) {
    res.render('sessions/new', {
        title: 'Login to a new session'
    });
});

// Post sessions - create session in DB
router.post('/sessions', function(req, res, next) {
    console.log("request is:", req.body);
    var body = req.body;
    var user = models.User.findOne({
            where: {
                email: body["email"],
                password: body["password"]
            }
        })
        .then(function createSessionSuccess(user) {
            console.log("user logged in: ", user);
            if (user.dataValues.email == body["email"]) {
                router.userSession.id = user.dataValues.id;
                console.log("session is:", router.userSession)
                res.redirect('/lists/');
            } else {
                // redirect to login if user isn't found
                res.redirect('/sessions/new');
            }
        }, function createSessionError(err) {
            console.log("error is:", err);
        })
});

// Delete Session - Logout user
router.delete('/sessions/:id', function(req, res, next) {
    console.log(req.body);
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/sessions/new');
        }
    });
});


module.exports = router;
