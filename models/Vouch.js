var mongoose = require('mongoose');

var VouchSchema = new mongoose.Schema({
	tripID:{
		type:String,
		required:true
	},
	idBy:{
		type:String,
		required:true
	},
	idFor:{
		type:String,
		required:true
	},
	rating:{
		type:Number,
		required:true
	},
	date: { 
		type: Date, 
		default: Date.now 
	},
	reviewBody:{
		type:String,
		default:'',
		required:true
	}
});

module.exports = mongoose.model('vouches', VouchSchema);