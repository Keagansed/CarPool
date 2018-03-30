// import mongoose from 'mongoose';
var mongoose =require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	firstName:{
		type:String,
		default:'',
		required:true
	},
	lastName:{
		type:String,
		default:'',
		required:true
	},
	email:{
		type:String,
		default:'',
		required:true
	},
	id:{
		type:String,
		default:'',
		required:true
	},
	password:{
		type:String,
		default:'',
		required:true
	}
});

UserSchema.methods.generateHash= function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('users', UserSchema);
