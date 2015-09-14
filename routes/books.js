var express = require('express');
var router = express.Router();

/* GET users listing. */
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