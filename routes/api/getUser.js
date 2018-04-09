var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');

router.post('/', (req,res,next) => {

	const { body } = req;
	let { name } = body;

	if(!name){
		return res.send({ 
			success:false,
			message:"Error: Search cannot be blank!"
		});
	}

	if (name.indexOf(' ') != -1){			
		var arr = name.split(' ');
		let firstName = new RegExp(arr[0], "i");
		let lastName = new RegExp(arr[1], "i");

		User.find({
			firstName:firstName,
			lastName:lastName
		},(err, users) => {

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
			} 
			res.json(users);
		});

	}else{

		let regex = new RegExp(name, "i");

		User.find({
			firstName:regex
		},(err, users) => {
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
			} 
			res.json(users);
		});
	}
});

module.exports = router;

