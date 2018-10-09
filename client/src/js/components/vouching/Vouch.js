// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import StarEmptyIcon from '@material-ui/icons/StarBorder';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import VouchStore from './../../stores/VouchStore';
import ServerURL from '../../utils/server';

/**
 * Purpose: Interface to display the various vouches/ ratings the user has received
 */
@observer class Vouch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            user: [],
            open: false,
        }
    }

    //Open/close details dialog
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    printStars = (numStars) => {
        let starElements = [],
            n = numStars,
            i;

        for (i = 0; i < n; i = i + 1) {
            starElements.push(
                <StarIcon style={{ color: 'gold' }} key={Math.random()}/>
            );
        }
        for (i = 0; i < 5 - n; i = i + 1) {
            starElements.push(
                <StarEmptyIcon style={{ color: 'gold' }}  key={Math.random()}/>
            );
        }

        return starElements;
    }

    render() {
        let profilePic = VouchStore.getUserProfilePic(this.props.vouch.idBy);
        const profilePicture = ServerURL + "/api/account/getImage?filename=" + profilePic;
        let userNameSurname = VouchStore.getUsernameSurname(this.props.vouch.idBy);

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <ListItem button>
                        <Avatar alt="Profile Picture" src={profilePicture} />
                        <ListItemText primary={this.printStars(this.props.vouch.rating)} secondary={userNameSurname} />
                    </ListItem>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {this.props.vouch.reviewBody}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default Vouch;