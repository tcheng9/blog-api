var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/commentRouter');
var postRouter = require('./routes/postRouter');
const bodyParser = require('body-parser');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Scehma = mongoose.Schema;
const User = require('./models/user');
const session = require("express-session");
var authRouter = require('./routes/authRouter')
const bcrypt = require('bcrypt');
const cors = require("cors");

var app = express();

var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

//Passport strategies
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        // Passwords match, log user in!
        if (res) return done(null, user);
        // Passwords do not match!
        else return done(null, false, { message: "Incorrect password" });
      })
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


/////////MONGO DB SETUP
const mongoPw = process.env.MONGOPW;

const mongoDb = "mongodb+srv://tcheng:" + mongoPw + "@cluster0.c17ee5l.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Passport setup code
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(cors(options));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var PORT = 8080;

app.listen(PORT, function(err){
  if (err) console.log('error in server setup');
  console.log('Server listening on port', PORT)
})

module.exports = app;

