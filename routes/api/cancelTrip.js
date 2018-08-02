// File Type: API Endpoint

// Variable to use express
let express = require('express');

// Variable to use express router
let router = express.Router();

// Variable to store trip model
const Trip = require('../../models/Trip.js');

router.post('/',(req,res,next)=>{
    // Variable to store the body of the API call
    const { body } = req;

    // Variables to store object ID and userID that were sent in the API call
    let {
        _id,
        userID
    } = body;

    // String to store trip name
    let tripName;

    // String to store the ID of the person who is cancelling the trip
    let idBy;

    // Date to store the date and time of the trip
    let dateTime;

    // Array to store which days the trip is on
    let days;

    // Array to store the users involved in the trip
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
            {
                $set:
                    {
                        "tripName":tripName,
                        "idBy":idBy,
                        "dateTime":dateTime,
                        "days":days,
                        "users":users
                    }
            },
            {
                upsert: true
            },
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
