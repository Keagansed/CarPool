// File Type: Component

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Inbox';

import CarpoolOffer from './CarpoolOffer';
import OfferStore from '../../stores/OfferStore';

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

/*
* Purpose: container for the carpool offers that a user has.
*/
@observer class CarpoolOffers extends Component {

    /*
    * Purpose: accesses the store to call the 'getOffers' function which gets and sets the offers
    * of this user.
    */
    componentDidMount() {
        this.props.store.getOffers(this.props.token);
    }

    /*
    * Purpose: iterates through each offer, creating a CarpoolOffer component for each which is
    * then returned unless there are no carpool offers.
    */
    renderOffers() {
        const Offers = this.props.store.offers.map((offer) => {
            if (!offer.JoinRequest) {
                return (
                    <CarpoolOffer
                        token={this.props.token}
                        key={offer._id}
                        offerId={offer._id}
                        store={new OfferStore(
                            offer.CarpoolName,
                            offer.SenderID,
                            offer.SenderRoute,
                            offer.RecieverID,
                            offer.RecieverRoute,
                            offer.JoinRequest,
                            ""
                        )} />
                );
            } else {
                return (
                    <CarpoolOffer
                        token={this.props.token}
                        key={offer._id}
                        offerId={offer._id}
                        store={new OfferStore(
                            offer.CarpoolName,
                            offer.SenderID,
                            offer.SenderRoute,
                            offer.RecieverID,
                            offer.RecieverRoute,
                            offer.JoinRequest,
                            offer.CarpoolID
                        )} />
                );
            }

        }

        );

        if (Offers.length > 0) {

            return Offers;

        } else {

            return (
                <ListItem divider>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                    <ListItemText primary="No New Offers to Display" secondary="View your routes to make an offer" />
                </ListItem>
            );

        }
    }

    /*
    * Purpose: renders the loading spinner if the carpool offers have not yet been loaded. Once the
    * offers have been loaded then they are rendered.
    */
    render() {
        const { classes } = this.props;
        return (
            <List component="nav" className={classes.root}>
                {this.renderOffers()}
            </List>
        );
    }
}

CarpoolOffers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarpoolOffers);