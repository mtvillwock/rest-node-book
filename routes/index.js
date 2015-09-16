// requiring all the models from models directory
var http = require('http');
var https = require('https');
var models = require('../models');
// var validator = require('validator');
// var passport = require('passport');
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
// Sessions
/////////////////

// Get form for new session
router.get('/sessions/new', function(req, res, next) {
    console.log("in sessions/new, session is:", req.session);
    if (req.session.user) {
        res.redirect('/lists');
    } else {
        res.render('sessions/new', {
            title: 'Login to a new session'
        });
    }
});

// Post sessions - create session in DB
router.post('/sessions', function(req, res, next) {
    console.log("in POST /sessions, session is:", req.session);
    console.log("request is:", req.body);
    models.User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(function(user) {
            console.log("user logged in: ", user);
            if (req.body.password == user.dataValues.password) {
                req.session.user = user.dataValues;
                console.log("session is:", req.session);
                res.redirect('/lists');
            } else {
                // redirect to login if user isn't found
                console.log("in POST /sessions, no session:", req.session);
                res.redirect('/sessions/new');
            }
        });
});

// Delete Session - Logout user
// I know this should be router.delete
router.get('/logout', function(req, res, next) {
    console.log("in /logout, session is:", req.session);
    console.log(req.session);
    req.session.destroy();
    res.clearCookie('session', {
        path: '/'
    });
    if (req.session) {
        console.log("session persisted: ", req.session);
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
    console.log("in users/new, session is:", req.session);
    if (req.session.user) {
        res.redirect('/lists');
    } else {
        res.render('users/new', {
            title: 'Register a new user'
        });
    }
});

// Post Users - create user in DB
router.post('/users', function(req, res, next) {
    console.log("in POST /users, session is:", req.session);
    console.log("request is:", req.body);
    var body = req.body;
    var user = models.User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(function createUserSuccess(user) {
            console.log("new user created:", user);
            req.session.user = user.dataValues;
            console.log("session is:", req.session);
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
    console.log("in GET /lists, session is: ", req.session);
    if (req.session && req.session.user) {
        models.User.findOne({
            where: {
                id: req.session.user.id
            },
            include: [models.List]
        })
        // models.List.findAll()
        .then(function(user) {
            console.log("lists user is:", user);
            res.render('lists/index', {
                title: "User Dashboard / Lists Index",
                lists: user.Lists,
                user: user.dataValues
            });
        })
            .error(function(err) {
                console.log(err);
            })
    } else {
        console.log("no session in GET /lists: ", req.session);
        res.redirect('/sessions/new');
    }
});

// Make a new list
router.post('/lists', function(req, res, next) {
    console.log("in POST /lists, session is:", req.session);
    if (req.session.user) {
        console.log("request is:", req.body);
        console.log(req.session);
        models.List.create({
            name: req.body.name,
            type: req.body.type,
            UserId: req.session.user.id,
            user_id: req.session.user.id
        })
            .then(function createlistSuccess(list) {
                console.log("list is: ", list);
            }, function createlistError(err) {
                console.log("error is:", err);
            })
        res.redirect('/lists');
    } else {
        console.log("no session in POST /lists: ", req.session);
        res.redirect('/sessions/new');
    }
});

// Get a single list and its books
router.get('/lists/:id', function(req, res, next) {
    console.log("in lists/:id, session is:", req.session);
    if (req.session.user) {
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
    } else {
        console.log("no session in GET /lists/:id: ", req.session);
        res.redirect('/sessions/new');
    }
});

// // Delete a list
// router.delete('/users/:id', function(req, res) {

// });


/////////////////
// Books
/////////////////

// search for a book
router.post('/lists/:id/books/search', function(req, res, next) {
    //Sample Google API books call
    //https://www.googleapis.com/books/v1/volumes?q=intitle:flowers+inauthor:keyes&key=APIKEY
    var list_id = req.params.id;
    var results;
    var response = res;

    function getBook() {
        var host = "https://www.googleapis.com";
        var route = "/books/v1/volumes?q=";
        var key = process.env.BOOKS_KEY;

        console.log()

        if (req.body["author"] && req.body["title"]) {
            route += "inauthor:" + req.body["author"] + "+" + "intitle:" + req.body["title"];
        } else if (req.body["title"]) {
            route += "intitle:" + req.body["title"];
        } else if (req.body["author"]) {
            route += "inauthor:" + req.body["author"];
        }

        route += "&printType=books&key=" + key;

        var url = host + route;
        console.log("request is: ", url);

        https.get(url, function(res) {
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            var results = res.on('end', function() {
                // console.log(responseString);
                // console.log("RESPONSE OBJECT &&&&&&&&&&&&&&&&&&&&&&&&&");
                var responseObject = JSON.parse(responseString);
                // console.log(responseObject);
                searchResults = responseObject.items;
                // console.log("RESPONSE OBJECT.ITEMS $$$$$$$$$$$$$$$$$$$$$$$$$");
                // console.log(searchResults);

                // for (var i = searchResults.length - 1; i >= 0; i--) {
                console.log("individual items in searchResults *****************");
                console.log(searchResults[0].volumeInfo);
                // just taking first result
                var bookInfo = searchResults[0].volumeInfo;
                var author;
                var title = bookInfo.title;
                var authors = bookInfo.authors;
                // check if there are multiple authors
                if (authors.length === 1) {
                    author = authors[0];
                } else {
                    for (var i = authors.length - 1; i >= 0; i--) {
                        if (authors[i].toLowerCase() === req.body["author"].toLowerCase()) {
                            // set author to author name from array of authors if matching
                            author = authors[i];
                        }
                    };
                }

                var searchedAuthor = req.body["author"];
                var searchedTitle = req.body["title"];

                console.log("THE AUTHOR AND TITLE FROM GOOGLE BOOKS are :", author, title);
                models.Book.findOrCreate({
                    where: {
                        $or: [{
                            author: searchedAuthor
                        }, {
                            title: searchedTitle
                        }]
                    },
                    defaults: {
                        author: author,
                        title: title,
                        list_id: list_id, // don't need this one
                        ListId: list_id
                    }
                }).then(function(book) {
                    console.log("inside findOrCreate callback, response is: ", book);
                    console.log("found book:", book[0].dataValues, list_id);
                    // using response from above
                    response.redirect('/lists/' + list_id + '/books/' + book[0].dataValues.id);
                }, function(err) {
                    console.log("book not found", err);
                })
                // };
            });
            return results;
        }) // can I use .then here?
    };

    results = getBook();

    //https://www.googleapis.com/books/v1/volumes?q=search+terms
    // parse data to pass to model
    // models.Book.findOrCreate({
    //     where: {
    //         $or: [{
    //             author: req.body["author"]
    //         }, {
    //             title: req.body["title"]
    //         }]
    //     }
    // }).then(function(book) {
    //     console.log("found book:", book);
    //     res.redirect('/lists/' + req.params.id + '/books/' + book.dataValues.id);
    // }, function(err) {
    //     console.log("book not found", err);
    // })
})

// Make a new Book
router.post('/lists/:id/books', function(req, res, next) {
    console.log("in POST /lists/:id/books, session is:", req.session);
    if (req.session.user) {
        console.log("params are:", req.params);
        console.log("body is:", req.body);
        var body = req.body;
        models.Book.create({
            author: body["author"],
            title: body["title"],
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
        console.log("no session in POST /lists/:id/books: ", req.session);
        res.redirect('/sessions/new');
    }
});

// Get a specific book
router.get('/lists/:list_id/books/:id', function(req, res, next) {
    console.log("in /lists/:list_id/books/:id, session is:", req.session);
    if (req.session.user) {
        var book = models.Book.findOne({
                where: {
                    ListId: req.params.list_id,
                    id: req.params.id
                }
            })
            .then(function(book) {
                console.log("book #" + req.params.id + "to render is: ", book);

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
        console.log("in /lists/:list_id/books/:id, no session:", req.session);
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