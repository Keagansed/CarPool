var express = require('express');
var router = express.Router();

const Carpool = require('../../models/Carpool.js');

router.get('/', function(req, res, next) {
    const { query } = req;
    const { _id } = query;
    Carpool.find({_id : _id},
        (err,data)=>{
            res.json(data);
        });
});

module.exports = router;
