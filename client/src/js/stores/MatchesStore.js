// File Type: Store

import { action, observable } from 'mobx';

/*
 Provides a store for variables and methods for the matches page
 */
class matchesStore {
    // Array to store routes
    @observable routes = [];
<<<<<<< HEAD
    @observable allCarpools = [];
    @observable loadingRoutes = true;
    @observable recommendedRoutes = [];
    @observable recommendedCarpools = [];
    @observable maxRadius = 2;
  
    //Get all OtherRoutes that are not the users
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

        //Get current route and compare with OtherRoutes
        fetch('/api/system/Route/getRoute?_id='+routeId,{ 
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
=======
>>>>>>> staging

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

<<<<<<< HEAD
        // console.log(toJS(this.recommendedRoutes));
        if(recRoutes.length > 0){
            this.updateRecommendedRoutes(recRoutes, routeObj._id);
        }
        if(differenceArray.length > 0){
            this.updateRoutesCompared(differenceArray, routeObj._id);
        }
    }
=======
    // Array to store the trust factor weights assigned the user of each of the recommended routes in order
    @observable trustFactorWeights = [];

    // Array to store the time weights assigned to each recommended route
    @observable timeWeights = [];
>>>>>>> staging

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
            
            if(json) {
                if(json.success) {       
                    let { obj } = json;
                    if(obj.recommendedRoutes) {
                        this.recommendedRoutes = obj.recommendedRoutes;
                        this.loadingRoutes = false;
                    }
                    
                    if(obj.recommendedCarpools)
                        this.recommendedCarpools = obj.recommendedCarpools;
                }
            }

        })
<<<<<<< HEAD
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            // if(!json.success)
            console.log(json.message);
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
            // if(!json.success)
            console.log(json.message);
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
=======
    };
>>>>>>> staging
}

// Singleton instance of MatchesStore class
const  MatchesStore = new matchesStore();
export default MatchesStore;

