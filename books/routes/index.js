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
    console.log(req.body);
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
    User.create({ email: body["email"], password: body["password"] })
  .then(function(user) {
    console.log(user.get('email')); // John Doe (SENIOR ENGINEER)
    console.log(user.get('password')); // SENIOR ENGINEER
  })
    res.send('POST request to the make new user');

});

// Delete Session - Logout user
router.delete('/sessions/:id', function(req, res, next) {
    console.log(req.body);
});

/////////////////
// Users
/////////////////
router.get('/users', function(req, res, next) {
    res.send('respond with all users');
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