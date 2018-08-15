// File Type: API endpoint

const express = require('express');

const User = require('../../models/User.js');
const util = require('./Util/idCheck.js');

// This router handles the signup of a new user
const router = express.Router();

// This method creates a document in the User collection.
// Parameters: 
//		firstName: String;  First name of the new user.
//		lastName: String;  Last name of the new user.
//		id: String;  South African ID number of the new user.
//      email: String;  This is the email of the new user.
//		password: String;  This is the password of the new user.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/',(req,res,next)=>{
	const { body } = req;
	const{
		firstName,
		lastName,
		id,
		password
	} = body;
	let { email } = body;
	
	if(!firstName) {
		return res.send({ 
			success:false,
			message:"Input error:Firstname cannot be blank!"
		});
	}
	if(!lastName) {
		return res.send({ 
			success:false,
			message:"Input error: Last Name cannot be blank!"
		});
	}
	if(!email) {
		return res.send({ 
			success:false,
			message:"Input error: Email cannot be blank!"
		});
	}
	if(!id) {
		return res.send({ 
			success:false,
			message:"Input error: ID cannot be blank!"
		});
	}else if(!util.ValidateIDNumber(id)) {
		return res.send({ 
			success:false,
			message:"Input error: ID invalid!"
		});
	}else if(!util.ValidateEmail(email)) {
		return res.send({ 
			success:false,
			message:"Input error: Email invalid!"
		});
	}
	if(!password) {
		return res.send({ 
			success:false,
			message:"Input error: Password cannot be blank!"
		});
	}

	email = email.toLowerCase();
	//check id
	User.find({
		id:id
	},(err,previousUsers) => {
		//verify
		if(err) {
			return res.send({
				success:false,
				message:"Database error: " + err,
			});
		}else if(previousUsers.length>0) {
			return res.send({
				success:false,
				message:"Input error: Account already exists"
			}); 
		}else{
			//check email
			User.find({
				email:email
			},(err,previousUsers) => {
				//verify
				if(err) {
					return res.send({
						success:false,
						message:"Database error: " + err,
					});
				}else if(previousUsers.length>0) {
					return res.send({
						success:false,
						message:"Input error: Email already exists"
					});
				}else{
					//save user
					const newUser = new User();
					newUser.firstName = firstName;
					newUser.lastName = lastName;
					newUser.email = email;
					newUser.id = id;
					newUser.password = newUser.generateHash(password);
					newUser.save((err,user)=>{
						if(err) {
							return res.send({
								success:false,
								message:"Database error: " + err,
							});
						}
						return res.send({
							success:true,
							message:"Success: Signed up"
						});
					});
				}
			});
		}
	});
});

module.exports = router;
