let express = require('express');
let router = express.Router();
const Trip = require('../../models/Trip.js');

router.post('/',(req,res,next)=>{
    const { body } = req;
    const{
        tripName,
        carpoolID,
        idBy,
        dateTime,
        days,
        users,
        driver
    } = body;

    if(!tripName){
        return res.send({
            success:false,
            message:"Error: Carpool name cannot be blank!"
        });
    }
    if(!carpoolID){
        return res.send({
            success:false,
            message:"Error: CarpoolID cannot be blank!"
        });
    }
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
    if(!driver){
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