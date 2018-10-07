// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import TripsStore from './../../stores/TripsStore';
import CancelTripModal from './CancelTripModal';
import ReviewTripModal from './ReviewTripModal';
import { getFromStorage } from '../../utils/localStorage.js';
import { generateURL } from '../../utils/generateGoogleMapURL';

//Styling specific to this page
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    topNav: {
        position: 'fixed',
        top: 0,
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    grow: {
        flexGrow: 1,
    },
});

/**
 * Purpose: An interface to allow the user to set up a Trip with members inside a Carpool
 */
@observer class TripPage extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
        };

        this.routeArr = [];
        this.reviewModal = [];
    }

    componentDidMount() {

        this.setState({
            loading: false,
        })

        const token = getFromStorage('sessionKey').token;

        TripsStore.getAllUsers(token);
        TripsStore.getAllTripData(token, this.props.match.params.tripID);

    }

    getDateTime = () => {
        try {
            let dateTime = new Date(TripsStore.tripObj.dateTime);

            //get time
            let hours = dateTime.getHours();
            let minutes = dateTime.getMinutes();
            if (minutes < 10)
                minutes = "0" + minutes;
            if (hours < 10)
                hours = "0" + hours;
            let time = hours + ":" + minutes;

            //get date
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let day = dateTime.getDate();
            let dayNameNumber = dateTime.getDay();
            let month = dateTime.getMonth();
            let year = dateTime.getFullYear();
            let date = days[dayNameNumber] + " " + day + " " + monthNames[month] + " " + year;
            return date + " @ " + time;
        }
        catch (e) { }
    }

    render() {
        const { classes } = this.props;
        let tripName;
        let carpoolers =
            <ListItem key={Math.random()}>
                <ListItemText inset primary="No other Carpoolers" />
            </ListItem>;
        let driver = [];

        let origin, destination;
        let googleURL;
        if (typeof (TripsStore.tripObj.optimalTrip) !== "undefined") {
            this.routeArr = TripsStore.tripObj.optimalTrip;
            googleURL = (generateURL(this.routeArr));
            console.log(googleURL)
            console.log('TCL: TripPage -> render -> googleURL', googleURL);
        }
        if (typeof (TripsStore.routeObj.startLocation) !== "undefined" &&
            typeof (TripsStore.routeObj.endLocation) !== "undefined") {
            origin = TripsStore.routeObj.startLocation.name;
            origin = origin.slice(0, origin.indexOf(",", origin.indexOf(",") + 1));
            destination = TripsStore.routeObj.endLocation.name;
            destination = destination.slice(0, destination.indexOf(",", destination.indexOf(",") + 1));
        }

        try {
            tripName = TripsStore.tripObj.tripName;
            for (let user in TripsStore.tripObj.users) {
                if (user !== TripsStore.tripObj.driver) {
                    if (TripsStore.tripObj.users[user] === true)
                        carpoolers = [];
                    carpoolers.push(
                        <Link to={"/ProfilePage/" + user} style={{ textDecoration: 'none', color: 'white' }} key={Math.random()}>
                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Avatar alt="Profile Picture" src={TripsStore.getUserProfilePic(user)} />
                                <ListItemText primary={TripsStore.getUsernameSurname(user)} secondary='View Profile' />
                            </ListItem>
                        </Link>
                    );
                } else {
                    driver.push(
                        <Link to={"/ProfilePage/" + user} style={{ textDecoration: 'none', color: 'white' }} key={Math.random()}>
                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Avatar alt="Profile Picture" src={TripsStore.getUserProfilePic(user)} />
                                <ListItemText primary={TripsStore.getUsernameSurname(user)} secondary='View Profile' />
                            </ListItem>
                        </Link>
                    );
                }
            }

            if (new Date(TripsStore.tripObj.dateTime) < new Date()) {
                this.reviewModal = (<ReviewTripModal trip={TripsStore.tripObj} userList={TripsStore.allUsers} />);
            } else {
                this.reviewModal = (<CancelTripModal trip={TripsStore.tripObj} userList={TripsStore.allUsers} />);
            }

        }
        catch (E) { }

        return (
            <div className={classes.root}>
                {/* App Bar */}
                <AppBar className={classes.topNav}>
                    <Toolbar className={classes.toolbar} variant='dense'>
                        <Link to={`/HomePage`} style={{ textDecoration: 'none', color: 'white' }}>
                            <IconButton color="inherit" aria-label="Back">
                                <BackIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            {tripName}
                        </Typography>
                        {this.reviewModal}
                    </Toolbar>
                </AppBar>
                <List  style={{paddingTop: 48}}>
                    <ListItem>
                        <ListItemText primary='Date and Time' secondary={this.getDateTime()} style={{textAlign: 'center'}} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Route' secondary={origin + " to " + destination} style={{textAlign: 'center'}} />
                        <MapComponent routeArr={this.routeArr} combined={true} />
                    </ListItem>
                </List>
            </div>
            // <div className="size-100 bg-purple">
            //     <div className="fixed-top container-fluid height-50px bg-aqua">
            //         <div className="row height-100p">
            //             <Link to={`/HomePage`} className="col-2 txt-center">
            //                 <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
            //                     <i className="fa fa-chevron-circle-left txt-center"></i>
            //                 </button>
            //             </Link>
            //             <div className="col-8 txt-center">
            //                 <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
            //                     {tripName}
            //                 </button>
            //             </div>
            //             {this.reviewModal}
            //         </div>
            //     </div>
            //     {/* Padding is there for top and bottom navs*/}
            //     <div className="padtop-50px container-fluid">
            //         <div className="row mtop-10px">
            //             <h6 className="fw-bold mx-auto txt-white">Date and Time</h6>
            //         </div>
            //         <div className="row">
            //             <div className="mx-auto txt-white">{this.getDateTime()}</div>
            //         </div>
            //         <div className="row mtop-10px">
            //             <h6 className="fw-bold mx-auto txt-white">Route Details</h6>
            //         </div>
            //         <div className="row">
            //             <div className="col-12">
            //                 <div className="txt-center mbottom-0 txt-white">
            //                     <p>
            //                         {origin}<br></br>
            //                         to<br></br>
            //                         {destination}
            //                     </p>
            //                 </div>
            //             </div>
            //         </div>

            //         <MapComponent routeArr={this.routeArr} combined={true} />

            //         <div className="row mtop-10px bordbot-1px-dash-grey">
            //             <h6 className="fw-bold mx-auto txt-white">Driver</h6>
            //         </div>

            //         {driver}

            //         <div className="row mtop-10px bordbot-1px-dash-grey">
            //             <h6 className="fw-bold mx-auto txt-white">Other Carpoolers</h6>
            //         </div>

            //         {carpoolers}

            //         <div className="row padtop-10px">
            //             <a
            //                 href={googleURL}
            //                 className="btn btn-primary mx-auto col-10 brad-2rem mbottom-10px bg-aqua txt-purple fw-bold"
            //             >
            //                 <b>Begin Route</b>
            //             </a>
            //         </div>
            //     </div>
            // </div>
        );
    }

}

TripPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripPage);