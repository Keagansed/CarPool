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
router.get('/getAllOtherCarpools', function (req, res, next) {
    const { query } = req;
    const { routeId } = query;
    Carpool.find({ routes: { $nin: [routeId] } },
        (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Database error: " + err,
                });
            } else {
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
router.get('/getCarpool', function (req, res, next) {
    const { query } = req;
    const { _id } = query;
    Carpool.find({ _id: _id },
        (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Database error: " + err,
                });
            } else {
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
router.post('/addCarpool', (req, res, next) => {
    const { body } = req;
    const { carpoolName, routes } = body;

    if (!carpoolName) {
        return res.send({
            success: false,
            message: "Input error: carpoolName is blank"
        });
    }
    if (!routes) {
        return res.send({
            success: false,
            message: "Input error: routes is blank"
        });
    }

    const newCarpool = new Carpool();
    newCarpool.carpoolName = carpoolName;
    newCarpool.routes = routes;
    newCarpool.save((err) => {
        if (err) {
            return res.send({
                success: false,
                message: "Database error: " + err,
            });
        } else {
            return res.send({
                _id: newCarpool._id,
                success: true,
                message: "Success: Added Carpool"
            });
        }
    });
});

/*
    Removes a users route from the carpool with the given '_id' once they leave a carpool. 
*/
router.post('/removeRouteFromCarpool', (req, res, next) => {
    const { body } = req;
    const { _id, routeId } = body;

    Carpool.find({
        _id:_id
    }, (err, carpool) => {

        if(err) {
            return res.status(500).send({
                success: false,
                message: "Database error: " + err,
            });
        }

        if(carpool.length == 0) {
            return res.status(404).send({
                success: false,
                message: "Return error: no such carpool",
            });
        }else{
            let newRoutes = carpool[0].routes;
            let index = newRoutes.indexOf(routeId);
            if (index > -1) {
                newRoutes = newRoutes.splice(index, 1);
            
                Carpool.findOneAndUpdate({
                    _id: _id
                },
                    {
                        $set:{
                            routes: newRoutes
                        }
                    },
                    {upsert: true},
                    (err) => {
                            if(err) {
                                return res.status(500).send({
                                    success: false,
                                    message: "Database error: " + err,
                                })
                            }else{
                                return res.status(200).send({
                                    success: true,
                                    message: "Success: removed route from carpool",
                                })
                            }
                        }
                );
            }else{
                return res.send(404).send({
                    success: false,
                    message: "Return error: route not found in carpool",
                })
            }
        }

    })    
});

module.exports = router;
