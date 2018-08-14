// File Type: Component

import React, { Component } from 'react';

import TripsStore from '../../stores/TripsStore'
import Trip from './Trip';
import { getFromStorage } from '../../utils/localStorage.js'

/**
 * Purpose: An container to store and display all the Trip components of the user
 */
class Trips  extends Component {
    constructor(props){
        super(props);

        this.state ={trips: [], user:[]};
    }

    componentDidMount(){
        fetch('/api/system/trip/getTrips?userID='+getFromStorage('sessionKey').token)
            .then(res => res.json())
            .then(json => this.setState({trips : json}));
    }

    addDays = function(days,date) {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    render(){
        return(
            <div className="scroll-vert">
                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Upcoming Trips</h4>
                </div>

                {
                    this.state.trips.map((trip) => {

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
                    this.state.trips.map((trip) => {


                        if(new Date(trip.dateTime) <= new Date()){
                            let date = new Date(trip.dateTime);
                            let dayOfWeek = date.getDay();
                            let sameDay = false;
                            let nextDay = null;
                            for(let day in trip.days){
                                if(trip.days[day] === true){
                                    if(sameDay){
                                        nextDay = day;
                                        break;
                                    }
                                    switch(day){
                                        case 'sun':
                                            if(dayOfWeek === 0){
                                                sameDay = true;
                                            }
                                            break;
                                        case 'mon':
                                            if(dayOfWeek === 1){
                                                sameDay = true;
                                            }
                                            break;
                                        case 'tue':
                                            if(dayOfWeek === 2){
                                                sameDay = true;
                                            }
                                            break;
                                        case 'wed':
                                            if(dayOfWeek === 3){
                                                sameDay = true;
                                            }
                                            break;
                                        case 'thu':
                                            if(dayOfWeek === 4){
                                                sameDay = true;
                                            }
                                            break;
                                        case 'fri':
                                            if(dayOfWeek === 5){
                                                sameDay = true;
                                            }
                                            break;
                                        case 'sat':
                                            if(dayOfWeek === 6){
                                                sameDay = true;
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                            if(nextDay === null){
                                for(let day in trip.days) {
                                    if (trip.days[day] === true) {
                                        nextDay = day;
                                        break;
                                    }
                                }
                            }

                            let nextDayNumber;

                            switch(nextDay){
                                case 'sun':
                                    nextDayNumber = 0;
                                    break;
                                case 'mon':
                                    nextDayNumber = 1;
                                    break;
                                case 'tue':
                                    nextDayNumber = 2;
                                    break;
                                case 'wed':
                                    nextDayNumber = 3;
                                    break;
                                case 'thu':
                                    nextDayNumber = 4;
                                    break;
                                case 'fri':
                                    nextDayNumber = 5;
                                    break;
                                case 'sat':
                                    nextDayNumber = 6;
                                    break;
                                default:
                                    break;
                            }

                            let newDate;

                            if(nextDayNumber <= dayOfWeek){
                                newDate = this.addDays((7-dayOfWeek+nextDayNumber), trip.dateTime);
                            }else{
                                newDate = this.addDays((nextDayNumber-dayOfWeek), trip.dateTime);
                            }

                            let tripExists = false;
                            for(let trip in this.state.trips){
                                let tripDate = new Date(this.state.trips[trip].dateTime);
                                if(tripDate.getTime() === newDate.getTime()){
                                    tripExists = true;
                                }
                            }

                            if(!tripExists){
                                TripsStore.tripName = trip.tripName;
                                TripsStore.carpoolID = trip.carpoolID;
                                TripsStore.idBy = trip.idBy;
                                TripsStore.dateTime = newDate;
                                TripsStore.days = trip.days;
                                TripsStore.users = trip.users;
                                TripsStore.addTripWithoutFirebase();
                                fetch('/api/system/trip/getTrips?userID='+getFromStorage('sessionKey').token)
                                    .then(res => res.json())
                                    .then(json => this.setState({trips : json}));
                            }

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