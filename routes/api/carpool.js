// File Type: API endpoint

const express = require('express');

const Carpool = require('../../models/Carpool.js');

// This router handles all API calls that rely only on the Carpool collection in the DB.
const router = express.Router();

// This method gets all documents from the Carpool collection that don't contain a particular route.
// Parameters: 
//      routeId: String;  This is the object id of a document from the Route collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getAllOtherCarpools',function(req,res,next){
    const { query } = req;
    const { routeId } = query;
    Carpool.find({routes:{$nin:[routeId]}},
        (err,data) => {
            if(err) {
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

// This method gets a specific carpool document from the Carpool collection.
// Parameters: 
//      _id: String;  This is the object id of a document from the Carpool collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getCarpool', function(req, res, next) {
    const { query } = req;
    const { _id } = query;
    Carpool.find({_id : _id},
        (err,data) => {
            if(err) {
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

// This method adds a new carpool document to the Carpool collection.
// Parameters: 
//      carpoolName: String;  The name of the new carpool.
//      routes: Array;  Contains the object ids of documents that are a part of the new carpool.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          _id: String; The object id of the new carpool document.
router.post('/addCarpool',(req,res,next)=>{
    const { body } = req;
    const { carpoolName, routes } = body;

    if(!carpoolName) {
        return res.send({
            success:false,
            message:"Error: Carpool name cannot be blank!"
        });
    }
    if(!routes) {
        return res.send({
            success:false,
            message:"Error: Routes cannot be blank!"
        });
    }

    const newCarpool = new Carpool();
    newCarpool.carpoolName = carpoolName;
    newCarpool.routes = routes;
    newCarpool.save((err) => {
        if(err) {
            return res.send({
                success:false,
                message:"Error: Server error"
            });
        }else{
            return res.send({
                _id:newCarpool._id,
                success:true,
                message:"Success: Added Carpool"
            });
        }
    });
});

module.exports = router;
