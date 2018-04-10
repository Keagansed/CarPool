var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); //============== Connect to mongodb ============

var indexRouter = require('./routes/index');
let signUpRouter = require('./routes/api/signup.js');
let signInRouter = require('./routes/api/signin.js');
let verifyRouter = require('./routes/api/verify.js');
let logoutRouter = require('./routes/api/logout.js');
let submitVouchRouter = require('./routes/api/submitVouch.js');
let getVouchesRouter = require('./routes/api/getVouches.js');
let getProfileRouter = require('./routes/api/getProfile.js');
let uploadRouter = require('./routes/api/uploadFile.js');
let getImageRouter = require('./routes/api/getImage.js');
let getAllUsersRouter = require('./routes/api/getAllUsers.js');
let getUserRouter = require('./routes/api/getUser.js');

var app = express();

mongoose.connect('mongodb://localhost/carpool'); //========== Define db ================
mongoose.connection.on('open', function() {
	console.log('Mongoose connected');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/account/signup', signUpRouter)
app.use('/api/account/signin', signInRouter)
app.use('/api/account/verify', verifyRouter)
app.use('/api/account/logout', logoutRouter)
app.use('/api/account/submitVouch', submitVouchRouter)
app.use('/api/account/getVouches', getVouchesRouter)
app.use('/api/account/getProfile', getProfileRouter)
app.use('/api/account/uploadFile', uploadRouter)
app.use('/api/account/getImage', getImageRouter)
app.use('/api/account/getAllUsers', getAllUsersRouter)
app.use('/api/account/getUser', getUserRouter)

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


module.exports = app;