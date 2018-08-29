// File Type: API endpoint.

const express = require('express');

const User = require('../../models/User.js');

// The router handles all API calls that rely only on the User collection in the DB.
var router = express.Router();
let verify = require('../middleware/verify.js');

// This method gets a user document from the User collection.
// Parameters: 
//      _id: String;  The object id of a document from the User collection.
// Return Value:
//      Response containing:
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//			or
//          data: JSON object; Contains the data from the DB query.
router.use(verify);

router.get('/',(req,res,next) => {
	const { query } = req;
	const { userId } = query;

	User.find({
		_id : userId,
	},(err,data) => {
		if(err) {
			res.send({
				success: false,
				message: "Database error: " + err,
			});
		}else{
			return res.send({
				success: true,
				data: data,
			});
		}
	});
});

// This method gets all users in the User collection.
// Return Value:
//      Response containing:
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//			or
//          data: JSON object; Contains the data from the DB query.
router.get('/getAllUsers',(req,res,next)=>
{
	User.find({
	},(err,data) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Database error: ' + err,
			});
		} else {
			return res.send({
				success: true,
				data: data,
			});
		}
	});
});

//Method returns users from an array of userIds
// Parameters:
//		userIds: Array; strings with ids from the user collection.
// Return Value:
//      Response containing:
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//			or
//          data: JSON object; Contains the data from the DB query.
router.get('/getSelectUsers', (req,res) => {
	const { query } = req;
	const { userIds } = query;

	User.find({
		_id: { $in: JSON.parse(userIds)}
	}, (err, data) => {

		if(err) {
			return res.send({
				success: false,
				message: "Database error: " + err,
			});
		}

		if(data.length == 0) {
			return res.send({
				success: false,
				message: "Return error: cannot find users"
			});
		}else{
			res.send({
				success: true,
				message: "Users retrieved successfully",
				data: data
			});
		}

	})
})

// This method gets all documents with a similar name to a name, that is passed, from the User Collection.
// Parameters: 
//      name: String;  This is an name of a user
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/getUserByName', (req,res,next) => {
	const { body } = req;
	const { name } = body;

	if(!name){
		return res.send({ 
			success:false,
			message:"Error: Search cannot be blank!"
		});
	}

	let firstName;
	let lastName;

	if (name.indexOf(' ') != -1){			
		var arr = name.split(' ');
		firstName = new RegExp(arr[0], "i");
		lastName = new RegExp(arr[1], "i");
	}else{
		firstName = new RegExp(name, "i");
		lastName = new RegExp(name, "i");
	}

	User.find({ $or:[
	{firstName:firstName},
	{lastName:lastName}
	]},(err, users) => {

		if(err){
			return res.send({ 
				success:false,
				message:"Database error: " + err,
			});
		}
		if(users.length == 0){
			return res.send({ 
				success:false,
				message:"Return error: No Such User ",
			});
			
		}else
			return res.send({
				success: true,
				users: users,
			});
		
	});
});

// This method updates the email field of a document in the User collection.
// Parameters: 
//      token: String;  This is an object id of a document in the User collection.
//		email: String;  This is the value the field should be changed to.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updateEmail', (req,res,next) => {
	const { body } = req;
	let { token, email } = body;

	email = email.toLowerCase();

	User.find({
		email: email
	},(err, users) => {
		if(err) {
			return res.send({
				success:false,
				message:"Database error: " + err
			});
		}else if((users.length>0) && (users[0]._id != token)) {
			return res.send({
				success:false,
				message:"Input error: Email already exists",
			});
		}else{
			User.findOneAndUpdate({
				_id: token
			},
				{$set:{
					email : email
					}
				},
				{upsert: true},
				(err) => {
					if(err) {
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

// This method updates the name and lastName fields of a document in the User collection.
// Parameters: 
//      token: String;  This is an object id of a document in the User collection.
//		name: String;  This is the value the firstName field should be changed to.
//		lastName: String;  This is the value the lastName field should be changed to.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updateName', (req,res,next) => {
	const { body } = req;
	const { token, name, lastName } = body;
	
	User.findOneAndUpdate({
		_id: token
	},
		{$set: {
			firstName: name,
			lastName: lastName
			}
		},
		{upsert: true},
		(err) => {
			if(err) {
				return res.send({
					success:false,
					message:"Database error: " + err,
				});
			}else{
				return res.send({success:true});
			}
		}
	);
});

// This method updates the password field of a document in the User collection.
// Parameters: 
//      token: String;  This is an object id of a document in the User collection.
//		password: String;  This hashed is the current value of the field.
//		newPassword: String; This hashed is the value the field should be changed to.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updatePassword', (req,res,next) => {
	const { body } = req;
	let { token, password, newPassword } = body;
	User.find({
		_id: token
	},(err, users) => {
		if(err) {
			return res.send({
				success:false,
				message:"Database error: " + err,
			});
		}else if(!users[0].validPassword(password)) {
			return res.send({
				success:false,
				message:"Input error: Incorrect password"
			});
		}else{
			newPassword = users[0].generateHash(newPassword);
			User.findOneAndUpdate({
				_id: token
			},
				{$set:{
					password : newPassword
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

