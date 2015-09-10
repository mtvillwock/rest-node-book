// requiring all the models from models directory
var models = require('../models');
var validator = require('validator');
console.log("INDEX JS ROUTES FILE")
console.log(models.Book);
console.log("INDEX JS ROUTES FILE")
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/////////////////
// Authentication
/////////////////

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

// Get form for new user
router.get('/users/new', function(req, res, next) {
    res.render('register', {
        title: 'Register'
    });
});

// Post Users - create user in DB
router.post('/users', function(req, res, next) {
    console.log("request is:", req.body);
    var body = req.body;
    models.User.create({
        email: body["email"],
        password: body["password"]
    })
        .then(function createUserSuccess(user) {
            console.log(user.get('email'));
            console.log(user.get('password'));
        }, function createUserError(err) {
            console.log("error is:", err);
        })
    res.redirect('/users');
});

// Delete Session - Logout user
router.delete('/sessions/:id', function(req, res, next) {
    console.log(req.body);
});

/////////////////
// Users
/////////////////
router.get('/users', function(req, res, next) {
  models.User.findAll()
  .then(function(users) {
    res.render('users/index', { title: "Users Index", users: users });
  })
  .error(function(err) {
    console.log(err);
  })
});

router.route('/users/:user_id')
    .get(function(req, res) {
        // get a user
    })

.put(function(req, res) {
    // update a user
})

.delete(function(req, res) {
    // destroy a user
})

/////////////////
// Lists
/////////////////


/////////////////
// Books
/////////////////
router.get('/books', function(req, res, next) {
    models.Book.findAll()
        .then(function findBooksSuccess(books) {
            res.send({
                books: books
            });
        }, function findBooksError(error) {
            res.send({
                error: error
            });
        });
});



module.exports = router;