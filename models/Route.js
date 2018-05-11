var mongoose = require('mongoose');

var RouteSchema = new mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	startLocation:{
		type:String,
		required:true
	},
	endLocation:{
		type:String,
		required:true
	},
	days: { 
		type:Object, 
        required: true
	},
	time:{
		type:String,
		default:'00:00',
		required:true
	},
	routeName:{
		type:String,
		default:'',
		required:true
    },
    repeat:{
        type: Boolean,
        default: false,
        required:true
    }
});

module.exports = mongoose.model('routes', RouteSchema);