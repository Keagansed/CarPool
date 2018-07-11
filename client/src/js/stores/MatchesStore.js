import { action, observable, toJS } from 'mobx';

class matchesStore {
    
    @observable routes = [];
    // @observable allOfUsersRoutes = [];
    @observable loadingRoutes = true;
    @observable usersRoute = {};
    @observable recommendedRoutes = [];
    @observable maxRadius = 2;
  
    // @action getRoutes = (token, routeId) => {
    //     this.getAllRoutes(token, routeId);
        // this.setUsersRoute(routeId);
        // this.filterRoutesByRadius();
        // console.log("RecommendedRoutes: " );

    // }

    // @action setUsersRoute = (routeId) => {
    //     this.allOfUsersRoutes.map(route => {
    //         if (route._id === routeId){
    //             this.usersRoute = route;
    //             // console.log("usersRoute: " + this.usersRoute);
    //         }
    //     })

    // }

    @action getAllRoutes = (token, routeId) => {
        fetch('/api/system/recommendedRoutes/getOtherRoutes?userId=' + token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            
            if(json.success)
            {
                this.routes = json.data;
                this.loadingRoutes = false;
                // console.log(json.data)
            }else{
                console.log("Unable to retrieve routes");
            }
        });

        fetch('/api/system/recommendedRoutes/getUsersRoutes?userId=' + token +'&routeId='+routeId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success){
                // this.usersRoute = json.data[0];
                this.loadingRoutes = false;
                if(json.data.length === 1){
                    this.filterRoutesByRadius(json.data[0]);
                }
            }else{
                console.log(json.message);
            }
        });

    }

    @action filterRoutesByRadius = (userObj) => {
        let lat1, lng1, lat2, lng2;
        // console.log("UsersRoute: " + this.usersRoute);
        // lat1 = userObj.startLocation.lat;
        // lng1 = userObj.startLocation.lng;

        // console.log(toJS(this.routes));
        this.routes.map(route => {
            lat2 = route.startLocation.lat;
            lng2 = route.startLocation.lng;
        
            //loop through waypoints here (except endLocation), set lat1 and lng1 to waypoints lat and lng
            lat1 = userObj.startLocation.lat;
            lng1 = userObj.startLocation.lng;
            //////////////////////////////////////
        
            let startDistance = this.calcDistance(lat1 , lng1, lat2, lng2);
        
            // calculate distance between end points
            lat2 = route.endLocation.lat;
            lng2 = route.endLocation.lng;
        
            lat1 = userObj.endLocation.lat;
            lng1 = userObj.endLocation.lng;
        
            let endDistance = this.calcDistance(lat1,lng1,lat2,lng2);
        
            // console.log('Start Distance: ' + startDistance);
            // console.log('End Distance: ' + endDistance);
        
            if ((startDistance <= this.maxRadius) && (endDistance <= this.maxRadius)) {
                this.recommendedRoutes.push(route);
                // console.log("Added route: " + this.recommendedRoutes);
            }
        });

    }

    @action degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
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
}

const  MatchesStore = new matchesStore();
export default MatchesStore;

