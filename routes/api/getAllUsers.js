var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');

router.get('/',(req,res,next)=>
{

	User.find({
	},(err,data) =>{
		res.json(data);
	});
});

module.exports = router;

