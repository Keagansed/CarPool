// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OfferIcon from '@material-ui/icons/GroupAdd';
import InfoIcon from '@material-ui/icons/Info';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import CarpoolStore from '../../stores/CarpoolStore'
import ServerURL from '../../utils/server';

/*
 * Purpose: a modal interface that displays an offer to a carpool. It shows the user who sent the
 * invite and allows you to accept or decline the offer.
 */
class CarpoolOffer extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'state' 
     * contains the toggle field which is a boolean that determines the visibility of the modal
     * , sender which is the user the that sent the object, and deleted which is boolean that 
     * shows if the offer has been deleted or not.
     */
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            deleted: false,
            offerDialog: false,
        }
    }

    //Open/Close Offer dialog
    handleClickOpen = () => {
        this.setState({ offerDialog: true });
    };
    handleClose = () => {
        this.setState({ offerDialog: false });
    };

    /*
     * Purpose: acquires the user that sent the carpool offer through an api call and sets
     * the user to the sender field in the state.
     */
    componentDidMount() {
        this.props.store.getUserProfile(this.props.token);
    }

    /*
     * Purpose: selects the appropriate the output text for the modal based on whether the
     * carpool already exists or not
     */
    renderOtherMembers = () => {
        if (this.props.store.join) {
            return "Asking to join your existing carpool";
        } else {
            return "This is an invite to create a new carpool";
        }
    }

    /*
     * Purpose: returns the size of the carpool based on the value of 'join' in the carpool store
     */
    getJoinOrCreate = () => {

        if (this.props.store.join) {
            return "Request to join an existing carpool";
        } else {
            return "Invite to create a new carpool";
        }

    }

    /*
     * Purpose: calls the 'addCarpool' function in the store using the carpool offer ID. Changes
     * the deleted state to true and closes the modal.
     */
    handleAcceptInvite = ()  =>  {
        if (this.props.store.join) {

        }

        CarpoolStore.addCarpool(this.props.offerId, this.props.token);
        this.setState({ deleted: true });
        this.handleClose();
    }

    /*
     * Purpose: does an api call to decline the carpool offer. Sets the deleted state to true
     * and closes the modal.
     */
    handleDeclineInvite = () => {
        fetch(ServerURL + '/api/system/offers/declineInvite?offerId=' + this.props.offerId + '&token=' + this.props.token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                console.log(json);
            });

        this.setState({ deleted: true });
        this.handleClose();
    }

    /*
     * Purpose: renders the component in the DOM. What is rendered is dependant on the 'deleted' field and the visibility of the modal
     * is dependant on the 'toggle' field.
     */
    render() {
        if (this.state.deleted) {

            return (<div></div>);

        } else {
            let profilePicture, userFullName;
            if (typeof (this.props.store.userProfile.lastName) !== "undefined") {
                profilePicture = ServerURL + "/api/account/getImage?filename=" + this.props.store.userProfile.profilePic;
                userFullName = this.props.store.userProfile.firstName + " " + this.props.store.userProfile.lastName;
            }else{
                this.props.store.getUserProfile(this.props.token);
            }
            return (
                <div>
                    <ListItem button onClick={this.handleClickOpen} divider>
                        <Avatar>
                            <OfferIcon />
                        </Avatar>
                        <ListItemText primary={this.props.store.CarpoolName} secondary={this.getJoinOrCreate()} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="View Route Matches">
                                <InfoIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Dialog open={this.state.offerDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="alert-dialog-title">{this.props.store.CarpoolName}</DialogTitle>
                        <DialogContent>
                            <Link to={"/ProfilePage/" + this.props.store.senderId} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} divider>
                                    <Avatar alt="Profile Picture" src={profilePicture} />
                                    <ListItemText primary={userFullName} secondary='View Profile' />
                                </ListItem>
                            </Link>
                            <Typography>{this.renderOtherMembers()}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleAcceptInvite} color="primary">
                                Accept
                            </Button>
                            <Button onClick={this.handleDeclineInvite} color="primary">
                                Decline
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }

    }
}

export default CarpoolOffer;