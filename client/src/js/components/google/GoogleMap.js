//File Type: Google Map Component

import { compose, withProps, lifecycle } from 'recompose';
import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import React from 'react';

/*
 * Purpose: the google maps component that shows the map with the selected route(s).
 */
const GoogleMapComponent = compose(
    
    /*
     * Purpose: specificies the properties of the map component and the lifecycle methods.
     */
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `200px`, width: '350px', margin: 'auto' }} />,
        containerElement: <div style={{ height: `200px`, width: '350px', margin: 'auto'  }} />,
        mapElement: <div style={{ height: `200px`, width: '350px', margin: 'auto'  }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({

        /*
         * Purpose: renders the map component and creates the route(s) according to the provided coordinates.
         */
        componentDidMount() {
            let DirectionsService = new window.google.maps.DirectionsService();
            let numRoutes = this.props.coordsArray.coords.length;

            // let waypts = [{'location': new google.maps.LatLng(45.658197,-73.636333),'stopover':true},{'location': "3 Ploughmans lane, Eldoraigne",'stopover':true}];

            // if(combined){
            //     for(let i=1; i<numRoutes; i++){
            //         let wayptsOriObj = {
            //             'location': new window.google.maps.LatLng(this.props.coordsArray.coords[i].olat, this.props.coordsArray.coords[i].olng),
            //             'stopover':true
            //         }
            //         let wayptsDestObj = {
            //             'location': new window.google.maps.LatLng(this.props.coordsArray.coords[i].dlat, this.props.coordsArray.coords[i].dlng),
            //             'stopover':true
            //         }
            //         waypts.push(wayptsOriObj);
            //         waypts.push(wayptsDestObj);
            //     }
            // }

            DirectionsService.route({
                origin: new window.google.maps.LatLng(this.props.coordsArray.coords[0].olat, this.props.coordsArray.coords[0].olng),
                destination: new window.google.maps.LatLng(this.props.coordsArray.coords[0].dlat, this.props.coordsArray.coords[0].dlng),
                // waypoints:waypts,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {

                if(status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });           
                }else{
                    //  console.error(`error fetching directions ${result}`);
                }

            });  
            
            if(numRoutes >= 2) {
                DirectionsService.route({
                        origin: new window.google.maps.LatLng(this.props.coordsArray.coords[1].olat, this.props.coordsArray.coords[1].olng),
                        destination: new window.google.maps.LatLng(this.props.coordsArray.coords[1].dlat, this.props.coordsArray.coords[1].dlng),
                        // waypoints:waypts,
                        optimizeWaypoints: true,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    }, (result, status) => {

                        if(status === window.google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directionstwo: result
                            });           
                        }else{
                            //  console.error(`error fetching directions ${result}`);
                        }

                    }); 
            }

            if(numRoutes >= 3) {
                    DirectionsService.route({
                            origin: new window.google.maps.LatLng(this.props.coordsArray.coords[2].olat, this.props.coordsArray.coords[2].olng),
                            destination: new window.google.maps.LatLng(this.props.coordsArray.coords[2].dlat, this.props.coordsArray.coords[2].dlng),
                            // waypoints:waypts,
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        }, (result, status) => {

                            if(status === window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directionsthree: result
                                });           
                            }else{
                                //  console.error(`error fetching directions ${result}`);
                            }

                        }); 
            }

            if(numRoutes === 4) {
                    DirectionsService.route({
                            origin: new window.google.maps.LatLng(this.props.coordsArray.coords[3].olat, this.props.coordsArray.coords[3].olng),
                            destination: new window.google.maps.LatLng(this.props.coordsArray.coords[3].dlat, this.props.coordsArray.coords[3].dlng),
                            // waypoints:waypts,
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        }, (result, status) => {

                            if(status === window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directionsfour: result
                                });           
                            }else{
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