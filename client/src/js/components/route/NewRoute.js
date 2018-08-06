// File Type: Component

import React, { Component } from 'react';

import LocationSearchInput from '../google/GoogleAuto';
import MapWrapper from '../google/MapWrapper';
import WeekdaySelector from './WeekdaySelector';

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
  
        this.state = {
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
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        return(
            <div className="mx-auto">
                <form>
                    <div className="row">
                        <h6 className="fw-bold mx-auto padver-10px m-0 txt-white">Route Name</h6>
                    </div>
                    <div className="row padbot-10px">
                        <input 
                            id="inputRouteName"
                            type="text" 
                            onChange={this.updateNameValue} 
                            className="col-10 form-control mx-auto brad-2rem" 
                            placeholder="e.g. Home to Work"
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
                            className="col-10 form-control mx-auto brad-2rem" 
                            placeholder="08:00"
                        /> 
                    </div>
                    <div className="row  padbot-10px">
                        <h6 className="fw-bold mx-auto m-0 txt-white">Repeat Weekly</h6>
                    </div>
                    <div className="row padbot-10px">
                        <div className="mx-auto">
                            <WeekdaySelector/>
                        </div>
                    </div>
                    <div className="row  padbot-10px">
                        <h6 className="fw-bold mx-auto m-0 txt-white">Start and End Locations</h6>
                    </div>
                    <div className="row padbot-10px">
                        <div className="col-10 mx-auto">
                            <div className="row">
                                <LocationSearchInput placeholder="Start"/>  
                                <LocationSearchInput placeholder="End"/> 
                            </div>
                        </div>
                    </div>
                    <MapWrapper/>
                    <div className="row">
                        <button 
                            onClick={this.handleAddRoute} 
                            className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold"
                        >
                            <b>Add Route</b>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewRouteModal;