// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from '@material-ui/core';

import LocationSearchInput from '../google/GoogleAuto';
import MapWrapper from '../google/MapWrapper';


//Define specific styles for this page
const styles = theme => ({
    form: {
        width: 'auto', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
});

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(routeName, routeTime, startLoc, endLoc) {
    return {
        routeName: routeName.length === 0 || routeName.length > 50,
        routeTime: routeTime === "",
        startLoc: startLoc.length === 0,
        endLoc: endLoc.length === 0,
    };
}

/*
* The purpose of this NewRouteModal class is to provide a component that allows a user
* to add a route. The component consists of an add sign which opens a the add route page 
* when clicked on.
*/
@observer class NewRoute extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token,
            routeName: '',
            startLocation: 'temporary - remove when location check figured out',
            endLocation: 'temporary - remove when location check figured out',
            time: '',

            touched: {
                routeName: false,
                startLocation: false,
                endLocation: false,
                time: false,
            },
        }
    }

    /*
    * The purpose of the updateNameValue method is to change the value of the routeName field.
    */
    updateNameValue = (event) => {
        event.preventDefault();

        this.setState({
            routeName: event.target.value
        })
    }

    // /*
    // * The purpose of the updateNameValue method is to change the value of the startLocation field.
    // */
    // updateStartValue = (event) => {
    //     event.preventDefault();
    //     console.log(event.target.value);
    //     this.setState({
    //         startLocation: event.target.value
    //     })
    // }

    // /*
    // * The purpose of the updateNameValue method is to change the value of the endLocation field.
    // */
    // updateEndValue = (event) => {
    //     event.preventDefault();

    //     this.setState({
    //         endLocation: event.target.value
    //     })
    // }

    /*
    * The purpose of the updateTimeValue method is to change the value of the time field.
    */
    updateTimeValue = (event) => {
        event.preventDefault();
        this.setState({
            time: event.target.value
        })
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.routeName, this.state.time, this.state.startLocation, this.state.endLocation);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    /*
    * The purpose of the handleAddRoute method is to add the route for which details
    * have been entered to the users home page.
    */
    handleAddRoute = (event) => {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const {
            token,
            routeName,
            time
        } = this.state;

        this.props.store.newRoute(token, time, routeName);
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
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
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
        const errors = validate(this.state.routeName, this.state.time, this.state.startLocation, this.state.endLocation);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const { classes } = this.props;

        if (this.props.store.addingRoute) {
            return (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );    
        } else {
            return (
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="routeName">Route Name</InputLabel>
                        <Input
                            id="routeName"
                            name="routeName"
                            onChange={this.updateNameValue}
                            error={(shouldMarkError('routeName') ? true : false)}
                            onBlur={this.handleBlur('routeName')}
                            value={this.state.routeName}
                            autoFocus
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <TextField
                            label="Time Travelling"
                            id="routeTime"
                            name="routeTime"
                            type="time"
                            onChange={this.updateTimeValue}
                            error={(shouldMarkError('routeTime') ? true : false)}
                            onBlur={this.handleBlur('routeTime')}
                            value={this.state.routeTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <LocationSearchInput placeholder="Start Location" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <LocationSearchInput placeholder="End Location" />
                    </FormControl>
                    <MapWrapper />
                    <Button
                        type="submit"
                        fullWidth
                        variant="raised"
                        color="primary"
                        onClick={this.handleAddRoute}
                        className={classes.submit}
                        disabled={isDisabled}
                    >
                        Add Route
                    </Button>
                </form>
            );
        }
    }
}

NewRoute.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewRoute);