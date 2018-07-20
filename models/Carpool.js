let mongoose = require('mongoose');

let CarpoolSchema = new mongoose.Schema({
    carpoolName:{
        type:String,
        required:true
    },
    routes: {
        type: [],
        required:true
    }
});

module.exports = mongoose.model('carpools', CarpoolSchema);