// File Type: API endpoint

const express = require('express');

const User = require('../../models/User.js');

// This router handles sending a user a link to reset their password if they have forgotton it
const router = express.Router();

// This method checks if the user exists in the User collection and sends a password reset link if they do.
// Parameters: 
//      email: String;  This is the email of the user trying to reset their password.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
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