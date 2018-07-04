let mongoose = require('mongoose');

let CarpoolSchema = new mongoose.Schema({
    carpoolName:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    longFrom:{
        type:String,
        required:true
    },
    latFrom:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    longTo:{
        type:String,
        required:true
    },
    latTo:{
        type:String,
        required:true
    },
    users: {
        type: [],
        required:true
    }
});

module.exports = mongoose.model('carpools', CarpoolSchema);