var mongoose = require('mongoose');

var RouteSchema = new mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	startLocation:{
		type:Object,
		required:true
	},
	endLocation:{
		type:Object,
		required:true
	},
	waypoints:{
		type:Array,
		default: [],
		require:true
	},
	days: { 
		type:Object,
		default: {}, 
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
	},
	recommended:{
		type:Array,
		default:[],
		required:true
	},
	routesCompared:{
		type:Array,
		default:[],
		required:true
	}
});

module.exports = mongoose.model('routes', RouteSchema);