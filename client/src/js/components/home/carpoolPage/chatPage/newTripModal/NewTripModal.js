import React, { Component } from 'react';
import { observer } from "mobx-react";

import WeekdaySelector from './WeekdaySelector';
import TripsStore from '../../../../../stores/TripsStore'

import {
    getFromStorage
} from '../../../../../utils/localStorage.js'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

@observer class NewTripModal extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateDays = this.updateDays.bind(this);
        this.updateUsers = this.updateUsers.bind(this);

        this.state ={
            user:[],
            toggle: false
        };
    }

    updateTime = event => {
        let time = document.getElementById("inputTripTime").value;
        if(time)
        {
            let hours = time.split(":")[0];
            let minutes = time.split(":")[1];
            hours = hours % 12 || 12;
            hours = hours < 10 ? "0" + hours : hours;
            TripsStore.dateTime.setHours(hours,minutes,0,0);
        }
    };

    updateDate = event => {
        let date = new Date(document.getElementById("inputTripDate").value);
        TripsStore.dateTime.setDate(date.getDate());
        TripsStore.dateTime.setMonth(date.getMonth());
        TripsStore.dateTime.setYear(date.getFullYear());
    };

    updateDays = event => {
        TripsStore.days["mon"] = document.getElementById("weekday-mon").checked;
        TripsStore.days["tue"] = document.getElementById("weekday-tue").checked;
        TripsStore.days["wed"] = document.getElementById("weekday-wed").checked;
        TripsStore.days["thu"] = document.getElementById("weekday-thu").checked;
        TripsStore.days["fri"] = document.getElementById("weekday-fri").checked;
        TripsStore.days["sat"] = document.getElementById("weekday-sat").checked;
        TripsStore.days["sun"] = document.getElementById("weekday-sun").checked;
    };

    updateUsers = event =>
    {
        for(let user in this.props.users) {
            if (document.getElementById(user).checked){
                if (user === getFromStorage('sessionKey').token)
                    TripsStore.users[user] = true;
                else
                    TripsStore.users[user] = false;
            }
        }
    };

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    componentDidMount(){
        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
    }

    getUsername(_id)
    {
        for (let x in this.state.user) {
            if(this.state.user[x]._id === _id) {
                return this.state.user[x].firstName;
            }
        }

    }

    suggestTrip(){
        let days = "";
        if(document.getElementById("weekday-mon").checked)
            days = days + "Mon ";
        if(document.getElementById("weekday-tue").checked)
            days = days + "Tue ";
        if(document.getElementById("weekday-wed").checked)
            days = days + "Wed ";
        if(document.getElementById("weekday-thu").checked)
            days = days + "Thu ";
        if(document.getElementById("weekday-fri").checked)
            days = days + "Fri ";
        if(document.getElementById("weekday-sat").checked)
            days = days + "Sat ";
        if(document.getElementById("weekday-sun").checked)
            days = days + "Sun ";

        let userNames = "";
        let users = [];
        for(let user in this.props.users)
        {
            if(document.getElementById(user).checked){
                userNames = userNames + this.getUsername(user) + " ";
                users[user]=true;
            }
        }

        let messageContent = document.getElementById("inputTripDate").value + " @ " + document.getElementById("inputTripTime").value + "\r\n" +
        "Days: " + days + "\r\n" +
        "Members: " +  userNames;

        document.getElementById("inputTripTime").value = "";
        document.getElementById("inputTripDate").value = "";

        document.getElementById("weekday-mon").checked = false;
        document.getElementById("weekday-tue").checked = false;
        document.getElementById("weekday-wed").checked = false;
        document.getElementById("weekday-thu").checked = false;
        document.getElementById("weekday-fri").checked = false;
        document.getElementById("weekday-sat").checked = false;
        document.getElementById("weekday-sun").checked = false;

        for(let user in this.props.users)
        {
            document.getElementById(user).checked = false;
        }

        this.toggle();
        TripsStore.addTrip(this.props.suggestTrip,messageContent,users);
        // this.props.suggestTrip(messageContent, getFromStorage('sessionKey').token, users, TripsStore.tripID);
    }

    render(){
        let users = [];

        for(let user in this.props.users) {
            users.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6 txt-left">{this.getUsername(user)}</div><div className="col-6 vertical-right"><input id={user} onChange={this.updateUsers} type="checkbox"/></div>
                </div>
            );
        }

        var modal = [];
        modal.push(
            // Modal
            <div className="mx-auto" key={Math.random()}>
                <div key="0" className="modal" tabIndex="-1" role="dialog" id="newTripModal" style={this.state.toggle ? display : hide}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-aqua">
                                <h5 className="modal-title fw-bold">Suggest a Trip</h5>
                                <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <h6 className="fw-bold mx-auto">Time and Date</h6>
                                    </div>
                                    <div className="row padbot-10px">
                                        <input type="time" onChange={this.updateTime} className="col-5 form-control mx-auto brad-2rem" placeholder="Time" required="required" name="Time" id="inputTripTime"/>
                                        <input type="date" onChange={this.updateDate} className="col-5 form-control mx-auto brad-2rem" placeholder="Date" required="required" name="Date" id="inputTripDate"/>
                                    </div>
                                    <div className="row">
                                        <h6 className="fw-bold mx-auto">Repeat Weekly</h6>
                                    </div>
                                    <div className="row padbot-10px">
                                        <div className="mx-auto">
                                            <WeekdaySelector updateDays={this.updateDays}/>
                                        </div>
                                    </div>
                                    <div className="row bordbot-1px-dash-grey">
                                        <h6 className="fw-bold mx-auto">Participants</h6>
                                    </div>
                                    {users}
                                    <div className="row padtop-20px">
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <a onClick={() => this.suggestTrip()} className="btn btn-primary mx-auto width-100p brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnSuggestTrip">
                                                Suggest
                                            </a>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return(
            <div className="col-2 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center" onClick={this.toggle}>
                    <i className="fa fa-car"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default NewTripModal;