// File Type: API endpoint

const express = require('express');

const User = require('../../models/User.js');
const UserSession = require('../../models/UserSessions.js');

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
            //first change the user's stored password
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
                        //if successful, create the user session
						//create user session
                        const user = users[0];
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
                                    message:"Valid password reset and sign in",
                                    token: userSession.userId 
                                });
                            }
                        });
					}
				}
            );
		}
	});
});

module.exports = router;