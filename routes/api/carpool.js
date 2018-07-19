var express = require('express');
var router = express.Router();

const Carpool = require('../../models/Carpool.js');

router.get('/getAllOtherCarpools',function(req,res,next){
    const { query } = req;
    const { routeId } = query;
    id="5b4b5383e3c2610c048=37b3a"; //TEMP REMOVE ASAP!!!!!!
    Carpool.find({routes:{$nin:[routeId]}},
        (err,data)=>{
            if(err){
                return res.send({
                    success: false,
                    message: err
                });
            }else{
                res.send({
                    success: true,
                    message: "Carpools retrieved successfully",
                    data: data
                })
            }
        });
});

router.get('/getCarpool', function(req, res, next) {
    const { query } = req;
    const { _id } = query;
    Carpool.find({_id : _id},
        (err,data)=>{
            if (err){
                return res.send({
                    success: false,
                    message: err
                });
            }else{
                res.send({
                    success: true,
                    message: "Carpool retrieved successfully",
                    data: data
                })
            }
        });
});

router.post('/addCarpool',(req,res,next)=>{
    const { body } = req;
    const{
        carpoolName,
        routes
    } = body;

    if(!carpoolName){
        return res.send({
            success:false,
            message:"Error: Carpool name cannot be blank!"
        });
    }
    if(!routes){
        return res.send({
            success:false,
            message:"Error: Routes cannot be blank!"
        });
    }

    const newCarpool = new Carpool();
    newCarpool.carpoolName = carpoolName;
    newCarpool.routes = routes;
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
