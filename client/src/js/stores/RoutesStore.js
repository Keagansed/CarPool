import { action, observable  } from 'mobx';
import { waypointGenerator } from './../utils/waypointGenerator';

class routesStore {
    
    @observable routes = [];
    @observable routeSuccess = false;
    @observable loadingRoutes = true;
    
    @observable originResult = {};
    @observable destinationResult = {};
    
    @observable originName = "";
    @observable destinationName = "";
    
    @observable origin = {};
    @observable destination = {};
    
    @action setGoogleOriginResult = (result) =>
    {
        this.originResult = result;
        this.originName = result.formatted_address;
    }
    
    @action setGoogleDestinationResult = (result) =>
    {
        this.destinationResult = result;
        this.destinationName = result.formatted_address;
    }
    
    @action setOrigin = (origin) => {
        this.origin = origin;
    }
    
    @action setdestination = (destination) => {
        this.destination = destination;
    }
    
    @action getRoutes = (token) => {
        fetch('/api/system/route/getRoutes?userId=' + token,{
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
            }
            else
            {
                console.log("Unable to retrieve routes");
            }
        })
    }
    
/* 
Nature of code due to asynchronicity. The asynchronous callbacks of Googles geocoding library 
Detailed description: https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call/14220323#14220323
General solution: https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function 
*/
    
    @action newRoute = (token/*, startLocation, endLocation, days*/, time, routeName/*, repeat*/, routeSuccess = this.routeSuccess, routes = this.routes) => {
        
        waypointGenerator(this.originName, this.destinationName, this.origin, this.destination, time, routeName,
                function(originName, destinationName, origin, destination, Rtime, RrouteName, waypoints){

            const route = {
                userId: token,
                startLocation: {
                    name: originName,
                    lat: origin.lat,
                    lng: origin.lng
                },
                endLocation: {
                    name: destinationName,
                    lat: destination.lat,
                    lng: destination.lng
                },
                waypoints: waypoints,
                // days: days,
                time: Rtime,
                routeName: RrouteName,
                // repeat: repeat
                _id: Date.now
            }
            
            fetch('/api/system/route/newRoute',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    userId: token,
                    // startLocation: startLocation,
                    startLocation: {
                        name: originName,
                        lat: origin.lat,
                        lng: origin.lng
                    },
                    // endLocation: endLocation,
                    endLocation: {
                        name: destinationName,
                        lat: destination.lat,
                        lng: destination.lng
                    },
                    waypoints: waypoints,
                    // days: days,
                    time: Rtime,
                    routeName: RrouteName,
                    // repeat: repeat
                })
            }) 
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
                console.log(json);
                if(json.success === true) {
                    routeSuccess = true;
                    routes.push(route);
                }
                else{
                    window.alert("Failed to create new route");
                }
                
            }) 

        })
      

   

         
        
    }
    
}

const  RoutesStore = new routesStore();
export default RoutesStore;

