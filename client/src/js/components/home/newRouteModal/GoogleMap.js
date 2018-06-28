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
            const DirectionsService = new window.google.maps.DirectionsService();
            
            DirectionsService.route(
                {
                    origin: new window.google.maps.LatLng(this.props.oLat, this.props.oLng),
                    destination: new window.google.maps.LatLng(this.props.dLat, this.props.dLng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {

                });  
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