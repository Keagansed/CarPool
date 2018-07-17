/* Wrapper class around GoogleMapComponent (High Order Component) to allow for easy rerender of component when state variable changes */

import React, { Component } from 'react';
import { observer } from "mobx-react";

import GoogleMapComponent from './GoogleMap';

@observer class MapWrapper extends Component{
    render(){
        let coordsArray=[];
        let GoogleMap = (coordsArray) => ( 
            <GoogleMapComponent coordsArray = {coordsArray} />
        );

        if(this.props.routeArr){ //If statement to ensure routes aren't null due to asynchronousity 
            this.props.routeArr.forEach(routeObj => {
                let coords = {
                    olat:routeObj.origin.lat,
                    olng:routeObj.origin.lng,
                    dlat:routeObj.destination.lat,
                    dlng:routeObj.destination.lng
                };
                coordsArray.push(coords);
            });
        }
        
        if(coordsArray.length){
            return(
                <GoogleMap coords={coordsArray}/>
            ); 
        } else {
            return("");
        }

    }
}

export default MapWrapper;