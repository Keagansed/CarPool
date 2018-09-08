// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TripsStore from './../../stores/TripsStore';

import CancelTripModal from './CancelTripModal';
import MapComponent from '../google/GeneralMapWrapper';
import ReviewTripModal from './ReviewTripModal';
import { getFromStorage } from '../../utils/localStorage.js';

/**
 * Purpose: An interface to allow the user to set up a Trip with members inside a Carpool
 */
@observer class TripPage extends Component{
    constructor(){
        super();

        this.state = {
            loading: true,
        };

        this.routeArr = [];
        this.reviewModal = [];
    }

    componentDidMount() {

        this.setState({
            loading: false,
        })

        const token = getFromStorage('sessionKey').token;
        
        TripsStore.getAllUsers(token);
        TripsStore.getAllTripData(token, this.props.match.params.tripID);
    
    }

    getDateTime = ()=> {
        try{
            let dateTime = new Date(TripsStore.tripObj.dateTime);

            //get time
            let hours = dateTime.getHours();
            let minutes = dateTime.getMinutes();
            if(minutes < 10)
                minutes = "0" + minutes;
            if(hours < 10)
                hours = "0" + hours;
            let time = hours + ":" + minutes;

            //get date
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let day = dateTime.getDate();
            let dayNameNumber = dateTime.getDay();
            let month = dateTime.getMonth();
            let year = dateTime.getFullYear();
            let date = days[dayNameNumber] + " " + day + " " + monthNames[month] + " " + year;
            return date + " @ " + time;
        }
        catch (e){}
    }

    render(){
        let tripName;
        let carpoolers = [];
        let driver = [];

        let origin, destination;
        console.log('TCL: render -> TripsStore.routeObj', TripsStore.routeObj);

        if(typeof(TripsStore.routeObj.startLocation) !== "undefined"){
            origin = TripsStore.routeObj.startLocation.name;
            destination = TripsStore.routeObj.endLocation.name;

            this.routeArr = [...this.routeArr, {
                origin: TripsStore.routeObj.startLocation,
                destination: TripsStore.routeObj.endLocation
            }];

        }

        try{
            tripName = TripsStore.tripObj.tripName;
            for(let user in TripsStore.tripObj.users){
                if(user !== TripsStore.tripObj.driver){
                    if(TripsStore.tripObj.users[user] === true)
                        carpoolers.push(
                            <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                                <div className="col-6 txt-left">
                                    {TripsStore.getUsernameSurname(user)}
                                </div>
                                <div className="col-6 vertical-right">
                                    <a href={"/ProfilePage/"+user}>View Profile</a>
                                </div>
                            </div>
                        );
                }else{
                    driver.push(
                        <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                            <div className="col-6 txt-left">
                                {TripsStore.getUsernameSurname(user)}
                            </div>
                            <div className="col-6 vertical-right">
                                <a href={"/ProfilePage/"+user}>View Profile</a>
                            </div>
                        </div>
                    );
                }
            }

            if(new Date(TripsStore.tripObj.dateTime) < new Date()) {
                this.reviewModal = (<ReviewTripModal trip={TripsStore.tripObj} userList={TripsStore.allUsers}/>);
            }else{
                this.reviewModal = (<CancelTripModal trip={TripsStore.tripObj} userList={TripsStore.allUsers}/>);
            }

        }
        catch(E) {}
        
        // TODO: add logic... if trip is NOT live, return this, else return live trip details
        // For now: to see live route interface change line below to "if (false) {"
        if (true) {
            return(
                <div className="size-100 bg-purple">
                        <div className="fixed-top container-fluid height-50px bg-aqua">
                            <div className="row font-20px height-100p">
                                <Link to={`/HomePage`} className="col-2 txt-center">
                                    <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                        <i className="fa fa-chevron-circle-left txt-center"></i>
                                    </button>
                                </Link>
                                <div className="col-8 txt-center">
                                    <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                        {tripName}
                                    </button>
                                </div>
                                {this.reviewModal}
                            </div>
                        </div>
                        {/* Padding is there for top and bottom navs*/}
                        <div className="padtop-50px container-fluid">
                            <div className="row mtop-10px">
                                <h6 className="fw-bold mx-auto txt-white">Date and Time</h6>
                            </div>
                            <div className="row">
                                <div className="mx-auto txt-white">{this.getDateTime()}</div>
                            </div>
                            <div className="row mtop-10px">
                                <h6 className="fw-bold mx-auto txt-white">Route Details</h6>
                            </div>
                            <div className="row">
                                <div className="mx-auto padhor-5px txt-white txt-center">
                                    <div><span className="fw-bold mx-auto txt-white">From: </span>{origin}</div>
                                    <div><span className="fw-bold mx-auto txt-white">To: </span>{destination}</div>
                                </div>
                            </div>

                            <MapComponent routeArr={this.routeArr}/>

                            <div className="row mtop-10px bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto txt-white">Driver</h6>
                            </div>

                            { driver }

                            <div className="row mtop-10px bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto txt-white">Other Carpoolers</h6>
                            </div>

                            { carpoolers }
                        </div>
                </div>
            );
        }else{
            return(
                <div className="size-100 bg-purple">
                        <div className="fixed-top container-fluid height-50px bg-aqua">
                            <div className="row font-20px height-100p">
                                <Link to={`/HomePage`} className="col-2 txt-center">
                                    <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                        <i className="fa fa-chevron-circle-left txt-center"></i>
                                    </button>
                                </Link>
                                <div className="col-8 txt-center">
                                    <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                        {tripName}
                                    </button>
                                </div>
                                <div className="col-2 txt-center">
                                    <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                        <i className="fa fa-asterisk"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Padding is there for top and bottom navs*/}
                        <div className="padtop-50px container-fluid">
                            <div className="row mtop-10px">
                                <h6 className="fw-bold mx-auto txt-white">This trip is live</h6>
                            </div>
                            <div className="row">
                                <div className="mx-auto txt-white mbottom-10px">The driver is picking up John Carpenter next.</div>
                                {/* Other examples...
                                <div className="mx-auto txt-white mbottom-10px">The driver is picking you up next.</div>
                                <div className="mx-auto txt-white mbottom-10px">The driver is dropping you John Carpenter next.</div>
                                <div className="mx-auto txt-white mbottom-10px">The driver is dropping you off next.</div>
                                <div className="mx-auto txt-white mbottom-10px">You need to pick up John Carpenter next.</div> */}
                            </div>

                            <MapComponent routeArr={this.routeArr}/>

                            <div className="row mtop-10px bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto txt-white">Driver</h6>
                            </div>
                            {driver}
                            <div className="row mtop-10px bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto txt-white">Other Carpoolers</h6>
                            </div>
                            {carpoolers}
                        </div>
                </div>
            );
        }
    }
}

export default TripPage;