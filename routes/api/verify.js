// File Type: API endpoint

const express = require('express');

const UserSession = require('../../models/UserSessions.js');

// This router handles the check to test if a user is log.
const router = express.Router();

// This method creates a document in the userSession collection and checks if the user exists in the User collection.
// Parameters: 
//      token: String;  Object id of a document in the User collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.get('/', function(req, res, next) {
  	const { query } = req;
  	const { token } = query;

	let date = new Date();
  	let currentDate = date.toDateString();

  	UserSession.find({
  		userId:token,
  		timestamp: currentDate
  	}, (err,sessions) => {
		if(err) {
			return res.send({ 
				success:false,
				message:"Database error: " + err,
			});
		}
		
		if(sessions.length != 1) {
			return res.send({ 
				success:false,
				message:"Return error: Invalid session"
			});
		}else{
			return res.send({ 
				success:true,
				message:"Good session"
			});
		}
  	});
});

module.exports = router;
