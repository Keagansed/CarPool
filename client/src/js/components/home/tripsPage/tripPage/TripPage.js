import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';

import { getFromStorage } from './../../../../utils/localStorage.js';
import ReviewTripModal from './reviewTripModal/ReviewTripModal';
import CancelTripModal from './cancelTripModal/CancelTripModal';
import MapComponent from './../../GeneralMapWrapper';

@observer class TripPage extends Component{

    constructor(){
        super();

        this.state = {
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
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                        routeArr:[]
                    })
                }
            })
        }

        fetch('/api/system/getTrip?_id='+this.props.match.params.tripID)
            .then(res => res.json())
            .then(json => {
                this.setState({trip : json});
                fetch('/api/system/carpool/getCarpool?_id='+this.state.trip[0].carpoolID)
                    .then(res => res.json())
                    .then(json => {
                        fetch('/api/system/route/getRoute?_id='+json.data[0].routes[0])
                            .then(res => res.json())
                            .then(json => {
                                // console.log(json.data[0]);
                                this.from = json.data[0].startLocation.name;
                                this.to = json.data[0].startLocation.name;
                                this.setState({
                                    routeArr:[...this.state.routeArr,{
                                        origin : json.data[0].startLocation,
                                        destination : json.data[0].endLocation
                                    }]
                                });
                            });
                    });
            });

        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
    }

    getUsernameSurname(_id)
    {
        for (var x in this.state.user)
        {
            if(this.state.user[x]._id === _id)
            {
                return this.state.user[x].firstName + " " + this.state.user[x].lastName;
            }
        }

    }

    getDateTime(){
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
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let day = dateTime.getDate();
            let dayNameNumber = dateTime.getDay();
            let month = dateTime.getMonth();
            let year = dateTime.getFullYear();
            let date = days[dayNameNumber] + " " + day + " " + monthNames[month] + " " + year;
            return date + " @ " + time;
        }
        catch (e){

        }
    }

    render(){
        let tripName;
        let carpoolers = [];
        let driver = [];
        try{
            tripName = this.state.trip[0].tripName;
            for(let user in this.state.trip[0].users)
            {
                if(user !== this.state.trip[0].driver){
                    if(this.state.trip[0].users[user] === true)
                        carpoolers.push(
                            <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                                <div className="col-6 txt-left">{this.getUsernameSurname(user)}</div><div className="col-6 vertical-right"><a href={"/ProfilePage/"+user}>View Profile</a></div>
                            </div>
                        );
                }
                else{
                    driver.push(
                        <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                            <div className="col-6 txt-left">{this.getUsernameSurname(user)}</div><div className="col-6 vertical-right"><a href={"/ProfilePage/"+user}>View Profile</a></div>
                        </div>
                    );
                }
            }
            if(new Date(this.state.trip[0].dateTime) < new Date()) {
                this.reviewModal = (<ReviewTripModal trip={this.state.trip[0]} user={this.state.user}/>);
            }
            else{
                this.reviewModal = (<CancelTripModal trip={this.state.trip[0]} user={this.state.user}/>);
            }
        }
        catch(E) {

        }
        
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
                            {/* If this trip is still upcoming the below component should be CancelTripModal **Still to be implemented */}
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
                        {/* <div className="row mtop-10px">
                            <h6 className="fw-bold mx-auto txt-white">Your Pickup</h6>
                        </div>
                        <div className="row">
                            <div className="mx-auto padhor-5px txt-white txt-center">08:05 @ 10 John Street, Pretoria, South Africa </div>
                            <div className="mx-auto padhor-5px txt-white txt-center">*** not sure how to do this</div>
                        </div> */}
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

export default TripPage;