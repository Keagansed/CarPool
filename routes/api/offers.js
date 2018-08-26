// File Type: API endpoint

const express = require('express');

const carpool = require('../../models/Carpool.js');
const offer = require('../../models/Offer.js');
let verify = require('../middleware/verify.js');

// This router handles all changes to the Offer collection aswell as updating the Carpool collection if needed.
const router = express.Router();

// This method creates a document in the Offer collection.
// Parameters: 
//      carpoolName: String;  Name of the carpool.
//      senderId: String;  Object id of a document in the User collection.
//      senderRoute: String;  Object id of a document in the Route collection.
//      recieverId: String;  Object id of a document in the User collection.
//      recieverRoute: String;  Object id of a document in the Route collection.
//      join: Boolean; True if joining an existing carpool.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.use(verify);

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
 
    newOffer.save((err) => {
        if(err) {  
            return res.send({
                success: false,
                message: "Database error: " + err,
            });
            
        }else{
            return res.send({
                success: true,
                message: "Success: offer made Created"
            });
        }
    })

})

// This method gets all documents from the Offer collection are for a particular user.
// Parameters: 
//      token: String;  This is the object id of a document from the User collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getOffers',(req,res,next) => {
    const { query } = req;
    const { token } = query;

    offer.find(
    {
        RecieverID: token
    },
    (err,data) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            })    
        }else{
            res.send({
                success: true,
                message: "Offers retrieved successfully",
                data: data
            });
        }
    });    
})


// This method removes a document from the Offer collection.
// Parameters: 
//      offerId: String;  This is the object id of a document from the Offer collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.get('/declineInvite',(req,res,next) =>{
    const { query } = req;
    const { offerId } = query;

    offer.remove({
        _id: offerId
    },
    (err) => {
        if(err) {
            return res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            return res.send({
                success: true,
                message: "offer deleted"
            });
        }
    });
})

// This method removes a document from the Offer collection and creates/updates the Carpool in the Carpool collection.
// Parameters: 
//      offerId: String;  This is the object id of a document from the Offer collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.get('/acceptInvite',(req,res,next) =>{
    const { query } = req;
    const { offerId } = query;
    
    offer.find({
        _id: offerId
    },
    (err,data) => {
        if(err) {
            return res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            
            // If joining an existing carpool
            if(data[0].JoinRequest) {                   
                carpool.findOneAndUpdate({
                    _id: data[0].RecieverRoute
                },
                {$push:{
                        routes: data[0].SenderRoute
                    }
                },
                (err,data) => {
                    if(err) {
                        return res.send({
                            success: false,
                            message: "Database error: " + err,
                        });
                    }else{
                        offer.remove({
                            _id: offerId
                        },
                        (err) => {
                            if(err) {
                                return res.send({
                                    success: false,
                                    message: "Database error: " + err,
                                });
                            }else{
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

            // If creating a new carpool
            }else{                                  
                const pool = new carpool();
                pool.routes.push(data[0].SenderRoute);
                pool.routes.push(data[0].RecieverRoute);
                pool.carpoolName = data[0].CarpoolName;
                pool.save((err) => {
                    if(err) {
                        return res.send({
                            success: false,
                            message: "Database error: " + err,
                        });
                    }else{
                        offer.remove({
                            _id: offerId
                        },
                        (err) => {
                            if(err) {
                                return res.send({
                                    success: false,
                                    message: "Database error: " + err,
                                });
                            }else{
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