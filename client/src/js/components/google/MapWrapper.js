// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import RoutesStore from '../../stores/RoutesStore';

import GoogleMapComponent from './GoogleMap';

/*
 * Purpose: wrapper class around GoogleMapComponent (High Order Component) to allow for easy rerender of component when state variable changes
 */
@observer class MapWrapper extends Component{

    /*
     * Purpose: renders the wrapper which implements the google map component .
     */
    render(){
        let coordsArray = [];
        let GoogleMap = (coordsArray) => ( 
            <GoogleMapComponent coordsArray={coordsArray} />
        );
        
        let coords = {
            olat:RoutesStore.origin.lat,
            olng:RoutesStore.origin.lng,
            dlat:RoutesStore.destination.lat,
            dlng:RoutesStore.destination.lng
        };
        
        coordsArray.push(coords);
  
        return(
            <GoogleMap coords={coordsArray} />
        ); 
    }
}

export default MapWrapper;