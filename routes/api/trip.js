// File Type: API endpoint

let express = require('express');

const Trip = require('../../models/Trip.js');
const Carpool = require('../../models/Carpool.js');
const Route = require('../../models/Route.js');

let routeTree = require('./Util/optimalTrip.js');
let recurringTrips = require('./Util/recurringTrips.js')
let verify = require('../middleware/verify.js');

// This router handles all API calls that only rely on the Trip collection.
let router = express.Router();

router.use(verify);


// This method gets a Full trip with all details from Carpools and Routes
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
// Return Value:
//      Response containing: 
//          data: JSON object of the first route in the Trip == TEMP!!!!!!
router.get('/getAllTripInfo', function(req, res, next) {
    const { query } = req;
    const { _id } = query;

    Trip.find({
        _id : _id
    },(err,tripData) => {        
        if(err) {
            return res.send({
                success:false,
                message:"Database error: " + err,
            });
        }else{

            Carpool.find({ _id: tripData[0].carpoolID },
                (err, carpoolData) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Database error: " + err,
                        });
                    } else {                        
                        Route.find({
                            _id: carpoolData[0].routes[0].id
                        },
                        (err,routeData) => {
                            if(err){
                                return res.send({
                                    success: false,
                                    message: "Database error: " + err,
                                })
                            }else{
                                res.send({
                                    success: true,
                                    message: "Route retrieved successfully",
                                    routeData: routeData,
                                    tripData: tripData

                                });
                            }
                        });

                    }
                });
        }
    });
});

// This method creates a document in the Trip collection.
// Parameters: 
//      tripName: String;  This is the name for the new trip.
//		carpoolID: String;  Object id of a document in the Carpool collection.
//      idBy: String;  Object id of the creator of the trip.
//      dateTime: dateTime;  Date and time of when the trip will take place.
//      users: Array;  List of object ids of the users that are part of the trip.
//      driver: String;  Object id of the user that will be the driver for the trip.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/addTrip',(req,res,next)=>{
    const { body } = req;
    const {
        tripName,
        carpoolID,
        idBy,
        dateTime,
        days,
        users,
        driver,
        optimalTrip,
    } = body;
    const recurringId = Math.random();

    if(!tripName) {
        return res.send({
            success:false,
            message:"Input error: Carpool name cannot be blank!"
        });
    }
    if(!carpoolID) {
        return res.send({
            success:false,
            message:"Input error: CarpoolID cannot be blank!"
        });
    }
    if(!dateTime) {
        return res.send({
            success:false,
            message:"Input error: Date cannot be blank!"
        });
    }
    if(!days) {
        return res.send({
            success:false,
            message:"Input error: Days cannot be blank!"
        });
    }
    if(!users) {
        return res.send({
            success:false,
            message:"Input error: Users cannot be blank!"
        });
    }
    if(!driver) {
        return res.send({
            success:false,
            message:"Input error: Driver cannot be blank!"
        });
    }
    if(!optimalTrip.length > 0) {
        return res.send({
            success:false,
            message:"Input error: No optimal trip!"
        });
    }

    const newTrip = new Trip();
    newTrip.tripName = tripName;
    newTrip.carpoolID = carpoolID;
    newTrip.idBy = idBy;
    newTrip.dateTime = dateTime;
    newTrip.days = days;
    newTrip.users = users;
    newTrip.driver = driver;
    newTrip.recurringId = recurringId;
    newTrip.optimalTrip = optimalTrip;    
    newTrip.save((err,trip) => {
        if(err) {
            return res.send({
                success:false,
                message:"Database error: " + err,
            });
        }else{
            return res.send({
                trip:newTrip,
                _id:newTrip._id,
                success:true,
                message:"Success: Added trip"
            });
        }
    });
});

// This method removes a document from the Trip collection.
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
//		token: String;  Object id of the user canceling the trip.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/cancelTrip',(req,res,next)=>{
    const { body } = req;
    let {
        _id,
        token
    } = body;
    let tripName;
    let idBy;
    let dateTime;
    let days;
    let users = [];

    Trip.find({
        _id:_id,
    },(err,data) => {
        if (err){
            return res.send({
                success:false,
                message:"Database error: " + err,
            });
        }else{
            tripName = data[0].tripName;
            idBy = data[0].idBy;
            dateTime = data[0].dateTime;
            days = data[0].days;
            users = data[0].users;
            users[userID] = false;

            Trip.findOneAndUpdate(
                {"_id": _id},
                {$set:{
                    "tripName":tripName,
                    "idBy":idBy,
                    "dateTime":dateTime,
                    "days":days,
                    "users":users
                }
                },
                {upsert: true},
                function(err) {
                    if (err)
                        return res.send({
                            success:false,
                            message:"Database error: " + err,
                        });
                    else
                        return res.send({success:true});
                }
            );
        }
    });
});

// This method removes a document from the Trip collection.
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.get('/deleteTrip', function(req, res, next) {
    const { query } = req;
    const { tripId } = query;

    Trip.remove({
        _id:tripId,
    },(err) => {
        if(err) {
            return res.send({
                success:false,
                message:"Database error: " + err,
            });
        }else{
            return res.send({
                success:true,
                message:"Deleted Trip"
            });
        }
    });
});

// This method gets a document from the Trip collection.
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
// Return Value:
//      Response containing: 
//          data: JSON object;  Contains the result of the DB query.
router.get('/getTrip', function(req, res, next) {
    const { query } = req;
    const { _id } = query;

    Trip.find({
        _id : _id
    },(err,data) => {
        if(err) {
            return res.send({
                success:false,
                message:"Database error: " + err,
            });
        }else{
            return res.send({
                success:true,
                data: data,
            });
        }
    });
});

// This method gets all the documents from the Trip collection for a particular user.
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
// Return Value:
//      Response containing: 
//          data: JSON object;  Contains the result of the DB query.
router.get('/getTrips', function(req, res, next) {
    const { query } = req;
    const { token } = query;

    Trip.find({['users.' + token]:true},
        (err,data)=>{
            if(err) {
                return res.send({
                    success:false,
                    message:"Database error: " + err,
                });
            }else{
                return res.send({
                    success: true,
                    data: data,
                });
            }
    });
});

// This method handles a users respons to a trip.
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
//      token: String;  This is the user who is responding to the trip.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/respondToTrip',(req,res,next) => {
    const { body } = req;
    let {
        _id,
        token
    } = body;
    let tripName;
    let idBy;
    let dateTime;
    let days;
    let users = [];

    Trip.find({
        _id:_id,
    },(err,data)=>{
        tripName = data[0].tripName;
        idBy = data[0].idBy;
        dateTime = data[0].dateTime;
        days = data[0].days;
        users = data[0].users;
        users[token] = true;

        Trip.findOneAndUpdate(
            {"_id": _id},
            {$set:{
                "tripName":tripName,
                "idBy":idBy,
                "dateTime":dateTime,
                "days":days,
                "users":users
            }
            },
            {upsert: true},
            function(err) {
                if(err) {
                    return res.status(500).send({
                        success:false,
                        message:"Database error: " + err,
                    });
                }else{
                    return res.status(200).send({success:true});
                }
            }
        );
    });
});

router.get('/getFilteredTrips', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    Trip.find({['users.' + token]:true}, async (err,data) => {            
        if(!err) {
            let updatedTrips = await recurringTrips.updateTrips(data);  
            if(typeof updatedTrips !== "undefined"){
                return res.status(200).send({
                    success:true,
                    message:"Successfully retrieved filtered trips",
                    data: updatedTrips                                            
                });
            }else {
                return res.status(500).send({
                    success:false,
                    message:"Failed to retrieve filtered trips",
                });
            }
        }            
    });
});

router.post('/optimalTrip', async (req, res) => {
    const { body } = req;
    const { carpoolID, users, driverId } = body;

    if((carpoolID === "") || (users === null) || (driverId === "")) {
        return res.status(500).send({
            success: false,
            message:"Invalid parameters",
        });
    }

    let rUsers = [];
    let carpoolPromiseArr = [];
    let routePromiseArr = [];

     
    carpoolPromiseArr.push( Carpool.findOne({ 
        _id: carpoolID 
    }));

    await Promise.all(carpoolPromiseArr)
    .then(
        (data) => {            
            data.forEach((carpool) => {

                let { routes } = carpool;
                 
                routes.forEach(route => {
                    if(users.includes(route.userId)) {

                        routePromiseArr.push(Route.findOne({ 
                            _id: route.id 
                        }));
                    }
                }); 
                
            })           
        }, (err) => {
            return res.status(500).send({
                success: false,
                message:"Failed to retrieve carpool object", err,
            });
        }    
    ) 

    await Promise.all(routePromiseArr)
        .then( 
            (data) => {       
                data.forEach((route) => {
                    let temp = {
                        route: {
                            _id: route.id,
                            startLocation: route.startLocation,
                            endLocation: route.endLocation,
                        },
                        user: {
                            _id: route.userId,
                        }
                    }

                    rUsers.push(temp);
                });

            }, (err) => {
                return res.status(500).send({
                    success: false,
                    message:"Failed to retrieve route objects",
                });
            }
        )
        .then(async () => {

            if(rUsers.length > 1) {
                let AI = new routeTree(rUsers, driverId);
                let optimalTrip = await AI.calcOptimalRoute();

                if(optimalTrip !== null) {
                    return res.status(200).send({
                        success: true,
                        message: "Successfully created optimal trip",
                        optimalTrip,
                    });
                }

            }else {
                return res.status(500).send({
                    success: false,
                    message: "Could not create user/route object"
                });
            }
        })

});

module.exports = router;