let mongoose = require('mongoose');

let TripSchema = new mongoose.Schema({
    tripName:{
        type:String,
        required:true
    },
    carpoolID:{
        type:String,
        required:true
    },
    idBy:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true
    },
    days:{
        type: {},
        required:false
    },
    users: {
        type: {},
        required:true
    },
    driver:{
        type:String,
        required:true
    },
    recurringId:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('trips', TripSchema);