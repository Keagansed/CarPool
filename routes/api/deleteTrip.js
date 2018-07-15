var express = require('express');
var router = express.Router();

const Trip = require('../../models/Trip.js');

router.get('/', function(req, res, next) {
    const { query } = req;
    const { _id } = query;

    Trip.remove({
        _id:_id,
    },(err,trips)=>{
        if(err){
            return res.send({
                success:false,
                message:"Error: Server Error"
            });
        }

        return res.send({
            success:true,
            message:"Deleted Trip"
        });

    });
});

module.exports = router;
