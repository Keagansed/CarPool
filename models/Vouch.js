var mongoose = require('mongoose');

var VouchSchema = new mongoose.Schema({
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
	reviewTitle:{
		type:String,
		default:'',
		required:true
	},
	reviewBody:{
		type:String,
		default:'',
		required:true
	}
});

module.exports = mongoose.model('vouches', VouchSchema);