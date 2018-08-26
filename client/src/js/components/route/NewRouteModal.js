// File Type: Component

import React, { Component } from 'react';

import LocationSearchInput from '../google/GoogleAuto';
import MapWrapper from '../google/MapWrapper';
// import WeekdaySelector from './WeekdaySelector';

//'display' is used to show the modal
const display = {
    display: 'block'
};
//'hide' is used to hide the modal
const hide = {
    display: 'none'
};

/*
* The purpose of this NewRouteModal class is to provide a component that allows a user
* to add a route. The component consists of an add sign which opens a the add route page 
* when clicked on.
*/
class NewRouteModal extends Component{
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            //toggle is used to show/hide the modal
            toggle: false,
            //stores the session token
            token: this.props.token,
            //stores the routeName
            routeName: '',
            // startLocation: '',
            // endLocation: '',
            //stores the route time
            time: '00:00',
            //whether or not the route repeats
            repeat: false,
        }
    }
  
    /*
    * The purpose of the toggle method is to switch the modal between being active and inactive.
    */
    toggle(event) {
        event.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
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

    // updateStartValue = (event) => {
    //     event.preventDefault();

    //     this.setState({
    //         startLocation: event.target.value
    //     })
    // }

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

    // updateRepeatValue = (event) => {
    //     event.preventDefault();

    //     let value = false;

    //     if(event.target.value === 'on')
    //         value = true;

    //     this.setState({
    //         repeat: value
    //     })
    // }

    /*
    * The purpose of the handleAddRoute method is to add the route for which details
    * have been entered to the users home page.
    */
    handleAddRoute = (event) => {
        event.preventDefault();

        const {
            token,
            routeName,
            time
        } = this.state;
        
        this.props.store.newRoute(token, time, routeName);
        this.toggle(event);
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        var modal = [];
        modal.push(
            // Modal
            <div 
                key="0" 
                className="modal" 
                tabIndex="-1" 
                role="dialog" 
                id="myModal" 
                style={this.state.toggle ? display : hide}
            >
                <div 
                    className="modal-dialog" 
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Create a New Route</h5>
                            <button 
                                type="button" 
                                className="close" 
                                onClick={this.toggle} 
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route Name</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input 
                                        type="text" 
                                        onChange={this.updateNameValue} 
                                        className="col-11 form-control mx-auto brad-2rem" 
                                        placeholder="e.g. Home to Work"
                                    /> 
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Time</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input 
                                    type="time" 
                                    onChange={this.updateTimeValue} 
                                    className="col-5 form-control mx-auto brad-2rem" 
                                    placeholder="Time"
                                /> 
                                    {/* <input type="date" className="col-5 form-control mx-auto brad-2rem" placeholder="Date" required="required" name="Date" id="inputRouteDate"/> */}
                                </div>
                                {/* <div className="row">
                                    <h6 className="fw-bold mx-auto">Repeat Weekly</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <div className="mx-auto">
                                        <WeekdaySelector/>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Start and End Locations</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <LocationSearchInput placeholder="Start Location"/> 
                                </div>
                                <div className="row padbot-10px">
                                    <LocationSearchInput placeholder="End Location"/> 
                                </div>
                                <MapWrapper/>
                                <div className="row">
                                    {/* <button onClick={this.handleAddRoute} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold">
                                        Add Route
                                    </button> */}
                                     <button 
                                        onClick={this.handleAddRoute} 
                                        className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold"
                                    >
                                        <b>Add Route</b>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="mx-auto">
                <button 
                    className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center" 
                    onClick={this.toggle}
                >
                    <i className="fa fa-plus"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default NewRouteModal;