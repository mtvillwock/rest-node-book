// requiring all the models from models directory
var models = require('../models');
console.log("INDEX JS ROUTES FILE")
console.log(models.Book);
// models.Book.findAll().then(function(lists){
//     console.log(book)
//       res.send({
//         books: books
//       });
// })
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
    db.Book.findAll()
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