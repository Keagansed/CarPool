// File Type: Component
import { observer } from "mobx-react";
import React, { Component } from 'react';
import StarEmptyIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getFromStorage } from './../../utils/localStorage';
import VouchStore from './../../stores/VouchStore';
import Vouch from './Vouch';

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
 * Purpose: Container to store and display various Vouch components for the user
 */
@observer class Vouches extends Component {
    constructor(props) {
        super(props);

        this.state = { vouches: [], user: [] };
    }

    componentDidMount() {
        const token = getFromStorage('sessionKey').token;
        const idFor = this.props.userId;

        VouchStore.getAllUsers(token);
        VouchStore.getVouchesFor(idFor);


    }

    render() {
        let vouches = VouchStore.vouchesFor;
        const { classes } = this.props;
        if (vouches.length > 0){
            return (
                <List component="nav" className={classes.root}>
                    {
                        vouches.map((vouch) => {
                            return (<Vouch vouch={vouch} key={Math.random()} />);
                        })
                    }
                </List>
            );
        }else{
            return (
                <List component="nav" className={classes.root}>
                    <ListItem divider>
                        <Avatar>
                            <StarEmptyIcon />
                        </Avatar>
                        <ListItemText primary="No Vouches to Display" secondary="No one has vouched for this user yet." />
                    </ListItem>
                </List>
            );
        }
    }
}

Vouches.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Vouches);