var express = require('express');
var router = express.Router();

const Trip = require('../../models/Trip.js');

router.post('/',(req,res,next)=>{
    const { body } = req;
    let {
        _id,
        userID
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
            function(err){
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

module.exports = router;
