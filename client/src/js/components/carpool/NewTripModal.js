// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import MessageStore from '../../stores/MessagingStore.js';
import TripsStore from '../../stores/TripsStore'
import WeekdaySelector from './WeekdaySelector';
import { getFromStorage } from '../../utils/localStorage.js'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
 * Purpose: modal component that provides an interface for a user to suggest a new trip for the carpool members
 */
@observer class NewTripModal extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' is the visibility of the modal.
     * 'user' contains all the users.
     */
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        };
    }

    /*
     * Purpose: acquires the provided time from the corresponding html element and updates the time of the suggested 
     * trip in the store.
     */
    updateTime = event => {
        let time = document.getElementById("inputTripTime").value;

        if (time) {
            let hours = time.split(":")[0];
            let minutes = time.split(":")[1];
            hours = hours % 12 || 12;
            hours = hours < 10 ? "0" + hours : hours;
            TripsStore.dateTime.setHours(hours, minutes, 0, 0);
        }

        TripsStore.tripName = this.props.carpoolName;
    };

    /*
     * Purpose: acquires the provided date from the corresponding html element and updates the date of the suggested trip
     * in the store.
     */
    updateDate = event => {
        let date = new Date(document.getElementById("inputTripDate").value);
        TripsStore.dateTime.setDate(date.getDate());
        TripsStore.dateTime.setMonth(date.getMonth());
        TripsStore.dateTime.setYear(date.getFullYear());
    };

    /*
     * Purpose: acquires the days that the trip will take place on and updates these days in the store.
     */
    updateDays = event => {
        TripsStore.days["mon"] = document.getElementById("weekday-mon").checked;
        TripsStore.days["tue"] = document.getElementById("weekday-tue").checked;
        TripsStore.days["wed"] = document.getElementById("weekday-wed").checked;
        TripsStore.days["thu"] = document.getElementById("weekday-thu").checked;
        TripsStore.days["fri"] = document.getElementById("weekday-fri").checked;
        TripsStore.days["sat"] = document.getElementById("weekday-sat").checked;
        TripsStore.days["sun"] = document.getElementById("weekday-sun").checked;
    };

    /*
     * Purpose: acquires the users that are to partake in the suggested trip and updates the store.
     */
    updateUsers = event => {

        for (let user in this.props.users) {

            if (user !== TripsStore.idBy && document.getElementById(user).checked) {

                if (user === getFromStorage('sessionKey').token) {
                    TripsStore.users[user] = true;
                } else {
                    TripsStore.users[user] = false;
                }

            }

        }

    };

    /*
     * Purpose: toggles the visibility of this modal component
     */
    toggle = (event) => {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     * Purpose: aqcuires the information provided in the html form elements and creates a new message and trip
     * suggestion with the information. Resets the modal form elements once the information has been acquired and
     * renders the modal invisible.
     */
    suggestTrip() {
        let days = "";

        if (document.getElementById("weekday-mon").checked) {
            days = days + "Mon ";
        }

        if (document.getElementById("weekday-tue").checked) {
            days = days + "Tue ";
        }

        if (document.getElementById("weekday-wed").checked) {
            days = days + "Wed ";
        }

        if (document.getElementById("weekday-thu").checked) {
            days = days + "Thu ";
        }

        if (document.getElementById("weekday-fri").checked) {
            days = days + "Fri ";
        }

        if (document.getElementById("weekday-sat").checked) {
            days = days + "Sat ";
        }

        if (document.getElementById("weekday-sun").checked) {
            days = days + "Sun ";
        }

        let userNames = "";
        let users = [];

        for (let user in this.props.users) {
            console.log(this.props.users[this.props.users.length - 1]);
            console.log(user);
            if (user !== TripsStore.idBy) {
                if (document.getElementById(user).checked) {
                    userNames = userNames + MessageStore.getUsername(user).substr(0, MessageStore.getUsername(user).indexOf(" ")) + ", ";
                    users[user] = true;
                }
            } else {
                userNames = userNames + MessageStore.getUsername(TripsStore.idBy).substr(0, MessageStore.getUsername(user).indexOf(" ")) + ", ";
                users[TripsStore.idBy] = true;
            }
        }
        userNames = userNames.substr(0, userNames.lastIndexOf(", "));

        let messageContent =
            document.getElementById("inputTripDate").value + " @ " + document.getElementById("inputTripTime").value + "\r\n" +
            "Days: " + days + "\r\n" +
            "Members: " + userNames;

        document.getElementById("inputTripTime").value = "";
        document.getElementById("inputTripDate").value = "";

        document.getElementById("weekday-mon").checked = false;
        document.getElementById("weekday-tue").checked = false;
        document.getElementById("weekday-wed").checked = false;
        document.getElementById("weekday-thu").checked = false;
        document.getElementById("weekday-fri").checked = false;
        document.getElementById("weekday-sat").checked = false;
        document.getElementById("weekday-sun").checked = false;

        for (let user in this.props.users) {
            if (user !== TripsStore.idBy)
                document.getElementById(user).checked = false;
        }

        this.toggle();
        TripsStore.carpoolID = this.props.carpoolID;
        TripsStore.addTrip(this.props.suggestTrip, messageContent, users, this.props.token);
    }

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        let users = [];

        for (let user in this.props.users) {
            if (user !== TripsStore.idBy) {
                users.push(
                    <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                        <div className="col-9 txt-left">{MessageStore.getUsername(user)}</div>
                        <div className="col-3 vertical-right">
                            <input id={user} onChange={this.updateUsers} type="checkbox" />
                        </div>
                    </div>
                );
            } else {
                TripsStore.users[user] = true;
                users.push(
                    <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                        <div className="col-9 txt-left">{MessageStore.getUsername(user)}</div>
                    </div>
                );
            }

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
                                        <h6 className="fw-bold mx-auto">First Time and Date</h6>
                                    </div>
                                    <div className="row padbot-10px">
                                        <input
                                            type="time"
                                            onChange={this.updateTime}
                                            className="col-5 form-control mx-auto brad-2rem"
                                            placeholder="Time"
                                            required="required"
                                            name="Time"
                                            id="inputTripTime"
                                        />
                                        <input
                                            type="date"
                                            onChange={this.updateDate}
                                            className="col-5 form-control mx-auto brad-2rem"
                                            placeholder="Date"
                                            required="required"
                                            name="Date"
                                            id="inputTripDate"
                                        />
                                    </div>
                                    <div className="row">
                                        <h6 className="fw-bold mx-auto">Repeat Weekly</h6>
                                    </div>
                                    <div className="row padbot-10px">
                                        <div className="mx-auto">
                                            <WeekdaySelector updateDays={this.updateDays} />
                                        </div>
                                    </div>
                                    <div className="row bordbot-1px-dash-grey">
                                        <h6 className="fw-bold mx-auto">Participants</h6>
                                    </div>
                                    {users}
                                    <div className="row padtop-10px">
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <a
                                                onClick={() => this.suggestTrip()}
                                                className="btn btn-primary mx-auto width-100p brad-2rem bg-aqua txt-purple fw-bold"
                                                id="btnSuggestTrip"
                                            >
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

        return (
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