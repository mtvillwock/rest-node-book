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
            res.render('users/index', {
                title: "Users Index",
                users: users
            });
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

// Get all the lists
router.get('/lists', function(req, res, next) {
    models.Book.findAll()
        .then(function(lists) {
            res.render('lists/index', {
                title: "Lists Index",
                lists: lists
            });
        })
        .error(function(err) {
            console.log(err);
        })
});

// Make a new list
router.post('/lists', function(req, res, next) {
    console.log("request is:", req.body);
    var body = req.body;
    console.log(req.params);
    models.List.create({
        name: body["name"],
        type: body["type"],
        UserId: 1 //body["user_id"]
    })
        .then(function createlistSuccess(list) {
            console.log(list.get('name'));
            console.log(list.get('type'));
            console.log(list.get('user_id'));
        }, function createlistError(err) {
            console.log("error is:", err);
        })
    res.redirect('/lists');
});

// Get a single list

/////////////////
// Books
/////////////////
router.get('lists/:id/books', function(req, res, next) {
    var list = models.List.findOne()
        .then(function() {
            console.log("found the list", list);
        }).error(function() {
            console.log("couldn't find the list");
        })

    var books = models.Book.findAll({
            where: {
                list_id: req.params.id
            }
        })
        .then(function(books) {
            res.render('books/index', {
                list: list,
                title: "Books for " + list.name,
                books: books
            });
        })
        .error(function(err) {
            console.log("couldn't find books for that list:", err);
        })
});

// Make a new Book
router.post('/books', function(req, res, next) {
    console.log("request is:", req.body);
    var body = req.body;
    models.Book.create({
        email: body["name"],
        password: body["type"],
        user_id: body["user_id"]
    })
        .then(function createBookSuccess(book) {
            console.log(book.get('name'));
            console.log(book.get('type'));
            console.log(book.get('user_id'));
        }, function createBookError(err) {
            console.log("error is:", err);
        })
    res.redirect('/books');
});


module.exports = router;