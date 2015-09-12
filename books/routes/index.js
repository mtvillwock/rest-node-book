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
    var userSession = req.session;
    if (userSession.user_id) {
        console.log("session exists");
    } else {
        userSession.user_id = 1;
        console.log("session added", userSession);
    }
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
                userSession.id = user.dataValues.id;
                console.log("session is:", userSession)
                res.redirect('/lists');
            } else {
                // redirect to login if user isn't found
                res.redirect('/sessions/new');
            }
        }, function createSessionError(err) {
            console.log("error is:", err);
        })
});

// Delete Session - Logout user
// I know this should be router.delete
router.get('/logout', function(req, res, next) {
    console.log(req.session);
    req.session.destroy();
    if (req.session) {
        console.log("session persisted: ", req.session);
        console.log(err);
        res.redirect('/lists');
    } else {
        console.log("session destroyed: ", req.session);
        res.redirect('/sessions/new');
    }
});

/////////////////
// Users
/////////////////
// Get form for new user
router.get('/users/new', function(req, res, next) {
    if (req.session.user_id) {
        res.redirect('/lists');
    } else {
        res.render('users/new', {
            title: 'Register a new user'
        });
    }
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
            req.session.user_id = user.dataValues.id;
            console.log("session is:", userSession);
            res.redirect('/lists');
        }, function createUserError(err) {
            console.log("error is:", err);
            res.redirect('/users/new');
        })
});


/////////////////
// Lists
/////////////////

// Get all the lists
router.get('/lists', function(req, res, next) {
    // console.log("session is: ", userSession);
    if (req.session.user_id) {
        models.List.findAll({
            where: {
                UserId: req.session.user_id
            }
        })
        // models.List.findAll()
        .then(function(lists) {
            res.render('lists/index', {
                title: "Lists Index",
                lists: lists,
                // UserId: 1
            });
        })
            .error(function(err) {
                console.log(err);
            })
    } else {
        res.redirect('/sessions/new');
    }
});

// Make a new list
router.post('/lists', function(req, res, next) {
    if (req.session.user_id) {
        console.log("request is:", req.body);
        console.log(req.session);
        var body = req.body;
        models.List.create({
            name: body["name"],
            type: body["type"],
            UserId: req.session.user_id,
            user_id: req.session.user_id
        })
            .then(function createlistSuccess(list) {
                console.log("list is: ", list);
            }, function createlistError(err) {
                console.log("error is:", err);
            })
        res.redirect('/lists');
    } else {
        res.redirect('/sessions/new');
    }
});

// Get a single list and its books
router.get('/lists/:id', function(req, res, next) {
    if (req.session.user_id) {
        // find list
        var list = models.List.findOne({
                where: {
                    id: req.params.id
                },
                include: [models.Book]
            })
            .then(function(list) {
                console.log(list);
                console.log(list.Books[1]);
                res.render('lists/show', {
                    list: list,
                    books: list.Books
                });
            }).error(function(err) {
                console.log("couldn't find the list", err);
            })
    } else {
        res.redirect('/sessions/new');
    }
});

// // Delete a list
// router.delete('/users/:id', function(req, res) {

// });


/////////////////
// Books
/////////////////

// Make a new Book
router.post('/lists/:id/books', function(req, res, next) {
    if (req.session.user_id) {
        console.log("params are:", req.params);
        console.log("body is:", req.body);
        var body = req.body;
        models.Book.create({
            author: body["author"],
            type: body["type"],
            list_id: req.params.id,
            ListId: req.params.id //body["list_id"]
        })
            .then(function createBookSuccess(book) {
                console.log("book is: ", book);
            }, function createBookError(err) {
                console.log("error is:", err);
            })
        res.redirect('/lists/' + req.params.id);
    } else {
        res.redirect('/sessions/new');
    }
});

// Get a specific book
router.get('/lists/:list_id/books/:id', function(req, res, next) {
    if (req.session.user_id) {
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
    } else {
        res.redirect('/sessions/new');
    }
})

// // update a book
// router.put('/lists/:list_id/books/:id', function(req, res, next) {
//     console.log("params are:", req.params);
//     console.log("body is:", req.body);
//     var body = req.body;
//     models.Book.update({
//         title: body["title"],
//         author: body["author"]
//     }, {
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(function updateBookSuccess(book) {
//             console.log("updated book is: ", book);
//         }, function updateBookError(err) {
//             console.log("error is:", err);
//         })
//     res.redirect('/lists/' + req.params.list_id + '/books/' + req.params.id);
// });

// // Delete a specific book
// router.delete('/lists/:list_id/books/:id', function(req, res, next) {
//     var book = models.Book.destroy({
//             where: {
//                 ListId: req.params.list_id,
//                 id: req.params.id
//             }
//         })
//         .then(function(book) {
//             console.log("deleted book: ", book)
//         })
//         .error(function(err) {
//             console.log(err);
//         })
//     res.redirect('/lists/' + req.params.list_id + '/books');
// })


module.exports = router;