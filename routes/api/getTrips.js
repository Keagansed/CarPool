var express = require('express');
var router = express.Router();

const Trip = require('../../models/Trip.js');

router.get('/', function(req, res, next) {
    const { query } = req;
    const { userID } = query;
    Trip.find({['users.'+userID]:true},
        (err,data)=>{
        res.json(data);
    });
});

module.exports = router;
