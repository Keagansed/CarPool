var mongoose = require('mongoose');

var OffersSchema = new mongoose.Schema({
	CarpoolName:{
		type:String,
		required:true
	},
	SenderID:{
		type:String,
		required:true
    },
    SenderRoute:{
        type:String,
		required:true
    },
    RecieverID:{
        type:String,
        required:true
    },
    RecieverRoute:{
        type:String,
		required:true
    },
    //this is set to true if joining an existing carpool
    JoinRequest:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('offers', OffersSchema);