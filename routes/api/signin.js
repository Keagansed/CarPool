var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');
const UserSession = require('../../models/UserSessions.js');

router.post('/',(req,res,next)=>{
	const { body } = req;
	const{
		password
	} = body;
	let { email } = body;

	if(!email){
		return res.send({ 
			success:false,
			message:"Error: Email cannot be blank!"
		});
	}
	if(!password){
		return res.send({ 
			success:false,
			message:"Error: Password cannot be blank!"
		});
	}
	email = email.toLowerCase();

	User.find({
		email:email
	},(err, users)=>{
		if(err){
			return res.send({ 
				success:false,
				message:"Error: Server Error"
			});
		}
		if(users.length != 1){
			return res.send({ 
				success:false,
				message:"Error: Invalid email "
			});
		}

		const user = users[0];
		if(!user.validPassword(password)){
			return res.send({ 
				success:false,
				message:"Error: Invalid password "
			});
		}

		//create user session
		const userSession = new UserSession();
		userSession.userId = user._id;
		userSession.save((err,user)=>{
			if(err){
				return res.send({
					success:false,
					message:"Error:Server error"
				});
			}
			return res.send({
				success:true,
				message:"Valid sign in",
				token: userSession.userId 
			});
		});
	});


});

module.exports = router;