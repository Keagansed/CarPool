import { action, observable, toJS } from 'mobx';
import { generateDifferenceArray, generateCarpoolArr } from './../utils/arrayCheck';

class matchesStore {
    
    @observable routes = [];
    @observable allCarpools = [];
    @observable loadingRoutes = true;
    @observable recommendedRoutes = [];
    @observable recommendedCarpools = [];
    @observable maxRadius = 2;
  
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
            if(json.success){
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
            if(json.success){
                this.routes = json.data;
                // this.loadingRoutes = false;
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
            if(json.success){
                this.filterRoutesByRadius(json.data[0]);  
                this.filterRoutesByTime(json.data[0]); 
                this.loadingRoutes = false;
            }else{
                // this.loadingRoutes = false;
                console.log(json.message);
            }
        });
    }

    @action filterRoutesByRadius = (routeObj) => {
        let routeStartLat,routeStartLng,routeEndtLat,routeEndLng, startWithinRadius, endWithinRadius, startDistance, endDistance;
        let differenceArray = [];
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
                if(startDistance <= this.maxRadius){
                    startWithinRadius = true;
                }
                if(endDistance <= this.maxRadius){
                    endWithinRadius = true;
                }
            });

            if(startWithinRadius && endWithinRadius){
                this.recommendedRoutes.push(route);
                recRoutes.push(route);
                
            }    
        });

        if(this.allCarpools.length){
            this.recommendedCarpools = generateCarpoolArr(this.allCarpools, this.recommendedRoutes);
            // console.log(toJS(this.recommendedCarpools));
        }

        // console.log(toJS(this.recommendedRoutes));
        if(recRoutes.length > 0){
            this.updateRecommendedRoutes(recRoutes, routeObj._id);
        }
        if(differenceArray.length > 0){
            this.updateRoutesCompared(differenceArray, routeObj._id);
        }

    }

    //================================================
    //=============== HELPER FUNCTIONS ===============
    //================================================

    @action filterCarpools = (carpoolArr, userId) => { //remove Carpools that the user is already a part of
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
                    let contains = false;
                    carpoolObj.routes.forEach(routId => {
                        json.data.forEach(routeObj => {
                            if(routeObj._id === routId){
                                contains = true;
                            }
                        });
                    })
                    if(!contains){
                        this.allCarpools.push(carpoolObj);
                    }
                })    
            }else{
                console.log(json.message);
            }
        });
    }

    @action filterRoutesByTime = (routeObj) => {
        let timeDifferences = [];   // time difference between routeObj and recRoute in minutes
        let size = this.recommendedRoutes.length;
        let temp, i, j;
        // console.log('Route TIme ' + routeObj.time);

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

        // this.recommendedRoutes.forEach(route => {
        //     let count = 0;
        //     console.log("RecRoute " + count + ': ' + route.routeName + " @ " + route.time);
        // });
    }

    @action updateRecommendedRoutes = (recommendedArray, routeId) => { 
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
            if(!json.success){
                console.log(json.message);
            }
        }) 
    }

    @action updateRoutesCompared = (differenceArray, routeId) => { 
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
            if(!json.success){
                console.log(json.message);
            }
        }) 
    }

    @action calcDistance = (lat1, lng1, lat2, lng2) => {
        let earthRadiusKm = 6371;

        let dLat = this.degreesToRadians(lat2-lat1);
        let dLon = this.degreesToRadians(lng2-lng1);

        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return earthRadiusKm * c;
    }

    @action degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }

    // calculates the difference between the times in minutes
    @action calcTimeDifference = (objRouteTime, routeTime) => {
        let currRouteTime = this.convertTime(objRouteTime);
        let recRouteTime = this.convertTime(routeTime);
        
        return Math.abs(recRouteTime - currRouteTime);
    }
    
    // returns the time of the route converted into minutes
    @action convertTime = (sTime) => {
        let arrTime = sTime.split(':');
        arrTime[0] = parseInt(arrTime[0], 10);
        arrTime[1] = parseInt(arrTime[1], 10);
        return ((arrTime[0] * 60) + arrTime[1]);
    }
}

const  MatchesStore = new matchesStore();
export default MatchesStore;

