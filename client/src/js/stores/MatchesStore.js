import { action, observable, toJS } from 'mobx';
import { generateDifferenceArray } from './../utils/arrayCheck';

class matchesStore {
    
    @observable routes = [];
    @observable loadingRoutes = true;
    @observable recommendedRoutes = [];
    @observable maxRadius = 2;
  
    //Get all OtherRoutes that are not the users
    @action getAllRoutes = (token, routeId) => {
        fetch('/api/system/Route/getOtherRoutes?userId=' + token,{ 
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
            if(json.success && json.data.length === 1){
                this.filterRoutesByRadius(json.data[0]);   
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

        if(recRoutes.length > 0){
            this.updateRecommendedRoutes(recRoutes, routeObj._id);
        }
        if(differenceArray.length > 0){
            this.updateRoutesCompared(differenceArray, routeObj._id);
        }
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
}

const  MatchesStore = new matchesStore();
export default MatchesStore;

