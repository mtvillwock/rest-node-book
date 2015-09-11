// requiring all the models from models directory
var models = require('../models');
var validator = require('validator');
var passport = require('passport');
console.log("INDEX JS ROUTES FILE")
// console.log(models);
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


/////////////////
// Sessions
/////////////////

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
            res.redirect('/users/' + user.dataValues.id);
        }, function createSessionError(err) {
            console.log("error is:", err);
        })
});

// Delete Session - Logout user
router.delete('/sessions/:id', function(req, res, next) {
    console.log(req.body);
});

/////////////////
// Users
/////////////////
// Get form for new user
router.get('/users/new', function(req, res, next) {
    res.render('users/new', {
        title: 'Register a new user'
    });
});

// Post Users - create user in DB
router.post('/users', function(req, res, next) {
    console.log("request is:", req.body);
    var body = req.body;
    var user = models.User.create({
            email: body["email"],
            password: body["password"]
        })
        .then(function createUserSuccess(user) {
            console.log("new user created:", user);
            res.redirect('/users/' + user.dataValues.id);
        }, function createUserError(err) {
            console.log("error is:", err);
        })
});

// Users index - see all users
router.get('/users', function(req, res, next) {
    var users = models.User.findAll()
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

// find a user
router.get('/users/:id', function(req, res, next) {
    var user = models.User.findOne({
            where: {
                id: req.params.id,
            },
            include: [models.List]
        }).then(function(user) {
            res.render('users/show', {
                user: user,
                lists: user.Lists
            });
        })
        .error(function(err) {
            console.log("user not found: ", err);
        })
})

// update a user
router.put('/users/:id', function(req, res, next) {

})

// destroy a user
router.delete('/users/:id', function(req, res) {

})



/////////////////
// Lists
/////////////////

// Get all the lists
router.get('/lists', function(req, res, next) {
    // models.List.findAll({
    //     where: {
    //         UserId: // set dynamically later
    //     }
    // })
    models.List.findAll()
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
        UserId: 1,
        user_id: 1 //body["user_id"]
    })
        .then(function createlistSuccess(list) {
            console.log("list is: ", list);
        }, function createlistError(err) {
            console.log("error is:", err);
        })
    res.redirect('/lists');
});

// Get a single list and its books
router.get('/lists/:id', function(req, res, next) {
    // find list
    var list = models.List.findOne({
            where: {
                id: req.params.id
            },
            include: [models.Book]
        })
        .then(function(list) {
            console.log(list);
            console.log(list.Books);
            res.render('lists/show', {
                list: list,
                books: list.Books
            });
        }).error(function(err) {
            console.log("couldn't find the list", err);
        })
});

// // Delete a list
// router.delete('/users/:id', function(req, res) {

// });


/////////////////
// Books
/////////////////

// // Get all books on a list
// router.get('/lists/:id/books', function(req, res, next) {
//     // find list
//     var list = models.List.findOne({
//             where: {
//                 id: req.params.id
//             }, include: [models.Books]
//         })
//         .then(function(list) {
//             console.log("found the list", list);
//         }).error(function(err) {
//             console.log("couldn't find the list", err);
//         })

//     // find associated books
//     var books = models.Book.findAll({
//             where: {
//                 list_id: req.params.id
//             }
//         })
//         .then(function(books) {
//             res.render('books/index', {
//                 list: list,
//                 title: "Books for " + list.name,
//                 books: books
//             });
//         })
//         .error(function(err) {
//             console.log("couldn't find books for that list:", err);
//         })
// });

// Make a new Book
router.post('/lists/:id/books', function(req, res, next) {
    console.log("params are:", req.params);
    console.log("body is:", req.body);
    var body = req.body;
    models.Book.create({
        email: body["name"],
        password: body["type"],
        list_id: req.params.id,
        ListId: req.params.id //body["list_id"]
    })
        .then(function createBookSuccess(book) {
            console.log("book is: ", book);
        }, function createBookError(err) {
            console.log("error is:", err);
        })
    res.redirect('/lists/' + req.params.id);
});

// Get a specific book
router.get('/lists/:list_id/books/:id', function(req, res, next) {
    var book = models.Book.findOne({
            where: {
                ListId: req.params.list_id,
                id: req.params.id
            }
        })
        .then(function(book) {
            res.render('books/show', {
                title: "Books Show",
                book: book,
                list_id: req.params.list_id
            });
        })
        .error(function(err) {
            console.log(err);
        })
})

// update a book
router.put('/lists/:list_id/books/:id', function(req, res, next) {
    console.log("params are:", req.params);
    console.log("body is:", req.body);
    var body = req.body;
    models.Book.update({
        title: body["title"],
        author: body["author"]
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function updateBookSuccess(book) {
            console.log("updated book is: ", book);
        }, function updateBookError(err) {
            console.log("error is:", err);
        })
    res.redirect('/lists/' + req.params.id + '/books');
});

// Delete a specific book
router.delete('/lists/:list_id/books/:id', function(req, res, next) {
    var book = models.Book.destroy({
            where: {
                ListId: req.params.list_id,
                id: req.params.id
            }
        })
        .then(function(book) {
            console.log("deleted book: ", book)
        })
        .error(function(err) {
            console.log(err);
        })
    res.redirect('/lists/' + req.params.list_id + '/books');
})


module.exports = router;