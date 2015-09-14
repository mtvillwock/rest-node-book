var express = require('express');
var router = express.Router();

/////////////////
// Lists
/////////////////

// Get all the lists
router.get('/lists', function(req, res, next) {
    if (router.userSession.id) {
        models.List.findAll({
            where: {
                UserId: router.userSession.id
            }
        })
        // models.List.findAll()
        .then(function(lists) {
            res.render('lists/index', {
                title: "Lists Index",
                lists: lists
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
    console.log("session is: ", router.userSession);
    if (!router.userSession.id) {
        res.redirect('/sessions/new');
    }
    console.log("request is:", req.body);
    var body = req.body;
    console.log(req.params);
    models.List.create({
        name: body["name"],
        type: body["type"],
        UserId: router.userSession.id,
        user_id: router.userSession.id //body["user_id"]
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
    if (!router.userSession.id) {
        res.redirect('/sessions/new');
    }
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

module.exports = router;
