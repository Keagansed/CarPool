var express = require('express');
var router = express.Router();
const offer = require('../../models/offer.js');

router.post('/makeOffer',(req,res,next) => {
    const { body } = req;

    const {
        senderId,
        senderRoute,
        recieverId,
        recieverRoute,
        join
    } = body;

    const newOffer = new offer();
    newOffer.CarpoolName = "test";
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

module.exports = router;