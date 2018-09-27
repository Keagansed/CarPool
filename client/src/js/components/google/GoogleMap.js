import { observer } from "mobx-react";
import React, { Component } from 'react';
import { DirectionsRenderer,GoogleMap, withGoogleMap } from 'react-google-maps';

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

        this.polyline1 = {
            strokeColor: '#7D3C98',
            strokeOpacity: 1.0,
            strokeWeight: 2.5
        };
        this.polyline2 = {
            strokeColor: '#138D75',
            strokeOpacity: 0.7,
            strokeWeight: 10
        };
        this.polyline3 = {
            strokeColor: '#2E86C1',
            strokeOpacity: 0.5,
            strokeWeight: 17.5
        };
        this.polyline4 = {
            strokeColor: '#D4AC0D',
            strokeOpacity: 0.2,
            strokeWeight: 17.5
        };

        this.mounted = true; 
        
    }
    
    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();
        let coordsArray = this.props.coordsArray.coords;

        if(this.props.combined){ 
            let wayPointsArr = [];
            
            const origin = new window.google.maps.LatLng(coordsArray[0].lat, coordsArray[0].lng);
            const destination = new window.google.maps.LatLng(coordsArray[coordsArray.length-1].lat, coordsArray[coordsArray.length-1].lng);
        
            for(let i = 1; i < coordsArray.length-1; i++){
                const wayPointObj = {
                    'location': new window.google.maps.LatLng(coordsArray[i].lat, coordsArray[i].lng),
                    'stopover':true
                }
                wayPointsArr.push(wayPointObj);
            }

            DirectionsService.route({
                origin: origin,
                destination: destination,
                waypoints:wayPointsArr,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                
                if(this.mounted && status === window.google.maps.DirectionsStatus.OK ) {  

                    this.setState(prevState => ({
                        directionArr: [...prevState.directionArr,result]
                    }));
                    
                }   
                
            }); 

        }else{
            coordsArray.forEach((routeObj) => {
            
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(routeObj.olat, routeObj.olng),
                    destination: new window.google.maps.LatLng(routeObj.dlat, routeObj.dlng),
                    // waypoints:waypts,
                    optimizeWaypoints: true,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    
                    if(this.mounted && status === window.google.maps.DirectionsStatus.OK ) {  
    
                        this.setState(prevState => ({
                            directionArr: [...prevState.directionArr,result]
                        }));
                        
                    }   
                    
                }); 
            });
        }
          
    }

    componentWillUnmount(){
        this.mounted =false;        
    }

    render() {
        const arr = this.state.directionArr.slice();

        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter = { { lat: -25.751435, lng: 28.253808 } }
                defaultZoom = { 8 }
                options={{
                    ...this.defaultOptions
                }}
            >    
                <DirectionsRenderer directions={arr[0]} options={{polylineOptions:this.polyline1}}  />
                <DirectionsRenderer directions={arr[1]} options={{polylineOptions:this.polyline2}}  />
                <DirectionsRenderer directions={arr[2]} options={{polylineOptions:this.polyline3}}  />
                <DirectionsRenderer directions={arr[3]} options={{polylineOptions:this.polyline4}}  />
            </GoogleMap>
        ));

        return(
            <div>
            <GoogleMapExample
            loadingElement={<div style={{ height: `200px`, width: '100%', margin: 'auto' }} >Loading...</div>}
            containerElement={ <div style={{ height: `200px`, width: '100%', margin: 'auto' }} />}
            mapElement={ <div style={{ height: `200px`, width: '100%', margin: 'auto' }} /> }
            />
            </div>
        );
    }
};
export default Map;

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