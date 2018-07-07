/* Can display multple routes. Takes an array of coords */

import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";

const GoogleMapComponent = compose(
    
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `200px` }} />,
        containerElement: <div style={{ height: `200px` }} />,
        mapElement: <div style={{ height: `200px` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            let DirectionsService = new window.google.maps.DirectionsService();
            let numRoutes = this.props.coordsArray.coords.length;

            // let waypts = [{'location': "Centurion Mall",'stopover':true},{'location': "3 Ploughmans lane, Eldoraigne",'stopover':true}];
            DirectionsService.route(
            {
                origin: new window.google.maps.LatLng(this.props.coordsArray.coords[0].olat, this.props.coordsArray.coords[0].olng),
                destination: new window.google.maps.LatLng(this.props.coordsArray.coords[0].dlat, this.props.coordsArray.coords[0].dlng),
                // waypoints:waypts,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) 
                {
                    this.setState({
                        directions: result
                    });           
                } else {
                    //  console.error(`error fetching directions ${result}`);
                }
            });  
            
            if(numRoutes >= 2){
                DirectionsService.route(
                    {
                        origin: new window.google.maps.LatLng(this.props.coordsArray.coords[1].olat, this.props.coordsArray.coords[1].olng),
                        destination: new window.google.maps.LatLng(this.props.coordsArray.coords[1].dlat, this.props.coordsArray.coords[1].dlng),
                        // waypoints:waypts,
                        optimizeWaypoints: true,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) 
                        {
                            this.setState({
                                directionstwo: result
                            });           
                        } else {
                            //  console.error(`error fetching directions ${result}`);
                        }
                    }); 
            }
            if(numRoutes >= 3){
                    DirectionsService.route(
                        {
                            origin: new window.google.maps.LatLng(this.props.coordsArray.coords[2].olat, this.props.coordsArray.coords[2].olng),
                            destination: new window.google.maps.LatLng(this.props.coordsArray.coords[2].dlat, this.props.coordsArray.coords[2].dlng),
                            // waypoints:waypts,
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        }, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) 
                            {
                                this.setState({
                                    directionsthree: result
                                });           
                            } else {
                                //  console.error(`error fetching directions ${result}`);
                            }
                        }); 
            }
            if(numRoutes === 4){
                    DirectionsService.route(
                        {
                            origin: new window.google.maps.LatLng(this.props.coordsArray.coords[3].olat, this.props.coordsArray.coords[3].olng),
                            destination: new window.google.maps.LatLng(this.props.coordsArray.coords[3].dlat, this.props.coordsArray.coords[3].dlng),
                            // waypoints:waypts,
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        }, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) 
                            {
                                this.setState({
                                    directionsfour: result
                                });           
                            } else {
                                //  console.error(`error fetching directions ${result}`);
                            }
                        }); 
            }
        
            
            }
        })
        
    )(props =>
        
        <GoogleMap 
        defaultZoom={7} 
        defaultCenter={new window.google.maps.LatLng(-25.751435, 28.253808)}
        options={{
            ...defaultOptions
        }}
        >
        
        {props.directions && <DirectionsRenderer directions={props.directions}  />}
        {props.directionstwo && <DirectionsRenderer directions={props.directionstwo} />}     
        {props.directionsthree && <DirectionsRenderer directions={props.directionsthree}  />}  
        {props.directionsfour && <DirectionsRenderer directions={props.directionsfour}  />}  
        </GoogleMap>
    );
    const defaultOptions = {
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        draggableCursor: 'default',
        draggingCursor: 'move'
    };

    
    export default GoogleMapComponent;