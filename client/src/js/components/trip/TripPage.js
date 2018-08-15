// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            token: '',
            loading: true,
            trip:[],
            carpool:[],
            user:[]
        };

        this.from = "";
        this.longFrom = "";
        this.latFrom = "";
        this.to = "";
        this.longTo = "";
        this.latTo = "";
        this.reviewModal = [];
    }

    //========= Fetch Session Token ===========
    componentDidMount(){
        const obj = getFromStorage('sessionKey');
        const { token } = obj;

        this.props.store.token = token;

        this.setState({
            token,
            loading: false,
            routeArr:[]
        })

        

        fetch('/api/system/trip/getTrip?_id=' + this.props.match.params.tripID + '&token=' + this.state.token)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({trip : json.data});
                    fetch('/api/system/carpool/getCarpool?_id='+this.state.trip[0].carpoolID)
                        .then(res => res.json())
                        .then(json => {
                            fetch('/api/system/route/getRoute?_id='+json.data[0].routes[0])
                                .then(res => res.json())
                                .then(json => {
                                    // console.log(json.data[0]);
                                    this.from = json.data[0].startLocation.name;
                                    this.to = json.data[0].endLocation.name;
                                    this.setState({
                                        routeArr:[...this.state.routeArr,{
                                            origin : json.data[0].startLocation,
                                            destination : json.data[0].endLocation
                                        }]
                                    });
                                });
                        });
                    }
            });

        fetch('/api/account/profile/getAllUsers?token=' + this.state.token)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({user: json.data})
                }
            });
    }

    getUsernameSurname = (_id)=> {
        for (let x in this.state.user) {
            if(this.state.user[x]._id === _id) {
                return this.state.user[x].firstName + " " + this.state.user[x].lastName;
            }
        }
    }

    getDateTime = ()=> {
        try{
            let dateTime = new Date(this.state.trip[0].dateTime);

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
        try{
            tripName = this.state.trip[0].tripName;
            for(let user in this.state.trip[0].users){
                if(user !== this.state.trip[0].driver){
                    if(this.state.trip[0].users[user] === true)
                        carpoolers.push(
                            <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                                <div className="col-6 txt-left">{this.getUsernameSurname(user)}</div><div className="col-6 vertical-right"><a href={"/ProfilePage/"+user}>View Profile</a></div>
                            </div>
                        );
                }else{
                    driver.push(
                        <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                            <div className="col-6 txt-left">{this.getUsernameSurname(user)}</div><div className="col-6 vertical-right"><a href={"/ProfilePage/"+user}>View Profile</a></div>
                        </div>
                    );
                }
            }

            if(new Date(this.state.trip[0].dateTime) < new Date()) {
                this.reviewModal = (<ReviewTripModal trip={this.state.trip[0]} user={this.state.user}/>);
            }else{
                this.reviewModal = (<CancelTripModal trip={this.state.trip[0]} user={this.state.user}/>);
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
                                    <div><span className="fw-bold mx-auto txt-white">From: </span>{this.from}</div>
                                    <div><span className="fw-bold mx-auto txt-white">To: </span>{this.to}</div>
                                </div>
                            </div>
                            <MapComponent routeArr={this.state.routeArr}/>
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
                            <MapComponent routeArr={this.state.routeArr}/>
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