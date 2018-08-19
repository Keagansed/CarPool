// File Type: Store

import { action, observable, toJS } from 'mobx';

import { calcSecLvl } from '../utils/trustFactor.js';
import { generateCarpoolArr, generateDifferenceArray } from './../utils/arrayCheck';

/*
 Provides a store for variables and methods for the matches page
 */
class matchesStore {
    // Array to store routes
    @observable routes = [];

    // Array to store all carpools
    @observable allCarpools = [];

    // Boolean to store whether or not routes are being loaded
    @observable loadingRoutes = true;

    // Array to store routes that will be recommended
    @observable recommendedRoutes = [];

    // Array to store carpools that will be recommended
    @observable recommendedCarpools = [];

    // Integer to store the maximum radius for carpools to be matched in km
    @observable maxRadius = 2;

    // Array to store the trust factor weights assigned the user of each of the recommended routes in order
    @observable trustFactorWeights = [];

    // Array to store the time weights assigned to each recommended route
    @observable timeWeights = [];

    /*
        Method to get all routes relevant to the user
        Makes API calls to get all the routes
     */
    @action getAllRoutes = (token, routeId) => {

        fetch('/api/system/route/getRecommendedRoutes?token=' + token + '&routeId=' + routeId,{ 
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then( json => {
            console.log(json)
            if(json) {
                if(json.success) {       
                    let { obj } = json;

                    if(obj.recommendedRoutes) {
                        this.recommendedRoutes = json.obj.recommendedRoutes;
                        this.loadingRoutes = false;
                    }
                    
                    if(obj.recommendedCarpools)
                        this.recommendedCarpools = json.obj.recommendedRoutes;
                }
            }

        })

        // fetch('/api/system/carpool/getAllOtherCarpools?routeId=' + routeId + '&token=' + token,{//Get all Carpools that current route isn't in
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        // })
        // .then(res => res.json())
        // .catch(error => console.error('Error:', error))
        // .then(json =>{
        //     if(json.success) {
        //         // Array to store carpools that are retrieved
        //         let carpools = json.data;

        //         this.filterCarpools(carpools,token); //remove Carpools that the user is already a part of
        //     }else{
        //         console.log("Unable to retrieve Carpools:" + json.message );
        //     }
        // });

        // fetch('/api/system/route/getOtherRoutes?token=' + token,{ //Get all OtherRoutes that are not the users
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        // })
        // .then(res => res.json())
        // .catch(error => console.error('Error:', error))
        // .then(json => {   
        //     if(json.success) {
        //         this.routes = json.data;
        //     }else{
        //         console.log("Unable to retrieve routes");
        //     }
        // });

        // fetch('/api/system/route/getRoute?routeId=' + routeId + '&token=' + token,{ //Get current route and compare with OtherRoutes
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        // })
        // .then(res => res.json())
        // .catch(error => console.error('Error:', error))
        // .then(json => {
        //     if(json.success) {
        //         this.filterRoutesByRadius(json.data[0], token);  
        //         this.generateTimeWeights(json.data[0]);
        //         this.getUsersAndGenerateTrustWeights(json.data[0], token);  // Reordering method is called through this function
        //         this.loadingRoutes = false;
        //     }else{
        //         console.log(json.message);
        //     }
        // });
    };

    /*
        Method to filter all routes by their radius
        Checks if the routes are within a specified radius from each other
        Calls helper functions calcDistance, updateRecommendedRoutes and updateRoutesCompared to do so
        Calls functions generateDifferenceArray and generateCarpoolArr in other file client/src/js/utils/arrayCheck.js
        to generate an array of differences and generate an array or relevant carpools
     */
    @action filterRoutesByRadius = (routeObj, token) => {
        // Longitudes, latitudes and radiuses
        let routeStartLat,routeStartLng,routeEndtLat,routeEndLng, startWithinRadius, endWithinRadius, startDistance, endDistance;

        // Array to store the differences between routes
        let differenceArray = [];

        // Array to store recommended routes
        let recRoutes = [];

        this.recommendedRoutes = []; //reset store

        differenceArray = generateDifferenceArray(routeObj.routesCompared, toJS(this.routes), false);
        this.recommendedRoutes = generateDifferenceArray(routeObj.recommended, toJS(this.routes), true);

        differenceArray.forEach(route => {
            routeStartLat = route.startLocation.lat;
            routeStartLng = route.startLocation.lng;
            routeEndtLat = route.endLocation.lat;
            routeEndLng = route.endLocation.lng;

            startWithinRadius =false;
            endWithinRadius =false;

            routeObj.waypoints.forEach(obj => {
                startDistance = this.calcDistance(obj.lat, obj.lng, routeStartLat, routeStartLng);
                endDistance = this.calcDistance(obj.lat, obj.lng, routeEndtLat, routeEndLng);
                if(startDistance <= this.maxRadius) {
                    startWithinRadius = true;
                }
                if(endDistance <= this.maxRadius) {
                    endWithinRadius = true;
                }
            });

            if(startWithinRadius && endWithinRadius) {
                this.recommendedRoutes.push(route);
                recRoutes.push(route);
            }
        });

        if(this.allCarpools.length) {
            this.recommendedCarpools = generateCarpoolArr(this.allCarpools, this.recommendedRoutes);
        }

        if(recRoutes.length > 0) {
            this.updateRecommendedRoutes(recRoutes, routeObj._id, token);
        }
        if(differenceArray.length > 0) {
            this.updateRoutesCompared(differenceArray, routeObj._id, token);
        }

    };

    /*
        Helper function to filter carpools
        Makes an API call to getRoutes in order to filter carpools by relevance
        Takes the caproolArr and the user's ID as arguments
     */
    @action filterCarpools = (carpoolArr, token) => { //remove Carpools that the user is already a part of
        this.allCarpools = []; //reset carpool
        fetch('/api/system/route/getRoutes?token='+token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success){
                carpoolArr.forEach(carpoolObj => {
                    // Boolean to store whether or not a route is contained in a carpool
                    let contains = false;

                    carpoolObj.routes.forEach(routId => {
                        json.data.forEach(routeObj => {
                            if(routeObj._id === routId) {
                                contains = true;
                            }
                        });
                    });
                    if(!contains) {
                        this.allCarpools.push(carpoolObj);
                    }
                })    
            }else{
                console.log(json.message);
            }
        });
    };

    /*
        Function that combines the weights of the time and trust factor and reorders the recommended
        routes to be in decsending order of the combined weight.
    */
    @action reorderRoutes = () => {
        let weights = [], count = 0, combinedWeight, i, j , size = this.recommendedRoutes.length, temp;

        this.timeWeights.forEach(weight => {
            combinedWeight = weight + this.trustFactorWeights.get(count);
            weights.push(combinedWeight);
            count++;
        });

        for (i = 0; i < size - 1; i++) {

            for (j = 0; j < (size - i - 1); j++) {

                if (weights[j] < weights[j + 1]) {
                    // swap the weights of the corresponding routes
                    temp = weights[j];
                    weights[j] = weights[j + 1];
                    weights[j + 1] = temp;

                    // swap the corresponding recommended routes
                    temp = this.recommendedRoutes[j];
                    this.recommendedRoutes[j] = this.recommendedRoutes[j + 1];
                    this.recommendedRoutes[j + 1] = temp;
                }

            }

        }

    }

    /*
        Function to generate the weight values associated with the time difference between
        each of the recommended routes and the users route. If the recommeneded route is at the 
        same time as the users route, it is assigned a weight of 1. For recommended routes that
        are before the users route, 0.1 is subtracted from 1 for every 30 minutes difference. And
        for recommended routes that are after, 0.1 is subtracted from 1 for every 15 minutes
        difference. This is because a recommended route that is before the users specified time 
        is preferable to a route that is after.
     */
    @action generateTimeWeights = (routeObj) => {
        const beforeTime = 30, afterTime = 15, timeMultiplier = 0.1;
        // time difference between routeObj and recRoute in minutes
        let timeDifferences = [], timeWeight;

        this.timeWeights = [];

        this.recommendedRoutes.forEach(route => {
            timeDifferences.push(this.calcTimeDifference(routeObj.time, route.time));
        });

        timeDifferences.forEach(time => {
            timeWeight = 1;

            if(time < 0) {  // Recommended route time before users route time
                
                timeWeight -= ((Math.abs(time) / beforeTime)|0) * timeMultiplier;

            }else if(time > 0) {    // Recommended route time after users route time
                
                timeWeight -= ((time / afterTime)|0) * timeMultiplier
            }
            
            this.timeWeights.push(timeWeight);
        });
    };

    /*
        Get the user objects of each of the users of the recommended routes and stores then in the
        'userObjs' array, then calls the 'generateTrustFactorWeights' using the 'userObjs' array.
    */
   @action getUsersAndGenerateTrustWeights = (routeObj, token) => {
        let userIds = [], userObjs = [];

        this.recommendedRoutes.forEach(route => {
            userIds.push(route.userId);
        });

        fetch('/api/account/profile/getSelectUsers?userIds=' + JSON.stringify(userIds) + '&token=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((json) => {

            if(json.success) {
                json.data.forEach(user => {
                    userObjs.push(user);   
                });

                fetch('/api/account/vouch/getVouches?idFor=' + routeObj.userId + '&token=' + token)
                .then(res => res.json())
                .catch(error => console.error('Error: ', error))
                .then((json) => {
                    if (json.success) {
                        this.generateTrustFactorWeights(userObjs, json.data);
                    }
                });

            }else{
                console.log(json.message);
            }

        });
    }

    /*
        Function that generates the weight of the trust factor of each of the users of the recommeneded routes
        and stores these computed weights in the 'trustFactorWeights' array. Weight is calculated by scaling the
        trust factor to a range of [0,1]. Calls the 'reorderRoutes' function after the weights have been calculated 
        and stored.
    */
    @action generateTrustFactorWeights = (userObjs, vouches) => {
        let trustFactors = [], scaledTrustFactor, secLevels = [], count;
        
        this.trustFactorWeights = [];

        if(userObjs.length !== this.recommendedRoutes.length) {
            
            userObjs.forEach(user => {
                secLevels.push(calcSecLvl(user, vouches));
            });
            
            this.recommendedRoutes.forEach(route => {
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
                trustFactors.push(calcSecLvl(user, vouches));
            });
        }

        trustFactors.forEach(tf => {
            scaledTrustFactor = (1 - 0)*(tf - 0)/(5-0)+0;
            this.trustFactorWeights.push(scaledTrustFactor);
        });

        this.reorderRoutes();
    }

    /*
        Helper function to update the recommended routes for the current route
        Takes in the recommendedArray and the routeID as an argument
        Makes an API call to update the recommended routes in the database
     */
    @action updateRecommendedRoutes = (recommendedArray, routeId, token) => {
        // Array of route IDs
        let arrRouteId = [];

        recommendedArray.forEach(element => {
            arrRouteId.push(element._id);
        });

        fetch('/api/system/route/updateRecommendedRoutes?token=' + token,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                arrRouteId: arrRouteId,
                _id: routeId
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(!json.success) {
                console.log(json.message);
            }
        }) 
    };

    /*
        Helper function to update the routes that have been compared to this route to ensure it doesn't happen again
        Takes in the differenceArray as an argument to compare and the routeID
     */
    @action updateRoutesCompared = (differenceArray, routeId, token) => {
        // Array of route IDs
        let arrRouteId = [];

        differenceArray.forEach(element => {
            arrRouteId.push(element._id);
        });

        fetch('/api/system/route/updateRoutesCompared?token=' + token,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                arrRouteId: arrRouteId,
                _id: routeId
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(!json.success) {
                console.log(json.message);
            }
        }) 
    };

    /*
        Helper function to calculate the distance between two points
        Takes in long and lat for both points as an argument
        Calls helper function degreesToRadians to make a conversion
        Returns the distance as a double
     */
    @action calcDistance = (lat1, lng1, lat2, lng2) => {
        // Integer radius of the earth
        let earthRadiusKm = 6371;

        // Destination latitude in radians
        let dLat = this.degreesToRadians(lat2 - lat1);

        // Destination longitude in radians
        let dLon = this.degreesToRadians(lng2 - lng1);

        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        let a = Math.sin(dLat/2) * Math.sin(dLat / 2) +
                Math.sin(dLon/2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return earthRadiusKm * c;
    };

    /*
        Helper function to convert the measurement in degrees to radians
        Returns integer value as radians
     */
    @action degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    /*
        Method to calculate the difference between the times in minutes
        Calls helper function to convert time to minutes
        Returns the absolute calculated difference as an integer
     */
    @action calcTimeDifference = (objRouteTime, routeTime) => {
        // Current route time in minutes
        let currRouteTime = this.convertTime(objRouteTime);

        // Recommended route time in minutes
        let recRouteTime = this.convertTime(routeTime);
        
        // return Math.abs(recRouteTime - currRouteTime);
        return (recRouteTime - currRouteTime);
    };
    
    /*
        Method to convert time to minutes
        Returns the time of the route converted into minutes
     */
    @action convertTime = (sTime) => {
        // Array for time that has been split by ':'
        let arrTime = sTime.split(':');

        arrTime[0] = parseInt(arrTime[0], 10);
        arrTime[1] = parseInt(arrTime[1], 10);
        return ((arrTime[0] * 60) + arrTime[1]);
    };
}

// Singleton instance of MatchesStore class
const  MatchesStore = new matchesStore();
export default MatchesStore;

