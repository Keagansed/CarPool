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

module.exports = router;

