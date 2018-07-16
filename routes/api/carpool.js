var express = require('express');
var router = express.Router();

const Carpool = require('../../models/Carpool.js');

router.get('/getCarpool', function(req, res, next) {
    const { query } = req;
    const { _id } = query;
    Carpool.find({_id : _id},
        (err,data)=>{
            if (err){
                return res.send({
                    success: false,
                    message: err
                });
            }
            else{
                res.send({
                    success: true,
                    message: "Carpool retrieved successfully",
                    data: data
                })
            }
        });
});

module.exports = router;
