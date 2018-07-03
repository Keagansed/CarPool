let express = require('express');
let router = express.Router();
const Trip = require('../../models/Trip.js');

router.post('/',(req,res,next)=>{
    const { body } = req;
    const{
        idBy,
        dateTime,
        days,
        users
    } = body;

    if(!dateTime){
        return res.send({
            success:false,
            message:"Error: Date cannot be blank!"
        });
    }
    if(!days){
        return res.send({
            success:false,
            message:"Error: Days cannot be blank!"
        });
    }
    if(!users){
        return res.send({
            success:false,
            message:"Error: Users cannot be blank!"
        });
    }

    const newTrip = new Trip();
    newTrip.idBy = idBy;
    newTrip.dateTime = dateTime;
    newTrip.days = days;
    newTrip.users = users;
    newTrip.save((err,trip)=>{
        if(err){
            return res.send({
                success:false,
                message:"Error: Server error"
            });
        }
        return res.send({
            _id:newTrip._id,
            success:true,
            message:"Success: Added trip"
        });
    });
});

module.exports = router;