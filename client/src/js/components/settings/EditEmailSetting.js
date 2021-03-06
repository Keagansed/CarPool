// File Type: Component

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import ServerURL from '../../utils/server';

const util = require('../../utils/idCheck');

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(email) {
    return {
        email: !util.ValidateEmail(email),
    };
}

/*
* Purpose: Popup modal that allows you to enter a new email address for your account
*/
class EditEmailModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changeEmailDialog: false,
            email: this.props.token,
            confirmDialog: false,

            touched: {
                email: false,
            },
        };
    }

    //Open/Close change email dialog
    handleClickOpen = () => {
        this.setState({ changeEmailDialog: true });
    };

    handleClose = () => {
        this.setState({ changeEmailDialog: false });
    };

    //Open/Close confirm dialpg
    handleConfirmOpen = () => {
        this.setState({ confirmDialog: true });
    };
    handleConfirmClose = () => {
        this.setState({ confirmDialog: false });
    };

    /*
    * Purpose: Sets the 'state.email' variable to senders current value
    */
    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }

    /*
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    /*
    * Purpose: API call to the backend that updates the users email and returns whether or not
    * the update was successful
    */
    changeEmail() {
        fetch(ServerURL + '/api/account/profile/updateEmail?token=' + this.props.token, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: this.props.token,
                email: this.state.email
            })
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                if (json.success) {
                    this.handleClose();
                    this.handleConfirmOpen();
                }
                else {
                    this.setState({ email: "" });
                }
            });
    }

    render() {
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const errors = validate(this.state.email);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div>
                <ListItem button onClick={this.handleClickOpen} divider>
                    <ListItemIcon>
                        <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Email Address" secondary="Edit your account email address" />
                </ListItem>
                <Dialog open={this.state.changeEmailDialog} onClose={this.handleClose}>
                    <DialogTitle>{"Edit Account Email"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)}
                            error={(shouldMarkError('email') ? true : false)}
                            onBlur={this.handleBlur('email')}
                            margin="dense"
                            label="New Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.changeEmail.bind(this)} color="primary" disabled={isDisabled}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Confirm dialog */}
                <Dialog open={this.state.confirmDialog} onClose={this.handleConfirmClose}>
                    <DialogTitle>{"Email Changed"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your email has been successfully changed.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditEmailModal;