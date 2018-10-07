// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/Navigation';

import Trip from './Trip';
import TripsStore from '../../stores/TripsStore'
import { getFromStorage } from '../../utils/localStorage.js'
import VerifyWrapper from '../../containers/VerifyWrapper';

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

/**
 * Purpose: An container to store and display all the Trip components of the user
 */
@observer class Trips extends Component {

    componentDidMount() {
        let obj = getFromStorage('sessionKey');
        let token;

        if (obj) {
            token = obj.token;
        }

        TripsStore.getFilteredTrips(token);
    }

    renderPreviousTrips = () => {
        const prev = TripsStore.previousTrips.map((trip) =>
            <Trip trip={trip} key={Math.random()} />
        )

        if (prev.length > 0) {
            return prev;
        } else {
            return (
                <ListItem>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                    <ListItemText primary="No Previous Trips" secondary="You have not been on any trips." />
                </ListItem>
            );
        }
    }

    renderUpcomingTrips = () => {
        const upcoming = TripsStore.upcomingTrips.map((trip) =>
            <Trip trip={trip} key={Math.random()} />
        )

        if (upcoming.length > 0) {
            return upcoming;
        } else {
            return (
                <ListItem>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                    <ListItemText primary="No Upcoming Trips" secondary="You do not have any trips scheduled." />
                </ListItem>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <List component="nav" className={classes.root}>
                <ListSubheader>{`Upcoming Trips`}</ListSubheader>
                {this.renderUpcomingTrips()}
                <ListSubheader>{`Previous Trips`}</ListSubheader>
                {this.renderPreviousTrips()}
            </List>
        );
    }
}


Trips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyWrapper(Trips));