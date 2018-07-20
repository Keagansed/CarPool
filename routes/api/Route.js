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
        if(err){  
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
    Route.find({
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
    Route.find({
        _id: _id
    },
    (err,data) => {
        if(err){
            return res.send({
                success: false,
                message: "error, Route not found"
            })
        }
        res.send({
            success: true,
            message: "Route retrieved successfully",
            data: data
        })
    });

})

router.get('/getOtherRoutes',(req,res,next) => {  
    const { query } = req;
    const { userId } = query;
    Route.find({
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
        if(err){
            res.send({
                success: false,
                message: "Could not update Routes Compared",
            })
        } else{
            res.send({
                success: true,
                message: "Successfully updated Routes Compared",
            })
        }
    });
})

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
        if(err){
            res.send({
                success: false,
                message: "Could not update Recommended Routes",
            })
        } else{
            res.send({
                success: true,
                message: "Successfully updated Recommended Routes",
            })
        }
    });
})
module.exports = router;