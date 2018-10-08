// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContentText from '@material-ui/core/DialogContentText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import MapComponent from '../google/GeneralMapWrapper';
import MessageStore from '../../stores/MessagingStore.js';
import app from '../../stores/FirebaseStore.js'
import { getFromStorage } from '../../utils/localStorage.js';
import ServerURL from '../../utils/server';

/*
 * Purpose: a message interface for a trip suggestion and an interface for viewing and accepting/declining the trip  
 */
@observer class TripSuggest extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'user' contains all the users.
     * 'buttons' contains the html button elements for the modal interface. 'toggle' represents the visibility of the
     *  modal. 'messageContent' is the text of the message, and the messages ID is contained within 'messageID'.
     */
    constructor(props) {
        super(props);

        this.state = {
            buttons: [],
            tripDialog: false,
            routeArr: []
        };
        this.messageContent = props.messageContent;
        this.messageID = props.messageID;
        this.message = app.database().ref().child('groupChats/' + this.props.carpoolID + "/messages/" + this.messageID);
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }

    //Open/close trip dialog
    openTripDialog = () => {
        this.setState({ tripDialog: true });
    };
    closeTripDialog = () => {
        this.setState({ tripDialog: false });
    };

    /*
     * Purpose: sets the 'buttons' fields to the appropriate html button elements.
     */
    componentWillMount() {
        if (this.props.userID === this.props.token) {
            this.setState({
                buttons: (
                    <div key={Math.random()}>
                        <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                            Close
                        </Button>
                    </div>
                )
            });
        } else if (typeof this.props.usersResponded[this.props.token] !== 'undefined') {
            if (this.props.usersResponded[this.props.token]) {
                this.setState({
                    buttons: (
                        <div key={Math.random()}>
                            <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </div>
                    )
                });
            } else {
                this.setState({
                    buttons: (
                        <div key={Math.random()}>
                            <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </div>
                    )
                });
            }
        } else {
            if (typeof this.props.users[this.props.token] !== 'undefined') {
                this.setState({
                    buttons: (
                        <div key={Math.random()}>
                            <Button onClick={this.accept} color="primary" autoFocus>
                                Accept
                            </Button>
                            <Button onClick={this.reject} color="primary" autoFocus>
                                Reject
                            </Button>
                        </div>
                    )
                });
            } else {
                this.setState({
                    buttons: (
                        <div key={Math.random()}>
                            <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </div>
                    )
                });
            }
        }
    }

    /*
     * Purpose: acquires all the users and stores them in the 'user' field.
     */
    componentDidMount() {
        let objDiv = document.getElementById("messageBody");
        objDiv.scrollTop = objDiv.scrollHeight;

        this.renderMap(this.props.tripID);
    }

    /*
     * Purpose: determines how many days have past since the message has been sent
     */
    getDaysAgo(dat) {
        var today = new Date();
        var createdOn = new Date(JSON.parse(dat));
        var msInDay = 24 * 60 * 60 * 1000;

        createdOn.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0)

        var diff = (+today - +createdOn) / msInDay

        if (diff === 1) {
            return diff + " day ago";
        }

        return diff + " days ago";
    }

    /*
     * Purpose: determines the exact time that the message was sent.
     */
    getTime(dat) {
        var createdOn = new Date(JSON.parse(dat));
        let hours = createdOn.getHours();
        let mins = createdOn.getMinutes();

        if (mins === 0) {
            mins = "00";
        } else if (mins < 10) {
            mins = "0" + mins;
        }

        return hours + ":" + mins;
    }

    /*
     * Purpose: determines if the date that the message was/is sent is today or not.
     */
    checkIfToday(dat) {
        let dateObj = new Date(JSON.parse(dat));
        let todaysDate = new Date();
        // return true;

        if (dateObj.toDateString() === todaysDate.toDateString()) {
            return true;
        }

        return false;
    }

    /*
     * Purpose: updates the 'usersResponded' field in firebase, and changes the 'buttons' field to reflect the users 
     * response. Performs an API POST request to reflect the response of the user to the trip suggestion.
     */
    accept() {
        app.database().ref().child('groupChats/' + this.props.carpoolID + "/messages/" + this.messageID + "/usersResponded")
            .update({ [getFromStorage('sessionKey').token]: true }).then(() => {
                return {};
            }).catch(error => {

                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }

            });

        this.setState({
            buttons: (
                <div key={Math.random()}>
                    <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </div>
    )
        });

        this.buttons = this.state.buttons;
        fetch(ServerURL + '/api/system/trip/respondToTrip?token=' + this.props.token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: this.props.tripID,
                token: this.props.token
            })
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                if (json.success) {
                    // this.tripID = json._id;
                    // suggestTrip(messageContent, getFromStorage('sessionKey').token, users, this.tripID);
                } else {
                    alert(json.message);
                }

            })
    }

    /*
     * Purpose: updates the 'usersResponded' field in firebase, and changes the 'buttons' field to reflect
     * the response of the user.
     */
    reject() {
        app.database().ref().child('groupChats/' + this.props.carpoolID + "/messages/" + this.messageID + "/usersResponded")
            .update({ [getFromStorage('sessionKey').token]: false }).then(() => {
                return {};
            }).catch(error => {
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }
            });

        this.setState({
            buttons: (
                <div key={Math.random()}>
                    <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </div>
            )
        });

        this.buttons = this.state.buttons;
    }

    renderMap = async (tripId) => {
        let routeArr = [];

        await fetch(ServerURL + '/api/system/trip/getTrip?_id=' + tripId + '&token=' + getFromStorage('sessionKey').token)
            .then(res => res.json())
            .then(json => {
                if (json) {
                    if (json.success) {
                        routeArr = json.data[0];
                        if (typeof routeArr !== "undefined") {
                            this.setState({
                                routeArr: routeArr.optimalTrip
                            })
                        }

                    } else {
                        console.error(json.message);
                    }

                } else {
                    console.error("Server Error")
                }
            });

    }

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render(props) {
        let dat = "";
        if (this.checkIfToday(this.props.dateTime)) {
            dat = this.getTime(this.props.dateTime);
        } else {
            dat = this.getDaysAgo(this.props.dateTime);
        }

        //Determine buttons to display on dialog
        if (this.props.userID === getFromStorage('sessionKey').token) {
            this.buttons = (
                <div key={Math.random()}>
                    <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </div>
            );
        } else {
            try {
                if (this.props.usersResponded[getFromStorage('sessionKey').token] === undefined) {
                    throw new Error();
                } else if (this.props.usersResponded[getFromStorage('sessionKey').token]) {
                    this.buttons = (
                        <div key={Math.random()}>
                            <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </div>
                    );
                }
                if (!this.props.usersResponded[getFromStorage('sessionKey').token]) {
                    this.buttons = (
                        <div key={Math.random()}>
                            <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </div>
                    );
                }
            } catch (e) {
                try {
                    if (this.props.users[getFromStorage('sessionKey').token] === true) {
                        this.buttons = this.state.buttons;
                    } else {
                        this.buttons = (
                            <div key={Math.random()}>
                                <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                    Close
                                </Button>
                            </div>
                        );
                    }
                } catch (e) {
                    this.buttons = (
                        <div key={Math.random()}>
                            <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </div>
                    );
                }
            }
        }

        if (this.props.userID === getFromStorage('sessionKey').token) {
            return (
                <div>
                    <ListItem onClick={this.openTripDialog} divider>
                        <ListItemText
                            primary={
                                <div>
                                    <font style={{ color: this.props.userColour }}>You</font>
                                    <font style={{ float: 'right' }}>{dat}</font>
                                </div>
                            }
                            secondary='Suggested a trip.'
                        />
                    </ListItem>
                    <Dialog open={this.state.tripDialog} onClose={this.closeTripDialog} scroll='paper'>
                        <DialogTitle>Trip Suggestion</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.messageContent}
                            </DialogContentText>
                            <MapComponent routeArr={this.state.routeArr} combined={true} />
                        </DialogContent>
                        <DialogActions>
                            {this.state.buttons}
                        </DialogActions>
                    </Dialog>
                </div>
            );
        } else {
            return (
                <div>
                    <ListItem onClick={this.openTripDialog} divider>
                        <ListItemText
                            primary={
                                <div>
                                    <font style={{ color: this.props.userColour }}>{MessageStore.getUsername(this.props.userID)}</font>
                                    <font style={{ float: 'right' }}>{dat}</font>
                                </div>
                            }
                            secondary='Suggested a trip. Click for more info.'
                        />
                    </ListItem>
                    <Dialog open={this.state.tripDialog} onClose={this.closeTripDialog} scroll='paper'>
                        <DialogTitle>Trip Suggestion</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.messageContent}
                            </DialogContentText>
                            <MapComponent routeArr={this.state.routeArr} combined={true} />
                        </DialogContent>
                        <DialogActions>
                            {this.state.buttons}
                        </DialogActions>
                    </Dialog>
                </div>
            );

        }

    }
}

export default TripSuggest;