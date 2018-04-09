var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');

router.post('/', (req,res,next) => {

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
				message:"Error: Server Error"
			});
		}
		if(users.length == 0){
			return res.send({ 
				success:false,
				message:"Error: No Such User "
			});
			
		}else
			res.json(users);
		
	});
});

module.exports = router;

