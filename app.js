let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose'); //============== Connect to mongodb ============

const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/api/signup');
const signInRouter = require('./routes/api/signin');
const verifyRouter = require('./routes/api/verify');
const logoutRouter = require('./routes/api/logout');
const vouchRouter = require('./routes/api/vouch');
const profileRouter = require('./routes/api/profile');
const uploadRouter = require('./routes/api/uploadFile');
const getImageRouter = require('./routes/api/getImage');
const routesRouter = require('./routes/api/route');
const tripsRouter = require('./routes/api/trip');
const carpoolRouter = require('./routes/api/carpool');
const offerRouter = require('./routes/api/offers');

let app = express();

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
app.use('/api/account/vouch', vouchRouter)
app.use('/api/account/profile', profileRouter)
app.use('/api/account/uploadFile', uploadRouter)
app.use('/api/account/getImage', getImageRouter)
app.use('/api/system/route', routesRouter)
app.use('/api/system/trip', tripsRouter)
app.use('/api/system/carpool', carpoolRouter)
app.use('/api/system/offers', offerRouter)

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