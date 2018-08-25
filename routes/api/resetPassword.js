// File Type: API endpoint

const express = require('express');
const crypto = require('crypto');

const User = require('../../models/User.js');

const router = express.Router();

router.post('/',(req,res,next)=>{
	const { body } = req;
	let { token, password } = body;
	User.find({
		ResetPasswordToken: token
	},(err, users) => {
		if(err) {
			return res.send({
				success:false,
				message:"Database error: " + err,
			});
		}else if(users.length != 1) {
			return res.send({ 
				success:false,
				message:"Input error: Invalid Reset Password Token "
			});
        }else{
			password = users[0].generateHash(password);
			User.findOneAndUpdate({
				ResetPasswordToken: token
			},
				{$set:{
					password : password
					}
				},
				{upsert: true},
				(err)=>{
					if (err) {
						return res.send({
							success:false,
							message:"Database error: " + err,
						});
					}else{
						return res.send({success:true});
					}
				}
			);
		}
	});
});

module.exports = router;