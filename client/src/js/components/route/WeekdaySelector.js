// File Type: Component

import React, { Component } from 'react';

/*
* The purpose of this WeekdaySelector class is to provide a an interface
* for a user to select specific days within a week. The component functions
* like a checkbox group.
*/
class WeekdaySelector  extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values.
    * All days are set to false when the component is first loaded
    */
    constructor() {
        super()

        this.state = {
            days: {
                // field for whether monday is selected
                monday: false,
                // field for whether tuesday is selected
                tuesday: false,
                // field for whether wednesday is selected
                wednesday: false,
                // field for whether thursday is selected
                thursday: false,
                // field for whether friday is selected
                friday: false,
                // field for whether saturday is selected
                saturday: false,
                // field for whether sunday is selected
                sunday: false,
            }
        }
    }

    /*
    * The purpose of the toggleMonday method is to toggle the selection state of monday
    */
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

    /*
    * The purpose of the toggleTuesday method is to toggle the selection state of tuesday
    */
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

    /*
    * The purpose of the toggleWednesday method is to toggle the selection state of wednesday
    */
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

    /*
    * The purpose of the toggleThursday method is to toggle the selection state of thursday
    */
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

    /*
    * The purpose of the toggleFriday method is to toggle the selection state of friday
    */
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

    /*
    * The purpose of the toggleSaturday method is to toggle the selection state of saturday
    */
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

    /*
    * The purpose of the toggleSunday method is to toggle the selection state of sunday
    */
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

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        return(
            <div className="weekDays-selector">
                <input 
                    type="checkbox" 
                    id="weekday-mon" 
                    className="weekday" 
                />
                <label htmlFor="weekday-mon">M</label>
                <input 
                    type="checkbox" 
                    id="weekday-tue" 
                    className="weekday" 
                />
                <label htmlFor="weekday-tue">T</label>
                <input 
                    type="checkbox" 
                    id="weekday-wed" 
                    className="weekday" 
                />
                <label htmlFor="weekday-wed">W</label>
                <input 
                    type="checkbox" 
                    id="weekday-thu" 
                    className="weekday" 
                />
                <label htmlFor="weekday-thu">T</label>
                <input 
                    type="checkbox" 
                    id="weekday-fri" 
                    className="weekday" 
                />
                <label htmlFor="weekday-fri">F</label>
                <input 
                    type="checkbox" 
                    id="weekday-sat" 
                    className="weekday"     
                />
                <label htmlFor="weekday-sat">S</label>
                <input 
                    type="checkbox" 
                    id="weekday-sun" 
                    className="weekday" 
                />
                <label htmlFor="weekday-sun">S</label>
            </div>
        );
    }
}

export default WeekdaySelector;