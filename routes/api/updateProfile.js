var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');
//update

router.post('/',(req,res,next)=>{
	const { body } = req;
	const{
		firstName,
		lastName,
		id,
		//~ password,
		_id
	} = body;
	let { email } = body;

	//error check data
	//====== Use return res.send to stop if err occurs
	if(!firstName){
		return res.send({ 
			success:false,
			message:"Error:Firstname cannot be blank!"
		});
	}
	if(!lastName){
		return res.send({ 
			success:false,
			message:"Error: Last Name cannot be blank!"
		});
	}
	if(!email){
		return res.send({ 
			success:false,
			message:"Error: Email cannot be blank!"
		});
	}
	if(!id){
		return res.send({ 
			success:false,
			message:"Error: ID cannot be blank!"
		});
	}else if(id.length != 13){
		return res.send({ 
			success:false,
			message:"Error: ID invalid!"
		});
	}
	//~ if(!password){
		//~ return res.send({ 
			//~ success:false,
			//~ message:"Error: Password cannot be blank!"
		//~ });
	//~ }

	email = email.toLowerCase();
	//check id
	User.find({
		id:id
	},(err,previousUsers) =>{
		//verify
		if(err){
			return res.send({
				success:false,
				message:"Error:Server error"
			});
		}
		else if((previousUsers.length>0) && (previousUsers[0]._id != _id)){
			return res.send({
				success:false,
				message:"Error:Account already exists"
			});
		}
	});
	//check email
	User.find({
		email:email
	},(err,previousUsers) =>{
		//verify
		if(err){
			return res.send({
				success:false,
				message:"Error:Server error"
			});
		}
		else if((previousUsers.length>0) && (previousUsers[0]._id != _id)){
			return res.send({
				success:false,
				message:"Error: Email already exists"
			});
		}
		else{
			//update user
			User.findOneAndUpdate(
				{"_id": _id}, 
				{$set:{
					"firstName" : firstName,
					"lastName" : lastName,
					"email" : email,
					"id" : id,
					//~ "password" : password
					}
				},
				{upsert: true},
				function(err){
					if (err)
						return res.send(500, {error: err});
					else
						return res.send({success:true});
				}
			);
		}
	});

	

});

module.exports = router;
