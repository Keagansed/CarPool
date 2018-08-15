var express = require('express');
var router = express.Router();

const Trip = require('../../models/Trip.js');

// This method handles a users respons to a trip.
// Parameters: 
//      _id: String;  This is an object id of a Trip collection.
//      token: String;  This is the user who is responding to the trip.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/',(req,res,next) => {
    const { body } = req;
    let {
        _id,
        token
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
        users[token] = true;

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
            function(err) {
                if(err) {
                    return res.send({
                        success:false,
                        message:"Error did not respond"
                    });
                }else{
                    return res.send({success:true});
                }
            }
        );
    });
});

module.exports = router;
