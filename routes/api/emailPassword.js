// File Type: API endpoint

const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
		}else if(users.length != 1) {
			return res.send({ 
				success:false,
				message:"Input error: Invalid email "
			});
        }else{
			//generate reset password token
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');

				//save reset password token
				User.findOneAndUpdate({
					email: email
				},
					{$set:{
						ResetPasswordToken : token
						}
					},
					{upsert: true},
					(err)=>{
						if (err) {
							return res.send({
								success:false,
								message:"Database error: " + err,
							});
						}
					}
				);
				//send email with reset password link
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'iminsys.carpool@gmail.com',
						pass: 'L1zD@nM@r'
					}
				});
				const mailOptions = {
					from: 'iminsys.carpool@gmail.com',
					to: email,
					subject: 'Carpool Password Reset',
					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
						'https://carpool.iminsys.com/reset/' + token + '\n\n' +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};
				transporter.sendMail(mailOptions, function (err, info) {
					if(err){
						return res.send({ 
							success:false,
							message:"Error sending email"
						});
					}else{
						return res.send({ 
							success:true,
							message:"Email sent"
						});
					}
				});
			});
		}
	});
});

module.exports = router;