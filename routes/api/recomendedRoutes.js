var express = require('express');
var router = express.Router();
const Route = require('../../models/Route.js');

router.get('/',(req,res,next) => {
    
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