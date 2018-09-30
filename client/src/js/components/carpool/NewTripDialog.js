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
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        return (
            <div>
                <IconButton color="inherit" aria-label="Back" onClick={this.openTripDialog}>
                    <TripIcon />
                </IconButton>
                <Dialog open={this.state.tripDialog} onClose={this.closeTripDialog} scroll='paper'>
                    <DialogTitle>Suggest a Trip</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="First Trip Date and Time"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            fullWidth
                        />
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Repeat Days</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Monday"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Tuesday"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Wednesday"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Thursday"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Friday"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Saturday"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Sunday"/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Participants</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Michael"/>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <FormControlLabel control={<Checkbox color="primary"/>} label="Marcus"/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                            Suggest
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default NewTripDialog;