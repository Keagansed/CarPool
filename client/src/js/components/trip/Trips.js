// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import Trip from './Trip';
import TripsStore from '../../stores/TripsStore'
import { getFromStorage } from '../../utils/localStorage.js'

/**
 * Purpose: An container to store and display all the Trip components of the user
 */
@observer class Trips  extends Component {
    
    componentDidMount(){
        let obj = getFromStorage('sessionKey');
        let token;

        if(obj) {
            token = obj.token;
        }

        TripsStore.getFilteredTrips(token);
    }    

    renderPreviousTrips = () => {
        const prev = TripsStore.previousTrips.map((trip) =>             
            <Trip trip={trip} key={Math.random()}/>            
        )

        if(prev.length > 0) {
            return prev;
        }else {
            return "No Previous Trips"
        }
    } 

    renderUpcomingTrips = () => {
        const upcoming = TripsStore.upcomingTrips.map((trip) =>             
            <Trip trip={trip} key={Math.random()}/>
        )

        if(upcoming.length > 0) {
            return upcoming;
        }else {
            return "No Upcoming Trips"
        }
    } 

    render(){
        return(
            <div className="scroll-vert">
                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Upcoming Trips</h4>
                </div>

                <div className="txt-white">
                    {this.renderUpcomingTrips()}
                </div>

                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Past Trips</h4>
                </div>

                <div className="txt-white">
                    {this.renderPreviousTrips()}
                </div>
                
            </div>
        );
    }
}

export default Trips;