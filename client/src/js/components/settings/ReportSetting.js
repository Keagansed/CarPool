// File Type: Component

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BugIcon from '@material-ui/icons/BugReport';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import SettingsPageStore from './../../stores/SettingsPageStore';

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(problem) {
    return {
        problem: problem.length < 10 || problem.length > 500,
    };
}

/*
* Purpose: Popup modal that allows you to enter a new password for your account
*/
class ReportSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportErrorDialog: false,
            problem: "",

            touched: {
                problem: false,
            },
        }
    }

    //Open/Close report error dialog
    handleClickOpen = () => {
        this.setState({ reportErrorDialog: true });
    };

    handleClose = () => {
        this.setState({ reportErrorDialog: false });
    };

    /*
    * Purpose: Sets the 'state.error' variable to senders current value
    */
    handleErrorChange(e) {
        this.setState({ problem: e.target.value });
        SettingsPageStore.reportedProblem = e.target.value;
    }

    /*
    * Purpose: Calls the store.sendProblem() function
    */
    sendProblem = (event) => {
        event.preventDefault();
        SettingsPageStore.sendProblem();
        this.setState({
            problem: '',
            touched : {
                problem : false,
            }
        });
        this.handleClose();
    }

    /*
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
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
        const errors = validate(this.state.problem);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div>
                <ListItem button onClick={this.handleClickOpen} divider>
                    <ListItemIcon>
                        <BugIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report a Problem" secondary="Report a problem anonymously." />
                </ListItem>
                <Dialog open={this.state.reportErrorDialog} onClose={this.handleClose}>
                    <DialogTitle>{"Report a Problem"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={this.state.problem}
                            onChange={this.handleErrorChange.bind(this)}
                            error={(shouldMarkError('problem') ? true : false)}
                            onBlur={this.handleBlur('problem')}
                            margin="dense"
                            label="Problem Description"
                            multiline
                            rows="6"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.sendProblem} color="primary" disabled={isDisabled}>
                            Report
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ReportSetting;