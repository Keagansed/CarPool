import React, { Component } from 'react';

class WeekdaySelector  extends Component {
    render(){
        return(
            <div className="weekDays-selector">
                <input type="checkbox" id="weekday-mon" checked="true" className="weekday" />
                <label htmlFor="weekday-mon">M</label>
                <input type="checkbox" id="weekday-tue" checked="true" className="weekday" />
                <label htmlFor="weekday-tue">T</label>
                <input type="checkbox" id="weekday-wed" checked="true" className="weekday" />
                <label htmlFor="weekday-wed">W</label>
                <input type="checkbox" id="weekday-thu" checked="true" className="weekday" />
                <label htmlFor="weekday-thu">T</label>
                <input type="checkbox" id="weekday-fri" checked="true" className="weekday" />
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