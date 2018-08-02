// File Type: Store

import { action, observable, toJS } from 'mobx';

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

    // Inmteger to store the maximum radius for carpools to be matched in km
    @observable maxRadius = 2;

    /*
        Method to get all routes relevant to the user
        Makes API calls to get all the routes
     */
    @action getAllRoutes = (token, routeId) => {
        fetch('/api/system/carpool/getAllOtherCarpools?routeId='+routeId,{//Get all Carpools that current route isn't in
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json =>{
            if(json.success) {
                // Array to store carpools that are retrieved
                let carpools = json.data;

                this.filterCarpools(carpools,token); //remove Carpools that the user is already a part of
            }else{
                console.log("Unable to retrieve Carpools:" + json.message );
            }
        });

        fetch('/api/system/Route/getOtherRoutes?userId=' + token,{ //Get all OtherRoutes that are not the users
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {   
            if(json.success) {
                this.routes = json.data;
            }else{
                console.log("Unable to retrieve routes");
            }
        });

        fetch('/api/system/Route/getRoute?_id='+routeId,{ //Get current route and compare with OtherRoutes
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success) {
                this.filterRoutesByRadius(json.data[0]);  
                this.filterRoutesByTime(json.data[0]); 
                this.loadingRoutes = false;
            }else{
                console.log(json.message);
            }
        });
    };

    /*
        Method to filter all routes by their radius
        Checks if the routes are within a specified radius from each other
        Calls helper functions calcDistance, updateRecommendedRoutes and updateRoutesCompared to do so
        Calls functions generateDifferenceArray and generateCarpoolArr in other file client/src/js/utils/arrayCheck.js
        to generate an array of differences and generate an array or relevant carpools
     */
    @action filterRoutesByRadius = (routeObj) => {
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
            this.updateRecommendedRoutes(recRoutes, routeObj._id);
        }
        if(differenceArray.length > 0) {
            this.updateRoutesCompared(differenceArray, routeObj._id);
        }

    };

    /*
        Helper function to filter carpools
        Makes an API call to getRoutes in order to filter carpools by relevance
        Takes the caproolArr and the user's ID as arguments
     */
    @action filterCarpools = (carpoolArr, userId) => { //remove Carpools that the user is already a part of
        this.allCarpools = []; //reset carpool
        fetch('/api/system/Route/getRoutes?userId='+userId,{
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
        Helper function to filter the routes by their time
        Takes in the routeObj as a parameter
     */
    @action filterRoutesByTime = (routeObj) => {
        // time difference between routeObj and recRoute in minutes
        let timeDifferences = [];

        // Integer size of the recommended routes array
        let size = this.recommendedRoutes.length;

        // Temp variable for sorting array as well as integers for counting in the loops
        let temp, i, j;

        this.recommendedRoutes.forEach(route => {
            timeDifferences.push(this.calcTimeDifference(routeObj.time, route.time));
        });

        for (i = 0; i < size - 1; i++) {
            for (j = 0; j < (size - i - 1); j++) {
                if (timeDifferences[j] > timeDifferences[j + 1]) {
                    // swap the time differences of the routes
                    temp = timeDifferences[j];
                    timeDifferences[j] = timeDifferences[j + 1];
                    timeDifferences[j + 1] = temp;

                    // swap the corresponding recommended routes
                    temp = this.recommendedRoutes[j];
                    this.recommendedRoutes[j] = this.recommendedRoutes[j + 1];
                    this.recommendedRoutes[j + 1] = temp;
                }
            }
        }
    };

    /*
        Helper function to update the recommended routes for the current route
        Takes in the recommendedArray and the routeID as an argument
        Makes an API call to update the recommended routes in the database
     */
    @action updateRecommendedRoutes = (recommendedArray, routeId) => {
        // Array of route IDs
        let arrRouteId = [];

        recommendedArray.forEach(element => {
            arrRouteId.push(element._id);
        });

        fetch('/api/system/Route/updateRecommendedRoutes',{
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
    @action updateRoutesCompared = (differenceArray, routeId) => {
        // Array of route IDs
        let arrRouteId = [];

        differenceArray.forEach(element => {
            arrRouteId.push(element._id);
        });

        fetch('/api/system/Route/updateRoutesCompared',{
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
        
        return Math.abs(recRouteTime - currRouteTime);
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

