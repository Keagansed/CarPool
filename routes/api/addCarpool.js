let express = require('express');
let router = express.Router();
const Carpool = require('../../models/Carpool.js');

router.post('/',(req,res,next)=>{
    const { body } = req;
    const{
        carpoolName,
        from,
        longFrom,
        latFrom,
        to,
        longTo,
        latTo,
        users
    } = body;

    if(!carpoolName){
        return res.send({
            success:false,
            message:"Error: Carpool name cannot be blank!"
        });
    }
    if(!from){
        return res.send({
            success:false,
            message:"Error: from cannot be blank!"
        });
    }
    if(!longFrom){
        return res.send({
            success:false,
            message:"Error: coordsFrom cannot be blank!"
        });
    }
    if(!latFrom){
        return res.send({
            success:false,
            message:"Error: coordsFrom cannot be blank!"
        });
    }
    if(!to){
        return res.send({
            success:false,
            message:"Error: to cannot be blank!"
        });
    }
    if(!longTo){
        return res.send({
            success:false,
            message:"Error: coordsTo cannot be blank!"
        });
    }
    if(!latTo){
        return res.send({
            success:false,
            message:"Error: coordsTo cannot be blank!"
        });
    }
    if(!users){
        return res.send({
            success:false,
            message:"Error: Users cannot be blank!"
        });
    }

    const newCarpool = new Carpool();
    newCarpool.carpoolName = carpoolName;
    newCarpool.from = from;
    newCarpool.longFrom = longFrom;
    newCarpool.latFrom = latFrom;
    newCarpool.to = to;
    newCarpool.longTo = longTo;
    newCarpool.latTo = latTo;
    newCarpool.users = users;
    newCarpool.save((err,carpool)=>{
        if(err){
            return res.send({
                success:false,
                message:"Error: Server error"
            });
        }
        return res.send({
            _id:newCarpool._id,
            success:true,
            message:"Success: Added Carpool"
        });
    });
});

module.exports = router;