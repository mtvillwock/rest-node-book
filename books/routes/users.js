// var models = require('../models');
// var validator = require('validator');
// var passport = require('passport');
// console.log("USER JS ROUTES FILE")
// console.log(models.User);
// console.log("USER JS ROUTES FILE")
// var express = require('express');
// var router = express.Router();

// /////////////////
// // Users
// /////////////////
// // Get form for new user
// router.get('/users/new', function(req, res, next) {
//     res.render('register', {
//         title: 'Register'
//     });
// });

// // Post Users - create user in DB
// router.post('/users', function(req, res, next) {
//     console.log("request is:", req.body);
//     var body = req.body;
//     models.User.create({
//         email: body["email"],
//         password: body["password"]
//     })
//         .then(function createUserSuccess(user) {
//             console.log(user.get('email'));
//             console.log(user.get('password'));
//         }, function createUserError(err) {
//             console.log("error is:", err);
//         })
//     res.redirect('/users');
// });

// // Delete Session - Logout user
// router.delete('/sessions/:id', function(req, res, next) {
//     console.log(req.body);
// });


// router.get('/users', function(req, res, next) {
//     models.User.findAll()
//         .then(function(users) {
//             res.render('users/index', {
//                 title: "Users Index",
//                 users: users
//             });
//         })
//         .error(function(err) {
//             console.log(err);
//         })
// });

// router.route('/users/:user_id')
//     .get(function(req, res) {
//         // get a user
//     })

// .put(function(req, res) {
//     // update a user
// })

// .delete(function(req, res) {
//     // destroy a user
// })


// module.exports = router;
