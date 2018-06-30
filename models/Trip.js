let mongoose = require('mongoose');

let TripSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('trips', TripSchema);