const express = require('express');

const Vouch = require('../../models/Vouch.js');

const router = express.Router();
let verify = require('../middleware/verify.js');

// This method creates a document in the Vouch collection.
// Parameters: 
//      tripID: String;  This is the Object id of the trip that the vouch is related too.
//      idBy: String;  Object id of the creator of the vouch.
//      idFor: String;  Object id of the user that the vouch is about.
//      rating: Integer;  A rating out of 5.
//      date: date;  Date the vouch was made.
//      reviewBody: String;  Any extra comment about the vouch.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.use(verify);

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