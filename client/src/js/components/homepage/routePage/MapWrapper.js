import React, { Component } from 'react';
import RoutesStore from '../../../stores/RoutesStore';
import { observer } from "mobx-react";

import GoogleMapComponent from './GoogleMap';

@observer class MapWrapper extends Component{
    constructor(){
        super()

        this.state = {
            loading: RoutesStore.destination
        }
    }
    refresh = ()=>{
        this.setState({
            loading:3
        })
    }
    render(){
        let load = RoutesStore.destination;
        // if(load !== {}){
        //     this.setState({loading:load});
        // }
        if(load.lat === undefined){
            return(
                <div>
                    <GoogleMapComponent oLat='-25.86518' oLng='28.160347' dLat='-25.7561672' dLng='28.231116199999974' />
                    <p>Testing: {RoutesStore.origin.lat}</p>
                    <p>Testing state: {this.state.loading.lng}</p>
                    <button onClick={this.refresh}>safd</button>
                </div>
            );
        }else{
            let olat = RoutesStore.origin.lat;
            let olng = RoutesStore.origin.lng;
            let dlat = RoutesStore.destination.lat;
            let dlng = RoutesStore.destination.lng;
            return(
                <div>
                    <GoogleMapComponent oLat={olat} oLng={olng} dLat={dlat} dLng={olng} />
                    <p>olat: {olat}</p>
                    <p>olng: {olng}</p>
                    <p>dlat: {dlat}</p>
                    <p>dlng: {dlng}</p>
                    <p>New Testing state: {this.state.loading.lng}</p>
                    <button onClick={this.refresh}>safd</button>
                </div>
            );
        }
        
    }
}

export default MapWrapper;