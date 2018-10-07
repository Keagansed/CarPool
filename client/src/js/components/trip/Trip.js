// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/ViewList';
import TripIcon from '@material-ui/icons/NearMe';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

/**
 * Purpose: An interface to allow the user to set up a Trip
 */
class Trip  extends Component {
    render(){
        let dateTime = new Date(this.props.trip.dateTime);

        //get time
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        if(minutes < 10)
            minutes = "0" + minutes;
        if(hours < 10)
            hours = "0" + hours;
        let time = hours + ":" + minutes;

        //get date
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let day = dateTime.getDate();
        let dayNameNumber = dateTime.getDay();
        let month = dateTime.getMonth();
        let year = dateTime.getFullYear();
        let date = days[dayNameNumber] + " " + day + " " + monthNames[month] + " " + year;

        return(
            <Link to={`/HomePage/Trip/`+this.props.trip._id} style={{ textDecoration: 'none' }}>
                <ListItem button divider>
                    <Avatar>
                        <TripIcon />
                    </Avatar>
                    <ListItemText primary={this.props.trip.tripName} secondary={date + " @ " + time} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="View Trip Details">
                            <InfoIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Link>
        );
    }
}

export default Trip;