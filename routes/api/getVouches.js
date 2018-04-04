var express = require('express');
var router = express.Router();

const Vouch = require('../../models/Vouch.js');
//Sign up


router.get('/', function(req, res, next) {
  const { query } = req;
  const { idFor } = query;
  Vouch.find({
  	idFor:idFor,
  },(err,data)=>{
    res.json(data);
  });
});

module.exports = router;
