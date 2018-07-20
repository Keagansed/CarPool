var express = require('express');
var router = express.Router();
const offer = require('../../models/Offer.js');
const carpool = require('../../models/Carpool.js')

router.post('/makeOffer',(req,res,next) => {
    const { body } = req;

    const {
        carpoolName,
        senderId,
        senderRoute,
        recieverId,
        recieverRoute,
        join
    } = body;

    const newOffer = new offer();
    newOffer.CarpoolName = carpoolName;
    newOffer.SenderID = senderId;
    newOffer.SenderRoute = senderRoute;
    newOffer.RecieverID = recieverId;
    newOffer.RecieverRoute = recieverRoute;
    newOffer.JoinRequest = join;
 
    newOffer.save((err, offer) => {
        if(err)
        {  
            return res.send({
                success: false,
                message: err
            });
            
        }

        return res.send({
            success: true,
            message: "Success: offer made Created"
        });
    })

})

router.get('/getOffers',(req,res,next) => {
    const { query } = req;
    const { userId } = query;
    offer.find(
    {
        RecieverID: userId
    },
    (err,data) => {
        res.send({
            success: true,
            message: "Offers retrieved successfully",
            data: data
        })
    });    
})

router.get('/declineInvite',(req,res,next) =>{
    const { query } = req;
    const { offerId } = query;

    offer.remove({
        _id: offerId
    },
    (err) => {
        if (err){
            return res.send({
                success: false,
                message: err
            });
        }
        else{
            return res.send({
                success: true,
                message: "offer deleted"
            });
        }
    });
})

router.get('/acceptInvite',(req,res,next) =>{
    const { query } = req;
    const { offerId } = query;
    
    offer.find({
        _id: offerId
    },
    (err,data) =>{
        if (err){
            return res.send({
                success: false,
                message: err
            });
        }
        else{
            if(data[0].JoinRequest){
                // return res.send({
                //     success: true,
                //     message: "join existing carpool"
                // });
                carpool.findOneAndUpdate({
                    _id: data[0].RecieverRoute
                },
                {$push:{
                        routes: data[0].SenderRoute
                    }
                },
                (err,data) => {
                    if (err){
                        return res.send({
                            success: false,
                            message: err
                        });
                    }else{
                        offer.remove({
                            _id: offerId
                        },
                        (err) => {
                            if (err){
                                return res.send({
                                    success: false,
                                    message: err
                                });
                            }
                            else{
                                return res.send({
                                    _id:data._id,
                                    carpoolName:data.carpoolName,
                                    routes:data.routes,
                                    success:true,
                                    message: "carpool created and offer deleted"
                                });
                            }
                        });
                    }
                });
            }
            else{
                const pool = new carpool();
                pool.routes.push(data[0].SenderRoute);
                pool.routes.push(data[0].RecieverRoute);
                pool.carpoolName = data[0].CarpoolName;
                pool.save((err) =>{
                    if(err){
                        return res.send({
                            success: false,
                            message: err
                        });
                    }
                    else{
                        offer.remove({
                            _id: offerId
                        },
                        (err) => {
                            if (err){
                                return res.send({
                                    success: false,
                                    message: err
                                });
                            }
                            else{
                                return res.send({
                                    _id:pool._id,
                                    carpoolName:pool.carpoolName,
                                    routes:pool.routes,
                                    success: true,
                                    message: "carpool created and offer deleted"
                                });
                            }
                        });
                    }
                });
            }
        }
    });
})

module.exports = router;