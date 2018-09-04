let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose'); //============== Connect to mongodb ============
mongoose.Promise = Promise; //==============  Tell Mongoose to use the native Node.js promise library

var indexRouter = require('./routes/index');
let signUpRouter = require('./routes/api/signup.js');
let signInRouter = require('./routes/api/signin.js');
let emailPasswordRouter = require('./routes/api/emailPassword.js');
let resetPasswordRouter = require('./routes/api/resetPassword.js');
let verifyRouter = require('./routes/api/verify.js');
let logoutRouter = require('./routes/api/logout.js');
let vouchRouter = require('./routes/api/vouch.js');
let profileRouter = require('./routes/api/profile.js');
let uploadRouter = require('./routes/api/uploadFile.js');
let getImageRouter = require('./routes/api/getImage.js');
let routesRouter = require('./routes/api/route.js');
let tripsRouter = require('./routes/api/trip.js');
let carpoolRouter = require('./routes/api/carpool.js');
let offerRouter = require('./routes/api/offers.js');

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
app.use('/api/account/emailPassword', emailPasswordRouter)
app.use('/api/account/resetPassword', resetPasswordRouter)
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



let routeTree = require('./routes/api/Util/optimalTrip.js');

let obj = [
    {
        route: {
            _id : "1",
            waypoints : [
                {lat:-25.813692,lng:28.329799999999977},
                {lat:-25.800726220716065,lng:28.320038924168784},
                {lat:-25.78702042867203,lng:28.307419248974497},
                {lat:-25.783762187173906,lng:28.288399804478104},
                {lat:-25.781116516728808,lng:28.275855098048737},
                {lat:-25.7818819,lng:28.276781099999994}
            ],
            time : "09:00",
            routeName : "Wilds to Menlyn",
            repeat : false,
            recommended : ["5b8e794da898784120a7911e","5b8e794da898784120a7911e"],
            routesCompared : ["5b8e794da898784120a7911e", "5b8e7a35a898784120a79124"],
            userId : "1",
            startLocation : {name : "2 Jagluiperd St, The Wilds, Pretoria, 0042, South Africa", lat : -25.813692, lng : 28.329799999999977},
            endLocation : {name : "Menlyn, Pretoria, 0063, South Africa", lat : -25.7818819, lng : 28.276781099999994}, 
        },
        user: {
            _id : "1",
            firstName : "Michael",
            lastName : "Yatrakos",
        }
    },
    {
        route: {
            _id : "2",
            waypoints : [
                {lat:-25.8206715,lng:28.31269569999995},
                {lat:-25.81037344964342,lng:28.30228672482167},
                {lat:-25.8001788,lng:28.30235790000006}
            ],
            time : "09:00",
            routeName : "Woodhill to Garsfontein",
            repeat : false,
            recommended : [],
            routesCompared : ["5b8e7a35a898784120a79124","5b8e7872a898784120a7911b"],
            userId : "2",
            startLocation : {name : "1143 Woodhill Dr, Garsfontein, Pretoria, 0076, South Africa", lat : -25.8206715, lng : 28.31269569999995},
            endLocation : {name : "Garsfontein, Pretoria, 0042, South Africa", lat : -25.8001788, lng : 28.30235790000006},
        },
        user: {
            _id : "2",
            firstName : "Vernon ",
            lastName : "Francis",
        }
    },
    {
        route: {
            _id : "3",
            waypoints : [
                {lat:-25.838447,lng:28.33971729999996},
                {lat:-25.829434976978302,lng:28.342041129893005},
                {lat:-25.815507072295436,lng:28.337591584344636},
                {lat:-25.80324902574731,lng:28.323011282184098},
                {lat:-25.78987919302422,lng:28.30993397546581},
                {lat:-25.783877088415654,lng:28.29248089932014},
                {lat:-25.780616927807888,lng:28.273456927807956},
                {lat:-25.7818819,lng:28.276781099999994}
            ],
            time : "09:00",
            routeName : "Mooikloof to Menlyn",
            repeat : false,
            recommended : ["5b8e7872a898784120a7911b"],
            routesCompared : ["5b8e7872a898784120a7911b","5b8e794da898784120a7911e"],
            userId : "3",
            startLocation : {name : "Jollify Ring Rd, Mooikloof, Pretoria, 0059, South Africa", lat : -25.838447, lng : 28.33971729999996},
            endLocation : {name : "Menlyn, Pretoria, 0063, South Africa", lat : -25.7818819, lng : 28.276781099999994}, 
        },
        user: {
            _id : "3",
            firstName : "Jessica",
            lastName : "Coetzee",
        }
    },
]

let AI = new routeTree(obj, obj[0].user._id);
let out = AI.calcOptimalRoute();
console.log(out);


module.exports = app;