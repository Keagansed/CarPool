let mongoose = require('mongoose');

let CarpoolSchema = new mongoose.Schema({
    carpoolName:{
        type:String,
        required:true
    },
    routes: {
        type: [],
        required:true
    },
    groupChatID: {
        type: String,
        required:false
    }
});

module.exports = mongoose.model('carpools', CarpoolSchema);