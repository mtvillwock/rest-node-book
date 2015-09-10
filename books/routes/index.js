var models = require('../models');
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
console.log(models.List)
models.List.all().then(function(b){
    console.log(b)

})
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
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
    res.send('POST request to the homepage');
    console.log(req.body);
    // User.create()
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
    db.Book.findAll().then(function(books) {
        res.json(books);
    })
});



module.exports = router;