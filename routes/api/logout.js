var express = require('express');
var router = express.Router();

const UserSession = require('../../models/UserSessions.js');
//Get tokem
//verify token is one of a kind and NOT deleted
router.get('/', function(req, res, next) {
  const { query } = req;
  const { token } = query;

  UserSession.remove({
  	userId:token,
  },(err,sessions)=>{
  	if(err){
  		return res.send({ 
  			success:false,
  			message:"Error: Server Error"
  		});
	}
	
	return res.send({ 
		success:true,
		message:"Logged out"
	});

  });
});

module.exports = router;
