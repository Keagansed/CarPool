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

        // let coords2 = {
        //     olat:-25.841237,
        //     olng:28.135862999999972,
        //     dlat:-25.8564801,
        //     dlng:28.18624239999997
        // };

        // let coords3 = {
        //     olat:-25.871426,
        //     olng:28.13726299999996,
        //     dlat:-25.864881,
        //     dlng:28.15995900000007
        // };
        
        coordsArray.push(coords);
        // coordsArray.push(coords2);
        // coordsArray.push(coords3);
        // console.log(coordsArray);

        return(
            <GoogleMap coords={coordsArray} />
        ); 
    }
}

export default MapWrapper;