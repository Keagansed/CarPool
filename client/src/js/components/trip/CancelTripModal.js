// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

import { getFromStorage } from '../../utils/localStorage.js';
import ServerURL from '../../utils/server';

/**
 * Purpose: An interface to allow the user to cancel a trip they are currently in 
 */
class CancelTripModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            cancelDialog: false,
        }
    }

    //Open/close cancel dialog
    openCancelDialog = () => {
        this.setState({ cancelDialog: true });
    };
    closeCancelDialog = () => {
        this.setState({ cancelDialog: false });
    };

    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        let { token } = obj;

        this.setState({
            token,
        })
    }

    cancelOrDelete = () => {
        if (this.props.trip.driver === this.state.token) {
            this.deleteTrip();
        } else {
            this.cancelTrip();
        }
    }

    cancelTrip = () => {
        fetch(ServerURL + '/api/system/trip/cancelTrip?token=' + this.state.token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: this.props.trip._id,
                token: this.state.token
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

            });
        this.closeCancelDialog();
    }

    deleteTrip = () => {
        fetch(ServerURL + '/api/system/trip/deleteTrip?tripId=' + this.props.trip._id + '&token=' + this.state.token)
            .then(res => res.json())
            .then(json => {
            });
        this.closeCancelDialog();
    }

    render() {
        return (
            <div>
                <IconButton color="inherit" aria-label="Back" onClick={this.openCancelDialog}>
                    <CancelIcon />
                </IconButton>
                <Dialog open={this.state.cancelDialog} onClose={this.closeCancelDialog} scroll='paper'>
                        <DialogTitle>Cancel Trip?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to cancel this trip?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Link to={`/HomePage`} onClick={this.cancelOrDelete} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button color="primary">
                                    Yes
                                </Button>
                            </Link>
                            <Button onClick={this.closeCancelDialog} color="primary">
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        );
    }
}

export default CancelTripModal;