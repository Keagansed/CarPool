import React, { Component } from 'react';
import LocationSearchInput from './GoogleAuto';
import MapWrapper from './MapWrapper';
// import WeekdaySelector from './WeekdaySelector';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class NewRouteModal extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            token: this.props.token,
            routeName: '',
            // startLocation: '',
            // endLocation: '',
            time: '00:00',
            repeat: false,
        }
    }
  
    toggle(event) {
        event.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

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

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Create a New Route</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route Name</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input type="text" onChange={this.updateNameValue} className="col-11 form-control mx-auto brad-2rem" placeholder="e.g. Home to Work"/> 
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Time</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input type="time" onChange={this.updateTimeValue} className="col-5 form-control mx-auto brad-2rem" placeholder="Time"/> 
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
                                     <button onClick={this.handleAddRoute} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold">
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
                <button className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center" onClick={this.toggle}>
                    <i className="fa fa-plus"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default NewRouteModal;