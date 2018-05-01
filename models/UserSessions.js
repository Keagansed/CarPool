var mongoose = require('mongoose');

var UserSessionSchema = new mongoose.Schema({
	userId:{
		type: String,
		defaut: ""
	},
	timestamp:{
		type: String,
	}
});


module.exports = mongoose.model('userSession', UserSessionSchema);