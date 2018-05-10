var express = require('express');
var router = express.Router();
const Route = require('../../models/Route.js');

router.post('/newRoute',(req,res,next) => {
    const { body } = req;

    const {
        userId,
        startLocation,
        endLocation,
        days,
        time,
        routeName,
        repeat
    } = body;

    const newRoute = new Route();
    newRoute.userId = userId;
    newRoute.startLocation = startLocation;
    newRoute.endLocation = endLocation;
    newRoute.days = days;
    newRoute.time = time;
    newRoute.routeName = routeName;
    newRoute.repeat = repeat;
 
    newRoute.save((err, route) => {
        if(err)
        {
            
            return res.send({
                success:false,
                message:"Error: Server error"
            });
            
        }

        return res.send({
            success:true,
            message:"Success: Route Created"
        });
    })

})

router.post('/getRoutes',(req,res,next) => {
    
    const { query } = req;
    const { userId } = query;
    Route.find(
    {
        userId: userId
    },
    (err,data) => {
        res.json(data);
    });

})

module.exports = router;