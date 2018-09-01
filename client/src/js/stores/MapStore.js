// File Type: Store
import React from 'react';
import { action, observable, toJS } from 'mobx';
import { DirectionsRenderer } from 'react-google-maps';

class RouteStore {

    DirectionsService
    constructor(){

        this.DirectionsService = new window.google.maps.DirectionsService();
    }

    
    @observable directionArr = [];

   
    @action generateDirectionArr = (coordsArray) =>{
        coordsArray.forEach((routeObj) => {
            
            this.DirectionsService.route({
                origin: new window.google.maps.LatLng(routeObj.olat, routeObj.olng),
                destination: new window.google.maps.LatLng(routeObj.dlat, routeObj.dlng),
                // waypoints:waypts,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                
                if(status === window.google.maps.DirectionsStatus.OK) {  
                    let dirObj = <DirectionsRenderer directions={result} />
                    this.directionArr.push(dirObj);
                }
                
            }); 
        });
    }

    @action returnArr = () =>{
        return toJS(this.directionArr)
    }
}

export default RouteStore;

