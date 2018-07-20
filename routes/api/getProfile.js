var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');

router.get('/',(req,res,next)=>
{
	const { query } = req;
	const { _id } = query;

	User.find({
		_id:_id,
	},(err,data) =>{
		res.json(data);
	});
});

router.post('/updateEmail', (req,res,next) =>{
	const { body } = req;
	const { id, email } = body;
	email = email.toLowerCase();
	User.find({
		email: email
	},(err, users) =>{
		if(err){
			return res.send({
				success:false,
				message:"Error:Server error"+err
			});
		}
		else if((users.length>0) && (users[0]._id != id)){
			return res.send({
				success:false,
				message:"Error: Email already exists"
			});
		}
		else{
			User.findOneAndUpdate({
				_id: id
			},
				{$set:{
					email : email
					}
				},
				{upsert: true},
				(err)=>{
					if (err)
						return res.send({
							success:false,
							message:"Error did not update"
						});
					else
						return res.send({success:true});
				}
			);
		}
	});
});


router.post('/updateName', (req,res,next) =>{
	const { body } = req;
	const { id, name, lastName } = body;
	User.findOneAndUpdate({
		_id: id
	},
		{$set:{
			firstName: name,
			lastName: lastName
			}
		},
		{upsert: true},
		(err)=>{
			if (err)
				return res.send({
					success:false,
					message:"Error did not update"
				});
			else
				return res.send({success:true});
		}
	);
});

router.post('/updatePassword', (req,res,next) =>{
	const { body } = req;
	let { id, password, newPassword } = body;
	User.find({
		_id: id
	},(err, users) =>{
		if(err){
			return res.send({
				success:false,
				message:"Error:Server error"+err
			});
		}
		else if(!users[0].validPassword(password)){
			return res.send({
				success:false,
				message:"Incorrect password"
			});
		}
		else{
			newPassword = users[0].generateHash(newPassword);
			User.findOneAndUpdate({
				_id: id
			},
				{$set:{
					password : newPassword
					}
				},
				{upsert: true},
				(err)=>{
					if (err)
						return res.send({
							success:false,
							message:"Error did not update"
						});
					else
						return res.send({success:true});
				}
			);
		}
	});
});

module.exports = router;

