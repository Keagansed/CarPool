import React, { Component } from 'react';
import Trip from './Trip';

import {
    getFromStorage
} from '../../../utils/localStorage.js'

class Trips  extends Component {
    constructor(props){
        super(props);

        this.state ={trips: [], user:[]};
    }

    componentDidMount(){
        fetch('/api/system/getTrips?userID='+getFromStorage('sessionKey').token)
            .then(res => res.json())
            .then(json => this.setState({trips : json}));
    }

    render(){
        return(
            <div className="scroll-vert">
                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Upcoming Trips</h4>
                </div>
                {this.state.trips.map((trip) => {
                    if(new Date(trip.dateTime) > new Date())
                    {
                        return(
                            <Trip trip={trip} key={Math.random()}/>
                        );
                    }
                    return(<div key={Math.random()}></div>);
                })}
                <div className="pad-10px bg-whitelight txt-white">
                    <h4 className="mbottom-0">Past Trips</h4>
                </div>
                {this.state.trips.map((trip) => {
                    if(new Date(trip.dateTime) <= new Date())
                    {
                        return(
                            <Trip trip={trip} key={Math.random()}/>
                        );
                    }
                    return(<div key={Math.random()}></div>);
                })}

            </div>
        );
    }
}

export default Trips;