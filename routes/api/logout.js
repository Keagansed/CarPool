// File Type: API endpoint

const express = require('express');

const UserSession = require('../../models/UserSessions.js');

// This router handles the logout of a user.
const router = express.Router();

// This method removes a document from the UserSessions collection.
// Parameters: 
//      token: String;  This is an object id of a document in the User collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.get('/', function(req, res, next) {
	const { query } = req;
  	const { token } = query;

  	UserSession.remove({
  		userId:token,
  	},(err) => {
  		if(err) {
  			return res.send({ 
  				success:false,
  				message:"Error: Server Error"
  			});
		}else{
			return res.send({ 
				success:true,
				message:"Logged out"
			});
		}
  	});
});

module.exports = router;
