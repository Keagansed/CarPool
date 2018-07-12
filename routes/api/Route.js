var express = require('express');
var router = express.Router();
const Route = require('../../models/Route.js');

router.post('/newRoute',(req,res,next) => {
    const { body } = req;

    const {
        userId,
        startLocation,
        endLocation,
        waypoints,
        //days,
        time,
        routeName,
       // repeat
    } = body;

    const newRoute = new Route();
    newRoute.userId = userId;
    newRoute.startLocation = startLocation;
    newRoute.endLocation = endLocation;
    newRoute.waypoints = waypoints;
    //newRoute.days = days;
    newRoute.time = time;
    newRoute.routeName = routeName;
    //newRoute.repeat = repeat;
 
    newRoute.save((err, route) => {
        if(err)
        {  
            return res.send({
                success: false,
                message: err
            });
            
        }

        return res.send({
            success: true,
            message: "Success: Route Created"
        });
    })

})

router.get('/getRoutes',(req,res,next) => {
    
    const { query } = req;
    const { userId } = query;
    Route.find(
    {
        userId: userId
    },
    (err,data) => {
        res.send({
            success: true,
            message: "Routes retrieved successfully",
            data: data
        })
    });

})

router.get('/getRoute',(req,res,next) => {
    
    const { query } = req;
    const { _id } = query;
    Route.find(
    {
        _id: _id
    },
    (err,data) => {
        res.send({
            success: true,
            message: "Route retrieved successfully",
            data: data
        })
        console.log(data);
    });

})

router.get('/RecomendedRoutes',(req,res,next) => {
    
    const { query } = req;
    const { userId } = query;
    Route.find(
    {
        userId: {$ne: userId}
    },
    (err,data) => {
        res.send({
            success: true,
            message: "Routes retrieved successfully",
            data: data
        })
    });

})

module.exports = router;