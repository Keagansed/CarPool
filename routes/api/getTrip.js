var express = require('express');
var router = express.Router();

const Trip = require('../../models/Trip.js');

router.get('/', function(req, res, next) {
    const { query } = req;
    const { _id } = query;
    Trip.find({_id : _id},
        (err,data)=>{
            res.json(data);
        });
});

module.exports = router;
