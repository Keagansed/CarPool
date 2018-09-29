// File Type: Component

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getFromStorage } from '../../utils/localStorage' ;
import ServerURL from '../../utils/server';

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(password, newPassword) {
    return {
        password: password.length === 0,
        newPassword: newPassword.length === 0,
    };
}

/*
* Purpose: Popup modal that allows you to enter a new password for your account
*/
class EditPasswordSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changePasswordDialog: false,
            password: "",
            newPassword: "",
            token: "",

            touched: {
                password: false,
                newPassword: false,
            },
        }
    }

    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        this.setState({ token: obj.token });
    }

    //Open/Close change passsword dialog
    handleClickOpen = () => {
        this.setState({ changePasswordDialog: true });
    };

    handleClose = () => {
        this.setState({ changePasswordDialog: false });
    };

    /*
    * Purpose: Sets the 'state.password' variable to senders current value
    */
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    /*
    * Purpose: Sets the 'state.newPassword' variable to senders current value
    */
    handleNewPasswordChange(e) {
        this.setState({ newPassword: e.target.value })
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
    * Purpose: API call to the backend that updates the users password and returns whether or not
    * the update was successful
    */
    changePassword() {
        const { token } = this.state;
        fetch(ServerURL + '/api/account/profile/updatePassword?token=' + token, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: this.props.token,
                password: this.state.password,
                newPassword: this.state.newPassword
            })
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                if (json.success) {
                    this.handleClose();
                }
                else {
                    this.setState({ password: "", newPassword: "" });
                }
            });
    }

    render() {
        /*
        * Purpose: Only give fields red borders if the user has changed/access them
        * and they are still not valid.
        */
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const errors = validate(this.state.password, this.state.newPassword);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div>
                <ListItem button onClick={this.handleClickOpen}>
                    <ListItemIcon>
                        <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account Password" secondary="Edit your account Password" />
                </ListItem>
                <Dialog open={this.state.changePasswordDialog} onClose={this.handleClose}>
                    <DialogTitle>{"Edit Account Password"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)}
                            error={(shouldMarkError('password') ? true : false)}
                            onBlur={this.handleBlur('password')}
                            margin="dense"
                            label="Current Password"
                            type="password"
                            fullWidth
                        />
                        <TextField
                            value={this.state.newPassword}
                            onChange={this.handleNewPasswordChange.bind(this)}
                            error={(shouldMarkError('newPassword') ? true : false)}
                            onBlur={this.handleBlur('newPassword')}
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.changePassword} color="primary" disabled={isDisabled} autoFocus>
                            Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditPasswordSetting;