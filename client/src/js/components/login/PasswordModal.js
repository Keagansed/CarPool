// File Type: Component

import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const util = require('./../../utils/idCheck');

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(email) {
    return {
        email: !util.ValidateEmail(email),
    };
}

/*
 * Purpose: provides a modal interface for when a user has forgotten their password. 
 */
@observer class PasswordModal extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' represents the 
     * visibility of the modal component. 
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            email: '',

            touched: {
                email: false,
            },
        };
    }

    /*
     * Purpose: toggles the visibility of the component.  
     */
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    /*
    * Purpose: Sets the 'state.email' variable to senders current value
    */
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
        this.props.store.forgotEmail = e.target.value;
        this.props.store.noEmailError = '';
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
    * Purpose: Calls the store.sendPassword() function
    */
    sendPassword = (event) => {
        event.preventDefault();
        this.props.store.sendPassword();
    }

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const errors = validate(this.state.email);
        const { noEmailError } = this.props.store;
        let messageColor = "txt-green ";
        if (noEmailError === 'You are not a registered user')
            messageColor = "txt-red "
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div>
                <Typography onClick={this.handleClickOpen}>Forgot Password?</Typography>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Forgot Password?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your email to reset your password.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)}
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            error={(shouldMarkError('email') ? true : false)}
                            onBlur={this.handleBlur('email')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button 
                            onClick={this.sendPassword} 
                            color="primary"
                            disabled={isDisabled}
                        >
                            Send me my password
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }
}

export default PasswordModal;