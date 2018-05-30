import React, { Component } from 'react';
import { compose, withProps, lifecycle,withState,withHandlers } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";
import RoutesStore from '../../../stores/RoutesStore';
import { observable } from 'mobx';

const GoogleMapComponent = compose(
    // withState({
    //     mytest:{lat:0},
    // }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new window.google.maps.DirectionsService();
            const DirectionsService2 = new window.google.maps.DirectionsService();
            // this.setState({
            //     'mytest':4
            // });
            // alert(this.state.mytest);
            DirectionsService.route({
                origin: new window.google.maps.LatLng(this.props.oLat, this.props.oLng),
                destination: new window.google.maps.LatLng(this.props.dLat, this.props.dLng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });  
        }
    })
)(props =>
    <GoogleMap
    defaultZoom={7}
    defaultCenter={new window.google.maps.LatLng(-25.751435, 28.253808)}
    >
    {props.directions && <DirectionsRenderer directions={props.directions}  />}    
    </GoogleMap>
);


export default GoogleMapComponent;