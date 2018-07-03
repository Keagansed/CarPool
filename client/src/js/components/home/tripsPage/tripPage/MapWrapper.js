/* Wrapper class around GoogleMapComponent (High Order Component) to allow for easy rerender of component when state variable changes */

import React, { Component } from 'react';
import { observer } from "mobx-react";

import GoogleMapComponent from './GoogleMap';

@observer class MapWrapper extends Component{
    render(){
        let GoogleMap = ({coords}) => ( 
            <GoogleMapComponent oLat={coords.olat} oLng={coords.olng} dLat={coords.dlat} dLng={coords.dlng} />
        );
        
        let coords = {
            olat:0,
            olng:0,
            dlat:0,
            dlng:0
        };
        
        return(
            <GoogleMap coords={coords}/>
        ); 
    }
}

export default MapWrapper;