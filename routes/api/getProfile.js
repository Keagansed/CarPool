var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');

router.get('/',(req,res,next)=>
{
	const { query } = req;
	const { user } = query;

	User.find({
		firstName:user,
	},(err,data) =>{
		res.json(data);
	});
});

module.exports = router;

