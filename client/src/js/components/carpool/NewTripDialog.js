// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import TripIcon from '@material-ui/icons/AddComment';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MessageStore from '../../stores/MessagingStore.js';
import TripsStore from '../../stores/TripsStore';
import { getFromStorage } from '../../utils/localStorage.js'

/*
 * Purpose: modal component that provides an interface for a user to suggest a new trip for the carpool members
 */
@observer class NewTripDialog extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' is the visibility of the modal.
     * 'user' contains all the users.
     */
    constructor(props) {
        super(props);

        this.state = {
            tripDialog: false,
            //current date time
            datetime: `${new Date().getFullYear()}-${`${new Date().getMonth() +
                1}`.padStart(2, 0)}-${`${new Date().getDay() + 1}`.padStart(
                2,
                0
              )}T${`${new Date().getHours()}`.padStart(
                2,
                0
              )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`,
        };
    }

    //Open/close trip dialog
    openTripDialog = () => {
        this.setState({ tripDialog: true });
    };
    closeTripDialog = () => {
        this.setState({ tripDialog: false });
    };

    /*
    * Purpose: acquires the provided time from the corresponding html element and updates the time of the suggested 
    * trip in the store.
    */
    updateDateTime = event => {
        let dateTime = document.getElementById("inputTripTime").value;
        let date = new Date(dateTime.split('T')[0]);
        let time = dateTime.split('T')[1];

        let hours = time.split(":")[0];
        let minutes = time.split(":")[1];
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
        TripsStore.dateTime.setHours(hours, minutes, 0, 0);
        TripsStore.tripName = this.props.carpoolName;

        TripsStore.dateTime.setDate(date.getDate());
        TripsStore.dateTime.setMonth(date.getMonth());
        TripsStore.dateTime.setYear(date.getFullYear());

        this.setState({datetime: dateTime})
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
        console.log(TripsStore.days);
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
     * Purpose: aqcuires the information provided in the html form elements and creates a new message and trip
     * suggestion with the information. Resets the modal form elements once the information has been acquired and
     * renders the modal invisible.
     */
    suggestTrip = () => {
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
        let dateTime = document.getElementById("inputTripTime").value;
        let date = dateTime.split('T')[0];
        let time = dateTime.split('T')[1];
        let messageContent = date + " @ " + time + "\r\nDays: " + days + "\r\nMembers: " + userNames;

        document.getElementById("inputTripTime").value = "";
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

        this.closeTripDialog();
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
                    <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }} key={Math.random()}>
                        <FormControlLabel control={<Checkbox color="primary" id={user} onChange={this.updateUsers} />} label={MessageStore.getUsername(user).split(' ')[0]} />
                    </ExpansionPanelDetails>
                );
            } else {
                TripsStore.users[user] = true;
                users.push(
                    <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }} key={Math.random()}>
                        <FormControlLabel control={<Checkbox disabled />} label={MessageStore.getUsername(user).split(' ')[0] + ' (Driver)'} />
                    </ExpansionPanelDetails>
                );
            }

        }

        return (
            <div>
                <IconButton color="inherit" aria-label="Back" onClick={this.openTripDialog}>
                    <TripIcon />
                </IconButton>
                <Dialog open={this.state.tripDialog} onClose={this.closeTripDialog} scroll='paper'>
                    <DialogTitle>Suggest a Trip</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={this.updateDateTime}
                            id="inputTripTime"
                            label="First Trip Date and Time"
                            type="datetime-local"
                            defaultValue={this.state.datetime}
                            fullWidth
                        />
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Repeat Days</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-mon" />} label="Monday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-tue" />} label="Tuesday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-wed" />} label="Wednesday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-thu" />} label="Thursday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-fri" />} label="Friday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-sat" />} label="Saturday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <FormControlLabel control={<Checkbox color="primary" id="weekday-sun" />} label="Sunday" onChange={this.updateDays} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Participants</Typography>
                            </ExpansionPanelSummary>
                            {users}
                        </ExpansionPanel>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeTripDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.suggestTrip} color="primary" autoFocus>
                            Suggest
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default NewTripDialog;