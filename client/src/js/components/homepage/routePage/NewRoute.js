import '../../../../css/components/NewRoute.css';
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import RoutesStore from '../../../stores/RoutesStore';

import MapWrapper from '../../home/newRouteModal/MapWrapper';

import LocationSearchInput from '../../home/newRouteModal/GoogleAuto';

@observer class NewRoute extends Component{
    constructor(){
        super()

        this.state = {
            token: '',
            routeName: '',
            startLocation: '',
            endLocation: '',
            days: {
                monday: false,
                tuesday: false, 
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
            time: '00:00',
            repeat: false,
            reRender: true,

        }
    }

    componentWillMount(){

        RoutesStore.routeSuccess = false;

        this.setState({
            token: this.props.location.token
        })
    }

    //HANDLING FORM INFORMATION

    updateNameValue = (event) => {
        event.preventDefault();

        this.setState({
            routeName: event.target.value
        })
    }

    updateStartValue = (event) => {
        event.preventDefault();

        this.setState({
            startLocation: event.target.value
        })
    }

    updateEndValue = (event) => {
        event.preventDefault();

        this.setState({
            endLocation: event.target.value
        })
    }

    updateTimeValue = (event) => {
        event.preventDefault();

        this.setState({
            time: event.target.value
        })
    }

    updateRepeatValue = (event) => {
        event.preventDefault();

        let value = false;

        if(event.target.value === 'on')
            value = true;

        this.setState({
            repeat: value
        })
    }

    //HANDLING WHICH DAYS THE ROUTE WILL TAKE PLACE ON

    toggleMonday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.monday === true){
            this.setState({
                days: {
                    monday: false,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: true,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
    }

    toggleTuesday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.tuesday === true){
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: false,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: true,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
    }

    toggleWednesday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.wednesday === true){
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: false,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: true,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
    }

    toggleThursday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.thursday === true){
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: false,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: true,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
    }

    toggleFriday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.friday === true){
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: false,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: true,
                    saturday: state.days.saturday,
                    sunday: state.days.sunday,
                }
            })
        }
    }

    toggleSaturday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.saturday === true){
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: false,
                    sunday: state.days.sunday,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: true,
                    sunday: state.days.sunday,
                }
            })
        }
    }

    toggleSunday = (event) => {
        event.preventDefault();

        const { state } = this;

        if(this.state.days.sunday === true){
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: false,
                }
            })
        }
        else{
            this.setState({
                days: {
                    monday: state.days.monday,
                    tuesday: state.days.tuesday,
                    wednesday: state.days.wednesday,
                    thursday: state.days.thursday,
                    friday: state.days.friday,
                    saturday: state.days.saturday,
                    sunday: true,
                }
            })
        }
    }

    //SENDING FORM INFORMATION TO ROUTES STORE TO CREATE A NEW ROUTE

    handleAddRoute = (event) => {
        event.preventDefault();
        
        const {
            token,
            startLocation,
            endLocation,
            days,
            time,
            repeat,
            routeName
        } = this.state;

        RoutesStore.newRoute(token, startLocation, endLocation, days, time, routeName, repeat)
    
    }

    render(){
        
        if(RoutesStore.routeSuccess){
            return(
                <Redirect to="/HomePage"/>    
            )
        }
        else{
            return(
                <div>      
                             
                    <p className="m-2 font-weight-bold h1">  
                        <Link className="text-white" to="/Homepage">                    
                            &lt;
                        </Link>                     
                    </p>
                    
                    <form className="m-5" action="">
                        <div className="form-group">
                            <input type="text" placeholder="Name" onChange={this.updateNameValue}/>
                        </div>

                        <div className="form-group">
                            <LocationSearchInput placeholder='Origin'/>
                        </div>

                        <div className="form-group">
                            <LocationSearchInput placeholder='Destination'/>
                        </div>

                        <MapWrapper/>
                        
                        <div className="form-group">
                            <label>Days: </label>
                            <input className={"button-" + this.state.days.monday} type="button" value="M" onClick={this.toggleMonday}/>
                            <input className={"button-" + this.state.days.tuesday} type="button" value="T" onClick={this.toggleTuesday}/>
                            <input className={"button-" + this.state.days.wednesday} type="button" value="W" onClick={this.toggleWednesday}/>
                            <input className={"button-" + this.state.days.thursday} type="button" value="T" onClick={this.toggleThursday}/>
                            <input className={"button-" + this.state.days.friday} type="button" value="F" onClick={this.toggleFriday}/>
                            <input className={"button-" + this.state.days.saturday} type="button" value="S" onClick={this.toggleSaturday}/>
                            <input className={"button-" + this.state.days.sunday} type="button" value="S" onClick={this.toggleSunday}/>
                        </div>

                        <div className="form-group">
                            <label>Time: </label>
                            <input type="time" onChange={this.updateTimeValue}/>
                        </div>

                        <div className="form-group"> 
                            <label>Repeat: </label>
                            <input type="checkbox" onChange={this.updateRepeatValue}/>
                        </div> 

                        <div>
                            <input className="btn btn-success" type="button" value="Create Route" onClick={this.handleAddRoute}/>
                        </div> 
                    </form>
                </div>
            );
        }
    }
}

export default NewRoute;