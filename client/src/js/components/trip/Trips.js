// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import Trip from './Trip';
import TripStore from './../../stores/TripsStore';
import { getFromStorage } from '../../utils/localStorage.js'

/**
 * Purpose: An container to store and display all the Trip components of the user
 */
@observer class Trips  extends Component {
    
    componentDidMount(){
        TripStore.getTrip(getFromStorage('sessionKey').token);
    }

    render(){
        return(
            <div className="scroll-vert">
                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Upcoming Trips</h4>
                </div>

                {
                    TripStore.trips.map((trip) => {

                        if(new Date(trip.dateTime) > new Date()){
                            return(
                                <Trip trip={trip} key={Math.random()}/>
                            );
                        }

                        return( <div key={Math.random()}></div> );
                    })
                }

                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Past Trips</h4>
                </div>
                {
                    TripStore.trips.map((trip) => {

                        if(new Date(trip.dateTime) <= new Date()){
                            return(
                                <Trip trip={trip} key={Math.random()}/>
                            );
                        }
                        
                        return(<div key={Math.random()}></div>);
                    })
                }

            </div>
        );
    }
}

export default Trips;