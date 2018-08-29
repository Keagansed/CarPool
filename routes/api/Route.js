// File Type: API endpoint

const express = require('express');

const Carpool = require('../../models/Carpool');
const Offer = require('../../models/Offer');
const Route = require('../../models/Route.js');
const routeMatcher = require('./Util/routeMatcher')
const User = require('../../models/User.js');

// This router handles all API calls that mainly rely on the Route collection.
const router = express.Router();
let verify = require('../middleware/verify.js');

// This method removes a document from the Route collection.
// And removes any offers that use this route and removes a user from the carpool this route is part of.
// Parameters: 
//      routeId: String;  This is the object id of a document from the Route collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.get('/deleteRoute',(req,res,next) =>{
    const { query } = req;
    const { routeId } = query;

    Offer.remove({
        $or: [{SenderRoute: routeId}, {RecieverRoute: routeId}]
    },
    (err) => {
        if(err) {
            return res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            Route.remove({
                _id: routeId
            },
            (err) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: "Database error: " + err,
                    });
                }else{
                    return res.send({
                        success: true,
                        message: "route deleted",
                    });
                }
            });
        }
    });
})

// This method creates a document in the Route collection.
// Parameters: 
//      token: String;  Object id of a document in the User collection.
//      startLocation: String;  Coordinates of the start of the route.
//      endLocation: String;  Coordinates of the end of the route.
//      waypoints: Array;  List of coordinates along the route.
//      time: Time;  The time that you would normally travel the route.
//      routeName; String;  The name of the route.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.use(verify);

router.post('/newRoute',(req,res,next) => {
    const { body } = req;
    const {
        token,
        startLocation,
        endLocation,
        waypoints,
        time,
        routeName
    } = body;

    const newRoute = new Route();
    newRoute.userId = token;
    newRoute.startLocation = startLocation;
    newRoute.endLocation = endLocation;
    newRoute.waypoints = waypoints;
    //newRoute.days = days;
    newRoute.time = time;
    newRoute.routeName = routeName;
    //newRoute.repeat = repeat;
 
    newRoute.save((err) => {
        if(err) {  
            return res.send({
                success: false,
                message: "Database error: " + err,
            });    
        }else{
            return res.send({
                success: true,
                message: "Success: Route Created"
            });
        }
    })

})

// This method gets all documents from the Route collection are for a particular user.
// Parameters: 
//      userId: String;  This is the object id of a document from the Route collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getRoutes',(req,res,next) => {
    const { query } = req;
    const { token } = query;

    Route.find({
        userId: token
    },
    (err,data) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Routes retrieved successfully",
                data: data
            });
        }
    });

})

// This method gets a specific carpool document from the Route collection.
// Parameters: 
//      _id: String;  This is the object id of a document from the Route collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getRoute',(req,res,next) => { 
    const { query } = req;
    const { routeId } = query;

    Route.find({
        _id: routeId
    },
    (err,data) => {
        if(err){
            res.send({
                success: false,
                message: "Database error: " + err,
            })
        }else{
            res.send({
                success: true,
                message: "Route retrieved successfully",
                data: data
            });
        }
    });

})

// This method gets all documents from the Route collection that were not created by a user.
// Parameters: 
//      token: String;  This is the object id of a document from the User collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getOtherRoutes',(req,res,next) => {  
    const { query } = req;
    const { token } = query;

    Route.find({
        userId: {$ne: token}
    },
    (err,data) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Routes retrieved successfully",
                data: data
            });
        }
    });
})

// This method updates the routesCompared field of a document in the Route collection.
// Parameters: 
//      _id: String;  This is an object id of a document in the Route collection.
//		arrRouteId: Array;  This is a list of object ids of documents in the Route collection values that should be added to the field.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updateRoutesCompared',(req,res,next) => {  
    const { body } = req;
    const { arrRouteId, _id } = body;

    Route.update({
        _id: _id 
    },{
        $push:{
            routesCompared:{$each:arrRouteId}
        }
    },
    (err) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Successfully updated Routes Compared",
            });
        }
    });
})

// This method updates the recommendedRoutes field of a document in the Route collection.
// Parameters: 
//      _id: String;  This is an object id of a document in the Route collection.
//		arrRouteId: Array;  This is a list of object ids of documents in the Route collection values that should be added to the field.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updateRecommendedRoutes',(req,res,next) => {  
    const { body } = req;
    const { arrRouteId, _id } = body;

    Route.update({
        _id: _id 
    },{
        $push:{
            recommended:{$each:arrRouteId}
        }
    },
    (err) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Successfully updated Recommended Routes",
            });
        }
    });
})

router.get('/getRecommendedRoutes', async (req,res,next) => {
    const { query } = req;
    const { token, routeId } = query;    

    const obj = await routeMatcher.getRecommendedRoutes(token, routeId);

    if(obj) {

        let promiseArr = [];
        //make all the individual requests
        for (let index = 0; index < obj.recommendedRoutes.length; index++) {
            promiseArr.push(
                User.find({
                    _id: obj.recommendedRoutes[index].userId,
                })
            )
        }
   
        Promise.all(promiseArr)
        .then( 
            //and only when they ALL have returned successfully 
            data => {            
                //update all your state at once
                data.forEach((item, index) => {
                    obj.recommendedRoutes[index].userObj = item[0]
                });
         
            },err => {
                //or return an error-message if anyone fails
                res.status(500).send({
                    success: false,
                    message: "An error occured fetching Users: "+err,
                });
            }        
        )
        .then(()=>{
            return res.status(200).send({
                success: true,
                message: "Successfully retrieved Recommended Routes/Carpools",
                obj: obj,
            });
        })
        
    }else {
        res.status(500).send({
            success: false,
            message: "Failed to retrieve Recommended Routes/Carpools",
        });
    }
})
module.exports = router;