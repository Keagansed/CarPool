/* Wrapper class around GoogleMapComponent (High Order Component) to allow for easy rerender of component when state variable changes */

import React, { Component } from 'react';
import { observer } from "mobx-react";

import GoogleMapComponent from './../../../GoogleMap';

@observer class MapWrapper extends Component{
    render(){
        let coordsArray=[];
        let coords ;
        let GoogleMap = (coordsArray) => ( 
            <GoogleMapComponent coordsArray = {coordsArray} />
        );
        
        if(this.props.origin && this.props.destination){
            coords = {
                olat:this.props.origin.lat,
                olng:this.props.origin.lng,
                dlat:this.props.destination.lat,
                dlng:this.props.destination.lng
            };
            coordsArray.push(coords);
            return(
                <GoogleMap coords={coordsArray}/>
            ); 
        }else{
            return("");
        }
        

        // console.log(this.props.origin);

       

        
    }
}

export default MapWrapper;