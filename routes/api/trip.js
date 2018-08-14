// File Type: API endpoint

let express = require('express');

const Trip = require('../../models/Trip.js');
let verify = require('../middleware/verify.js');

// This router handles all API calls that only rely on the Trip collection.
let router = express.Router();

// This method creates a document in the Trip collection.
// Parameters: 
//      tripName: String;  This is the name for the new trip.
//		carpoolID: String;  Object id of a document in the Carpool collection.
//      idBy: String;  Object id of the creator of the trip.
//      dateTime: dateTime;  Date and time of when the trip will take place.
//      days: Array;  The days the trip will repeat if repeating trip.
//      users: Array;  List of object ids of the users that are part of the trip.
//      driver: String;  Object id of the user that will be the driver for the trip.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.use(verify);

router.post('/addTrip',(req,res,next)=>{
    const { body } = req;
    const {
        tripName,
        carpoolID,
        idBy,
        dateTime,
        days,
        users,
        driver
    } = body;

    if(!tripName) {
        return res.send({
            success:false,
            message:"Error: Carpool name cannot be blank!"
        });
    }
    if(!carpoolID) {
        return res.send({
            success:false,
            message:"Error: CarpoolID cannot be blank!"
        });
    }
    if(!dateTime) {
        return res.send({
            success:false,
            message:"Error: Date cannot be blank!"
        });
    }
    if(!days) {
        return res.send({
            success:false,
            message:"Error: Days cannot be blank!"
        });
    }
    if(!users) {
        return res.send({
            success:false,
            message:"Error: Users cannot be blank!"
        });
    }
    if(!driver) {
        return res.send({
            success:false,
            message:"Error: Driver cannot be blank!"
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
    newTrip.save((err,trip) => {
        if(err) {
            return res.send({
                success:false,
                message:"Error: Server error"
            });
        }else{
            return res.send({
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
        tripName = data[0].tripName;
        idBy = data[0].idBy;
        dateTime = data[0].dateTime;
        days = data[0].days;
        users = data[0].users;
        users[token] = false;

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
                        message:"Error did not cancel"
                    });
                else
                    return res.send({success:true});
            }
        );
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
                message:"Error: Server Error"
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
            res.json(data);
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
        res.json(data);
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
                    return res.send({
                        success:false,
                        message:"Error did not respond"
                    });
                }else{
                    return res.send({success:true});
                }
            }
        );
    });
});

module.exports = router;