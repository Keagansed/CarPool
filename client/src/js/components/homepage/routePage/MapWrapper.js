import React, { Component } from 'react';
import RoutesStore from '../../../stores/RoutesStore';
import { observer } from "mobx-react";

import GoogleMapComponent from './GoogleMap';

@observer class MapWrapper extends Component{
    render(){
        let GoogleMap = ({coords}) => (
            <div>
                <GoogleMapComponent oLat={coords.olat} oLng={coords.olng} dLat={coords.dlat} dLng={coords.dlng} />
            </div>
        );

        let coords = {
            olat:RoutesStore.origin.lat,
            olng:RoutesStore.origin.lng,
            dlat:RoutesStore.destination.lat,
            dlng:RoutesStore.destination.lng
        };

        return(
            <div>
                <GoogleMap coords={coords}/>
            </div>
        );
        
        
    }
}

export default MapWrapper;