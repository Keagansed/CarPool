var express = require('express');
var router = express.Router();
const Route = require('../../models/Route.js');

router.get('/getOtherRoutes',(req,res,next) => {
    
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

router.get('/getUserRoutes',(req,res,next) => {

    const { query } = req;
    const { userId, routeId } = query;
    Route.find(
        {
            userId: userId,
            _id: routeId
        },
        (err,data) => {
            if(err){
                return res.send({
                    success: false,
                    message:"Failed to retrieve route"
                })
            }
            return res.send({
                success: true,
                message: "Routes retrieved successfully",
                data: data
            })
        });
})

module.exports = router;