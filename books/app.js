var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

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

// Routes
// require('./app/routes.js') (app, passport); // load our routes and pass in our app and fully configured passport

var routes = require('./routes/index');
var users = require('./routes/users');
var sessions = require('./routes/sessions');
var books = require('./routes/books');
var lists = require('./routes/lists');

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

// required for passport
app.use(session({
    secret: 'mysecret'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


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