// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import LocationSearchInput from '../google/GoogleAuto';
import MapWrapper from '../google/MapWrapper';
import WeekdaySelector from './WeekdaySelector';

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
@observer class NewRouteModal extends Component {
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
            //whether or not the route repeats
            repeat: false,

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

        let addingRoute;
        if (this.props.store.addingRoute) {
            addingRoute = <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        } else {
            addingRoute = <button
                onClick={this.handleAddRoute}
                className="btn btn-primary mx-auto col-10 brad-2rem mbottom-10px bg-aqua txt-purple fw-bold"
                disabled={isDisabled}
            >
                <b>Add Route</b>
            </button>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <h6 className="fw-bold mx-auto padver-10px m-0 txt-white">Route Name</h6>
                </div>
                <div className="row padbot-10px">
                    <input
                        id="inputRouteName"
                        type="text"
                        onChange={this.updateNameValue}
                        onBlur={this.handleBlur('routeName')}
                        className={(shouldMarkError('routeName') ? "error" : "") + " col-10 form-control mx-auto brad-2rem"}
                        placeholder="e.g. Home to Work"
                        value={this.state.routeName}
                    />
                </div>
                <div className="row  padbot-10px">
                    <h6 className="fw-bold mx-auto m-0 txt-white">Time</h6>
                </div>
                <div className="row padbot-10px">
                    <input
                        id="inputRouteTime"
                        type="time"
                        onChange={this.updateTimeValue}
                        onBlur={this.handleBlur('routeTime')}
                        className={(shouldMarkError('routeTime') ? "error" : "") + " col-10 form-control mx-auto brad-2rem"}
                        value={this.state.time}
                    />
                </div>
                <div className="row  padbot-10px">
                    <h6 className="fw-bold mx-auto m-0 txt-white">Repeat Weekly</h6>
                </div>
                <div className="row padbot-10px">
                    <div className="mx-auto">
                        <WeekdaySelector />
                    </div>
                </div>
                <div className="row  padbot-10px">
                    <h6 className="fw-bold mx-auto m-0 txt-white">Start and End Locations</h6>
                </div>
                <div className="row padbot-10px">
                    <LocationSearchInput 
                        placeholder="Start Location"
                    />
                </div>
                <div className="row padbot-10px">
                    <LocationSearchInput placeholder="End Location" />
                </div>
                <MapWrapper />
                <div className="row padtop-10px">
                    {/* <button
                        onClick={this.handleAddRoute}
                        className="btn btn-primary mx-auto col-10 brad-2rem mbottom-10px bg-aqua txt-purple fw-bold"
                    >
                        <b>Add Route</b>
                    </button> */}
                    {addingRoute}
                </div>
            </div>
        );
    }
}

export default NewRouteModal;