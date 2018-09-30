// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { observer } from "mobx-react";

import app from '../../stores/FirebaseStore.js';
import MapComponent from '../google/GeneralMapWrapper';
import OffersStore from '../../stores/OffersStore';
import CarpoolMatchStore from './../../stores/CarpoolMatchStore';
import ServerURL from '../../utils/server';

/*
* The purpose of this CarpoolMatch class is to provide a component representitive of a
* carpool match on a route's page. When clicked on, a modal should be displayed which
* gives users the option to request to join the carpool.
*/
@observer class CarpoolMatch extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);

        this.state = {
            //'toggle' represents the state of the modal - false indicates it is not being shown.
            offerDialog: false,
            //carpoolMembers is used to store the members of any carpool match temporarily when accessed
            carpoolMembers: [],
            //routeArr is used to store the routes of any carpool match temporarily when accessed
            routeArr: []
        }

        this.routeArr = [];
        this.carpoolMembers = [];
        this.carpoolMatchStore = new CarpoolMatchStore();
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentDidMount() {

        this.carpoolMatchStore.getRoute(this.props.token, this.props.uRouteId);

        this.props.routeArr.forEach(route => {
            this.carpoolMatchStore.getRoute(this.props.token, route.id)
        });

    }

    //Open/Close Offer dialog
    handleClickOpen = () => {
        this.setState({ offerDialog: true });
    };
    handleClose = () => {
        this.setState({ offerDialog: false });
    };

    generateUserProfileLinks = () => {
        // console.log(toJS(this.carpoolMatchStore.carpoolMembers));
        this.carpoolMembers = [];

        this.carpoolMatchStore.carpoolMembers.forEach(userObj => {
            let userFullName, userPartName, profilePicture;
            userFullName = userObj.firstName + " " + userObj.lastName;
            userPartName = userFullName.substr(0, userFullName.indexOf(' ') + 2);
            profilePicture = ServerURL + "/api/account/getImage?filename=" + userObj.profilePic;
            const memberComponent = (
                <Link to={"/ProfilePage/" + userObj._id} style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Avatar alt="Profile Picture" src={profilePicture} />
                        <ListItemText primary={userPartName} secondary='View Profile' />
                    </ListItem>
                </Link>
            )
            this.carpoolMembers.push(memberComponent);
        });
        this.routeArr = this.carpoolMatchStore.routeArr.slice();

    }
    /*
    * The purpose of the toggle method is to switch the modal between being active and inactive.
    */
    toggle = (event) => {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     * The purpose of the makeOfferToJoin method is to send an offer to another user to join in an existing carpool.
     */
    makeOfferToJoin() {

        fetch(ServerURL + '/api/system/route/getRoute?routeId=' + this.props.routeArr[0].id + '&token=' + this.props.token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(route => {
                if (route.success) {

                    fetch(ServerURL + '/api/system/carpool/getCarpool?_id=' + this.props.carpoolId, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(carpool => {
                            let groupChatID = carpool.data[0].groupChatID;
                            let users = app.database().ref().child('groupChats/' + groupChatID + "/users");
                            let hasAdded = false;

                            users.on('child_added', snap => {
                                if (carpool.success) {
                                    if (!hasAdded) {
                                        OffersStore.makeOfferToJoin(
                                            carpool.data[0].carpoolName,
                                            this.props.token,
                                            this.props.uRouteId,
                                            route.data[0].userId,
                                            snap.key, true,
                                            this.props.carpoolId
                                        );
                                        let groupChatMessages = app.database().ref().child('groupChats/' + groupChatID + '/messages');

                                        fetch(ServerURL + '/api/account/profile?token=' + this.props.token + '&userId=' + this.props.token, {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                        })
                                            .then(res => res.json())
                                            .catch(error => console.error('Error:', error))
                                            .then(sender => {

                                                fetch(ServerURL + '/api/account/profile?token=' + this.props.token + '&userId=' + route.data[0].userId, {
                                                    method: 'GET',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                })
                                                    .then(res => res.json())
                                                    .catch(error => console.error('Error:', error))
                                                    .then(receiver => {
                                                        if (receiver.success && sender.success) {
                                                            groupChatMessages.push().set({
                                                                userID: "Server",
                                                                messageContent: (sender.data[0].firstName + " " + sender.data[0].lastName + " has requested to join your carpool. The invite has been sent to " + receiver.data[0].firstName + " " + receiver.data[0].lastName + "."),
                                                                dateTime: JSON.stringify(new Date()),
                                                                tripSuggest: false
                                                            });
                                                        }
                                                    });
                                            });
                                        hasAdded = true;
                                    }
                                } else {
                                    console.log("error: " + carpool.message);
                                }
                            });
                        });

                    this.handleClose();
                } else {
                    console.log("error: " + route.message);
                }
            });
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        this.generateUserProfileLinks();

        //Return the CarpoolMatch
        return (
            <div>
                <ListItem button onClick={this.handleClickOpen}>
                    <Avatar>
                        <GroupIcon />
                    </Avatar>
                    <ListItemText primary={this.props.carpoolName} secondary='Click to make Request' />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Request to Join">
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Dialog open={this.state.offerDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="alert-dialog-title">Request to join Carpool</DialogTitle>
                    <DialogContent>
                        {this.carpoolMembers}
                        <MapComponent routeArr={this.routeArr} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.makeOfferToJoin} color="primary">
                            Make Request
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CarpoolMatch;