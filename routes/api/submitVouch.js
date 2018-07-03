var express = require('express');
var router = express.Router();

const Vouch = require('../../models/Vouch.js');

router.post('/',(req,res,next)=>{
	const { body } = req;
	const{
		tripID,
		idBy,
		idFor,
		rating,
		date,
		reviewBody
	} = body;

	if(!tripID){
		return res.send({ 
			success:false,
			message:"Error:tripID cannot be blank!"
		});
	}
	if(!idBy){
		return res.send({
			success:false,
			message:"Error:idBy cannot be blank!"
		});
	}
	if(!idFor){
		return res.send({ 
			success:false,
			message:"Error: idFor cannot be blank!"
		});
	}
	if(!rating){
		return res.send({ 
			success:false,
			message:"Error: rating cannot be blank!"
		});
	}
	if(!date){
		return res.send({ 
			success:false,
			message:"Error: date cannot be blank!"
		});
	}
	if(!reviewBody){
		return res.send({ 
			success:false,
			message:"Error: reviewBody cannot be blank!"
		});
	}

	const newVouch = new Vouch();
	newVouch.tripID = tripID;
	newVouch.idBy = idBy;
	newVouch.idFor = idFor;
	newVouch.rating = rating;
	newVouch.date = date;
	newVouch.reviewBody = reviewBody;
	newVouch.save((err,vouch)=>{
		if(err){
			return res.send({
				success:false,
				message:"Error: Sever error"+err
			});
		}
		return res.send({
			success:true,
			message:"Vouch added"
		});
	});
});

module.exports = router;