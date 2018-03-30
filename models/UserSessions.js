var mongoose = require('mongoose');

var UserSessionSchema = new mongoose.Schema({
	userId:{
		type: String,
		defaut: ""
	},
	timestamp:{
		type: Date,
		defaut:Date.now()
	},
	isDeleted:{
		type:Boolean,
		default:false
	}
});


module.exports = mongoose.model('userSession', UserSessionSchema);