var express = require('express');
var router = express.Router();

const UserSession = require('../../models/UserSessions.js');
//Get tokem
//verify token is one of a kind and NOT deleted
router.get('/', function(req, res, next) {
  const { query } = req;
  const { token } = query;

  UserSession.find({
  	userId:token,
  	isDeleted: false
  }, (err,sessions)=>{
  	if(err){
		return res.send({ 
			success:false,
			message:"Error: Server Error"
		});
	}
	
	if(sessions.length != 1){
		return res.send({ 
			success:false,
			message:"Error: Invalid session"
		});
	} else {
		return res.send({ 
			success:true,
			message:"Good session"
		});
	}

  });
});

module.exports = router;
