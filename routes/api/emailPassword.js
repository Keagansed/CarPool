// File Type: API endpoint

const express = require('express');

const User = require('../../models/User.js');
const UserSession = require('../../models/UserSessions.js');

// This router handles sending a user a link to reset their password if they have forgotton it
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
	let { email } = body;

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
        return res.send({ 
            success:true,
            message:"Email sent"
        });
	});
});

module.exports = router;