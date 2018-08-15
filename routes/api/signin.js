// File Type: API endpoint

const express = require('express');

const User = require('../../models/User.js');
const UserSession = require('../../models/UserSessions.js');

// This router handles the signin of the users
const router = express.Router();

// This method creates a document in the userSession collection and checks if the user exists in the User collection.
// Parameters: 
//      email: String;  This is the email of the user trying to log in.
//		password: String;  This is the password of the user trying to log in.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          token: String; The object id of the user in the User collection.
router.post('/',(req,res,next)=>{
	const { body } = req;
	const{ password } = body;
	let { email } = body;

	if(!email) {
		return res.send({ 
			success:false,
			message:"Input error: Email cannot be blank!"
		});
	}
	if(!password) {
		return res.send({ 
			success:false,
			message:"Input error: Password cannot be blank!"
		});
	}
	email = email.toLowerCase();

	User.find({
		email:email
	},(err, users) => {
		if(err) {
			return res.send({ 
				success:false,
				message:"Database error: " + err,
			});
		}
		if(users.length != 1) {
			return res.send({ 
				success:false,
				message:"Input error: Invalid email "
			});
		}

		const user = users[0];
		if(!user.validPassword(password)) {
			return res.send({ 
				success:false,
				message:"Input error: Invalid password "
			});
		}

		//create user session
		const userSession = new UserSession();
		let date = new Date();
		userSession.userId = user._id;
		userSession.timestamp = date.toDateString();
		userSession.save((err) => {
			if(err) {
				return res.send({
					success:false,
					message:"Database error: " + err,
				});
			}else{
				return res.send({
					success:true,
					message:"Valid sign in",
					token: userSession.userId 
				});
			}
		});
	});
});

module.exports = router;