var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
// var session = require('express-session');
var session = require('client-sessions');

var configDB = require('./config/database')

console.log("IN APP JS");
// Requiring DB from database.js
var db = require('./models/index');
// DB has all models
// console.log(db.sequelize.models);

// Verifying the DB connection has been made
db.sequelize.authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function(err) {
        console.log('Unable to connect to the database:', err);
    });
// Force migrations, dropping && creating tables
db.sequelize.sync({
    // force: true
})
    .then(function(err) {
        console.log('It worked!');
    }, function(err) {
        console.log('An error occurred while creating the table:', err);
    });
console.log("POST DB SYNC APP JS");


var sequelize = require('sequelize-heroku').connect();
if (sequelize) {
    sequelize.authenticate().then(function() {
        var config = sequelize.connectionManager.config;
        console.log('sequelize-heroku: Connected to ' + config.host + ' as ' + config.username + '.');

        sequelize.query('SELECT 1+1 as test').then(function(res) {

            console.log('1+1=' + res[0].test);

        });

    }).catch(function(err) {
        var config = sequelize.connectionManager.config;
        console.log('Sequelize: Error connecting ' + config.host + ' as ' + config.user + ': ' + err);
    });
} else {
    console.log('No environment variable found.');
}

// seed the DB
// var faker = require('faker');
// var seed = function seed() {
//     var users = ["Frank", "John", "Joe"]
//     for (var i = users.length - 1; i >= 0; i--) {
//         console.log("iterations remaining: ", i);

//         var fakeEmail = faker.internet.email();
//         var fakePw = faker.internet.password();
//         var listTypes = ["Wish", "Favorite", "Dislike"];
//         var listNames = ["My Wishlist", "My Favs", "My Dislike"];
//         var titles = ["The Great Gatsby", "Cujo", "As I Lay Dying"];
//         var authors = ["F. Scott Fitzgerald", "Stephen King", "Ernest Hemingway"];

//         db.User.create({
//                 email: fakeEmail,
//                 password: fakePw
//             })
//             .then(function createUserSuccess(user) {
//                 console.log("new user created:", user);

//                 var list = db.List.create({
//                         name: listNames[i],
//                         type: listTypes[i],
//                         UserId: user.id
//                     })
//                     .then(function createListSuccess(list) {
//                         console.log("new list created:", list);

//                         var book = db.Book.create({
//                                 title: titles[i],
//                                 author: authors[i],
//                                 ListId: list.id
//                             })
//                             .then(function createBookSuccess(book) {
//                                 console.log("new book created:", book);
//                             })
//                     })
//             })
//     };
// }
// seed();

// Routes
// require('./app/routes.js') (app, passport); // load our routes and pass in our app and fully configured passport

var routes = require('./routes/index');
var users = require('./routes/users');
var sessions = require('./routes/sessions');
var books = require('./routes/books');
var lists = require('./routes/lists');

var port = process.env.PORT || '3000';

var app = express();

// view engine setup - set path and choose Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev')); // log requests to console
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({
    extended: true
})); // get info from HTML forms
app.use(cookieParser()); // read cookies (for auth)
app.use(express.static(path.join(__dirname, 'public')));

// using client-sessions for auth
app.use(session({
    cookieName: 'session',
    secret: process.env.NODE_PW,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

// Specify routes for routes
app.use('/', routes);
// app.use('/users', users);
// app.use('/sessions', sessions);
// app.use('/books', books);
// app.use('/lists', lists);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;