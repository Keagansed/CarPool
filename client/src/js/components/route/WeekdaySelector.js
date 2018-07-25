import React, { Component } from 'react';

class WeekdaySelector  extends Component {
    constructor(){
        super()

        this.state = {
            days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            }
        }
    }


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


    render(){
        return(
            <div className="weekDays-selector">
                <input type="checkbox" id="weekday-mon" className="weekday" />
                <label htmlFor="weekday-mon">M</label>
                <input type="checkbox" id="weekday-tue" className="weekday" />
                <label htmlFor="weekday-tue">T</label>
                <input type="checkbox" id="weekday-wed" className="weekday" />
                <label htmlFor="weekday-wed">W</label>
                <input type="checkbox" id="weekday-thu" className="weekday" />
                <label htmlFor="weekday-thu">T</label>
                <input type="checkbox" id="weekday-fri" className="weekday" />
                <label htmlFor="weekday-fri">F</label>
                <input type="checkbox" id="weekday-sat" className="weekday" />
                <label htmlFor="weekday-sat">S</label>
                <input type="checkbox" id="weekday-sun" className="weekday" />
                <label htmlFor="weekday-sun">S</label>
            </div>
        );
    }
}

export default WeekdaySelector;