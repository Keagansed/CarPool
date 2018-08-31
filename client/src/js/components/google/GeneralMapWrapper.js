// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import GoogleMapComponent from './NewMap';

/*  
 * Purpose: wrapper class around GoogleMapComponent (High Order Component) to allow for easy rerender 
 * of component when state variable changes.
 */
@observer class MapWrapper extends Component {

    /*
     * Purpose: renders the component in the DOM. 
     */
    render() {
        let coordsArray = [];
        let GoogleMap = (coordsArray) => ( 
            <GoogleMapComponent coordsArray={coordsArray} />
        );
        
        
        this.props.routeArr.forEach(routeObj => {
            // If statement to ensure routes aren't null due to asynchronousity.
            if(typeof(routeObj.origin) !== "undefined" && typeof(routeObj.destination) !== "undefined"){
                let coords = {
                    olat:routeObj.origin.lat,
                    olng:routeObj.origin.lng,
                    dlat:routeObj.destination.lat,
                    dlng:routeObj.destination.lng
                };
                coordsArray.push(coords);
            }       
        });

        
        if(coordsArray.length) {

            return(
                <GoogleMap coords={coordsArray}/>
            ); 

        }else{

            return("");
            
        }

    }
}

export default MapWrapper;