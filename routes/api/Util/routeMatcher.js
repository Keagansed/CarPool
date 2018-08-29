// File Type: Backend Utility

const arrayCheck = require('./arrayCheck');
const trustFactor = require('./trustFactor');

const Carpool = require('../../../models/Carpool.js');
const Route = require('../../../models/Route.js');
const User = require('../../../models/User.js');
const Vouch = require('../../../models/Vouch.js');

// Array to store routes
let allRoutes = [];

// Array to store all carpools
let allCarpools = [];

// Array to store routes that will be recommended
let recommendedRoutes = [];

// Array to store carpools that will be recommended
let recommendedCarpools = [];

// Integer to store the maximum radius for carpools to be matched in km
let maxRadius = 2;

// Array to store the trust factor weights assigned the user of each of the recommended routes in order
let trustFactorWeights = [];

// Array to store the time weights assigned to each recommended route
let timeWeights = [];


/*
    Method to get all routes relevant to the user
    Makes API calls to get all the routes
    */
 
module.exports.getRecommendedRoutes = async (token, routeId) => {
    let obj = {};

    await getAllRoutes(token, routeId);

    obj = {
        recommendedRoutes: recommendedRoutes,
        recommendedCarpools: recommendedCarpools,
    }        

    return obj;
}


getAllRoutes = async (token, routeId) => {
    recommendedCarpools = [];
    recommendedRoutes = [];

    await Carpool.find({ routes: { $nin: [routeId] } },
        (err, data) => {
            if (err) {
                console.log("Database error: " + err);
            } else {
                const carpools = data.map(carpool => {
                    return carpool.toObject();
                }); 
                
                for (let index = 0; index < carpools.length; index++) {
                    
                    carpools[index].routes.forEach(route => {

                        if(route.userId === token) {
                            carpools.splice(index,1);
                            index--;
                        }
                        
                    });
                    
                }

                filterCarpools(carpools, token)
            }
        }
    );

    await Route.find({
        userId: {$ne: token}
    },
    (err,data) => {
        if(err) {
            console.log("Database error: " + err);
        }else {
            const routes = data.map(dataObj => {
                return dataObj.toObject();
            });

            allRoutes = routes;
        }
    });

    await Route.find({
        _id: routeId
    },
    (err,data) =>  {
        
        if(err){
            console.log("Database error: " + err);
        }else {
            const routes = data.map(dataObj => {
                return dataObj.toObject();
            });

            filterRoutesByRadius(routes[0]);
            generateTimeWeights(routes[0]);
            getUsersAndGenerateTrustWeights(routes[0]);     
            
            
        }
    })

};

/*
    Method to filter all routes by their radius
    Checks if the routes are within a specified radius from each other
    Calls helper functions calcDistance, updateRecommendedRoutes and updateRoutesCompared to do so
    Calls functions generateDifferenceArray and generateCarpoolArr in other file client/src/js/utils/arrayCheck.js
    to generate an array of differences and generate an array or relevant carpools
    */
filterRoutesByRadius = (routeObj) => {
    // Longitudes, latitudes and radiuses
    let routeStartLat,routeStartLng,routeEndtLat,routeEndLng, startWithinRadius, endWithinRadius, startDistance, endDistance;

    // Array to store the differences between routes
    let differenceArray = [];

    // Array to store recommended routes
    let recRoutes = [];

    userList = [];
    recommendedRoutes = []; //reset store

    differenceArray = arrayCheck.generateDifferenceArray(routeObj.routesCompared, allRoutes, false);
    recommendedRoutes = arrayCheck.generateDifferenceArray(routeObj.recommended, allRoutes, true);

    differenceArray.forEach(route => {
        routeStartLat = route.startLocation.lat;
        routeStartLng = route.startLocation.lng;
        routeEndtLat = route.endLocation.lat;
        routeEndLng = route.endLocation.lng;

        startWithinRadius =false;
        endWithinRadius =false;

        routeObj.waypoints.forEach(obj => {
            startDistance = calcDistance(obj.lat, obj.lng, routeStartLat, routeStartLng);
            endDistance = calcDistance(obj.lat, obj.lng, routeEndtLat, routeEndLng);
            if(startDistance <= maxRadius) {
                startWithinRadius = true;
            }
            if(endDistance <= maxRadius) {
                endWithinRadius = true;
            }
        });

        if(startWithinRadius && endWithinRadius) {
            recommendedRoutes.push(route);
            recRoutes.push(route);
        }
    });

    if(allCarpools.length) {
        recommendedCarpools = arrayCheck.generateCarpoolArr(allCarpools, recommendedRoutes);
    }

    if(recRoutes.length > 0) {
        updateRecommendedRoutes(recRoutes, routeObj._id);
    }

    if(differenceArray.length > 0) {
        updateRoutesCompared(differenceArray, routeObj._id);
    }

};

/*
    Helper function to filter carpools
    Makes an API call to getRoutes in order to filter carpools by relevance
    Takes the caproolArr and the user's ID as arguments
    */
filterCarpools = (carpoolArr, token) => { //remove Carpools that the user is already a part of
    allCarpools = [];
    Route.find({
        userId: token
    },
    (err,data) => {
        if(err) {
            console.log("Database error: " + err);
        }else{
            const routes = data.map(dataObj => {
                return dataObj.toObject();
            })

            carpoolArr.forEach(carpoolObj => {
                let contains = false;

                carpoolObj.routes.forEach(route => {
                    routes.forEach(routeObj => {
                        if(routeObj._id === route.id) {
                            contains = true;
                        }
                    });
                });

                if(!contains) {
                    allCarpools.push(carpoolObj);
                }

            }); 

        }
    });

};

/*
    Function that combines the weights of the time and trust factor and reorders the recommended
    routes to be in decsending order of the combined weight.
*/
reorderRoutes = () => {
    let weights = [], count = 0, combinedWeight, i, j , size = recommendedRoutes.length, temp;

    timeWeights.forEach(weight => {
        combinedWeight = weight + trustFactorWeights[count];
        weights.push(combinedWeight);
        count++;
    });

    for (i = 0; i < size - 1; i++) {

        for (j = 0; j < (size - i - 1); j++) {

            if(weights[j] < weights[j + 1]) {
                // swap the weights of the corresponding routes
                temp = weights[j];
                weights[j] = weights[j + 1];
                weights[j + 1] = temp;

                // swap the corresponding recommended routes
                temp = recommendedRoutes[j];
                recommendedRoutes[j] = recommendedRoutes[j + 1];
                recommendedRoutes[j + 1] = temp;
            }

        }

    }

};

/*
    Function to generate the weight values associated with the time difference between
    each of the recommended routes and the users route. If the recommeneded route is at the 
    same time as the users route, it is assigned a weight of 1. For recommended routes that
    are before the users route, 0.1 is subtracted from 1 for every 30 minutes difference. And
    for recommended routes that are after, 0.1 is subtracted from 1 for every 15 minutes
    difference. This is because a recommended route that is before the users specified time 
    is preferable to a route that is after.
    */
generateTimeWeights = (routeObj) => {
    const beforeTime = 30, afterTime = 15, timeMultiplier = 0.1;
    // time difference between routeObj and recRoute in minutes
    let timeDifferences = [], timeWeight;

    timeWeights = [];

    recommendedRoutes.forEach(route => {
        timeDifferences.push(calcTimeDifference(routeObj.time, route.time));
    });

    timeDifferences.forEach(time => {
        timeWeight = 1;

        if(time < 0) {  // Recommended route time before users route time
            
            timeWeight -= ((Math.abs(time) / beforeTime)|0) * timeMultiplier;

        }else if(time > 0) {    // Recommended route time after users route time
            
            timeWeight -= ((time / afterTime)|0) * timeMultiplier
        }
        
        timeWeights.push(timeWeight);
    });
};

/*
    Get the user objects of each of the users of the recommended routes and stores then in the
    'userObjs' array, then calls the 'generateTrustFactorWeights' using the 'userObjs' array.
*/
getUsersAndGenerateTrustWeights = (routeObj) => {
    let userIds = [], userObjs = [];

    recommendedRoutes.forEach(route => {
        userIds.push(route.userId);
    });

    User.find({
		_id: { $in: userIds}
	}, (err, userData) => {
		if(err) {
            console.log("Database error: " + err);
		}else{
            const users = userData.map(dataObj => {
                return dataObj.toObject();
            })

            users.forEach(user => {
                userObjs.push(user);
            });

            Vouch.find({
                idFor: routeObj.userId,
            }, (err, vouchData) => {
                if (err) {
                    console.log("Database error: " + err);
                }else {
                    const vouches = vouchData.map(dataObj => {
                        return dataObj.toObject();
                    })

                    generateTrustFactorWeights(userObjs, vouches);
                }
            });

		}

    })

};

/*
    Function that generates the weight of the trust factor of each of the users of the recommeneded routes
    and stores these computed weights in the 'trustFactorWeights' array. Weight is calculated by scaling the
    trust factor to a range of [0,1]. Calls the 'reorderRoutes' function after the weights have been calculated 
    and stored.
*/
generateTrustFactorWeights = (userObjs, vouches) => {
    let trustFactors = [], scaledTrustFactor, secLevels = [], count;
    
    trustFactorWeights = [];

    if(userObjs.length !== recommendedRoutes.length) {
        
        userObjs.forEach(user => {
            secLevels.push(trustFactor.calcSecLvl(user, vouches));
        });
        
        recommendedRoutes.forEach(route => {
            count = 0;
            userObjs.forEach(user => {

                if(user._id === route.userId) {
                    trustFactors.push(secLevels[count]);
                }

                count++;
            });
        });

    }else{
        userObjs.forEach(user => {
            trustFactors.push(trustFactor.calcSecLvl(user, vouches));
        });
    }

    trustFactors.forEach(tf => {
        scaledTrustFactor = (1 - 0)*(tf - 0)/(5-0)+0;
        trustFactorWeights.push(scaledTrustFactor);
    });

    reorderRoutes();
};

/*
    Helper function to update the recommended routes for the current route
    Takes in the recommendedArray and the routeID as an argument
    Makes an API call to update the recommended routes in the database
    */
updateRecommendedRoutes = (recommendedArray, routeId) => {
    // Array of route IDs
    let arrRouteId = [];

    recommendedArray.forEach(element => {
        arrRouteId.push(element._id);
    });

    Route.update({
        _id: routeId 
    },{
        $push:{
            recommended: {
                $each: arrRouteId
            }
        }
    },
    (err) => {
        if(err) {
            console.log("Database error: " + err);
        }
    });

};

/*
    Helper function to update the routes that have been compared to this route to ensure it doesn't happen again
    Takes in the differenceArray as an argument to compare and the routeID
    */
updateRoutesCompared = (differenceArray, routeId) => {
    // Array of route IDs
    let arrRouteId = [];

    differenceArray.forEach(element => {
        arrRouteId.push(element._id);
    });

    Route.update({
        _id: routeId 
    }, {
        $push:{
            routesCompared: {
                $each: arrRouteId
            }
        }
    },
    (err) => {
        if(err) {
            console.log("Database error: " + err);
        }
    });
};

/*
    Helper function to calculate the distance between two points
    Takes in long and lat for both points as an argument
    Calls helper function degreesToRadians to make a conversion
    Returns the distance as a double
    */
calcDistance = (lat1, lng1, lat2, lng2) => {
    // Integer radius of the earth
    let earthRadiusKm = 6371;

    // Destination latitude in radians
    let dLat = degreesToRadians(lat2 - lat1);

    // Destination longitude in radians
    let dLon = degreesToRadians(lng2 - lng1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat / 2) +
            Math.sin(dLon/2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusKm * c;
};

/*
    Helper function to convert the measurement in degrees to radians
    Returns integer value as radians
    */
degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

/*
    Method to calculate the difference between the times in minutes
    Calls helper function to convert time to minutes
    Returns the absolute calculated difference as an integer
    */
calcTimeDifference = (objRouteTime, routeTime) => {
    // Current route time in minutes
    let currRouteTime = convertTime(objRouteTime);

    // Recommended route time in minutes
    let recRouteTime = convertTime(routeTime);
    
    // return Math.abs(recRouteTime - currRouteTime);
    return (recRouteTime - currRouteTime);
};

/*
    Method to convert time to minutes
    Returns the time of the route converted into minutes
    */
convertTime = (sTime) => {
    // Array for time that has been split by ':'
    let arrTime = sTime.split(':');

    arrTime[0] = parseInt(arrTime[0], 10);
    arrTime[1] = parseInt(arrTime[1], 10);
    return ((arrTime[0] * 60) + arrTime[1]);
};