import { observer } from "mobx-react";
import React, { Component } from 'react';
import { DirectionsRenderer,GoogleMap, withGoogleMap } from 'react-google-maps';

import MapStore from './../../stores/MapStore';

@observer class Map extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            directionArr :[]
        };
        
        this.defaultOptions = {
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            draggableCursor: 'default',
            draggingCursor: 'move'
        };

        this.MapStore = new MapStore();

        this.polyline1 = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 10
        };
        this.polyline2 = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 10
        };
        this.polyline3 = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 10
        };
        this.polyline4 = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 10
        };
    }
    
    componentDidMount() {
        
        const DirectionsService = new window.google.maps.DirectionsService();
        const coordsArray = this.props.coordsArray.coords;
        
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

        coordsArray.forEach((routeObj,index) => {
            
            DirectionsService.route({
                origin: new window.google.maps.LatLng(routeObj.olat, routeObj.olng),
                destination: new window.google.maps.LatLng(routeObj.dlat, routeObj.dlng),
                // waypoints:waypts,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                
                if(status === window.google.maps.DirectionsStatus.OK) {  
                    this.setState(prevState => ({
                        directionArr: [...prevState.directionArr,result]
                    }));
                    // this.MapStore.directionArr[index] = result
                }
                
            }); 
        });
        
        
    }

    render() {

        const arr = this.state.directionArr.map(dirObj => dirObj);
        
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter = { { lat: -25.751435, lng: 28.253808 } }
                defaultZoom = { 8 }
                options={{
                    ...this.defaultOptions
                }}
            >    
            
            <DirectionsRenderer  directions={arr[0]} options={{polylineOptions:this.polyline1}} />
            <DirectionsRenderer directions={arr[1]}  />
            <DirectionsRenderer directions={arr[2]}  />
            <DirectionsRenderer directions={arr[3]}  />
            </GoogleMap>
        ));

        return(
            <div>
            <GoogleMapExample
            loadingElement={<div style={{ height: `200px`, width: '350px', margin: 'auto' }} />}
            containerElement={ <div style={{ height: `200px`, width: '350px', margin: 'auto' }} />}
            mapElement={ <div style={{ height: `200px`, width: '350px', margin: 'auto' }} /> }
            />
            </div>
        );
    }
};
export default Map;