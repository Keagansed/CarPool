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

	name = name.toLowerCase();
	name = name.charAt(0).toUpperCase() + name.slice(1);

	if (name.indexOf(' ') != -1){			
		var arr = name.split(' ');
		let firstName = arr[0];
		let lastName = arr[1];

		lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

		User.find({
			firstName:firstName,
			lastName:lastName
		},(err, users) => {
			/*console.log("Users: " + users);*/

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

		User.find({
			firstName:name
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

