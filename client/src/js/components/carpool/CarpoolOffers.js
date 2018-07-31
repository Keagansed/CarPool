// File Type: Component

import { observer } from 'mobx-react';
import React, { Component } from 'react';

import CarpoolOffer from './CarpoolOffer';
import OfferStore from '../../stores/OfferStore';

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
        const Offers = this.props.store.offers.map(offer =>             
            <CarpoolOffer key={offer._id} offerId={offer._id} store={new OfferStore(offer.CarpoolName, offer.SenderID, offer.SenderRoute, offer.RecieverID, offer.RecieverRoute, offer.JoinRequest)}/>
        )
        
        if(Offers.length > 0) {
            return Offers;
        }else{
            return(
                <h5 className="txt-center mtop-10px txt-white">
                    No Offers
                </h5>
            );
        }
    }

    /*
    * Purpose: displays a spinner while the carpools are loading.
    */
    renderLoading = () => {
        return(
            <div>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        )
    }

    /*
    * Purpose: renders the component in the DOM.
    */
    render() {

        if(this.props.store.loadingOffers){
            return(
                <div className="scroll-vert">
                    {this.renderLoading()}
                </div>
            );
        }else{
            return(
                <div>
                    {this.renderOffers()}
                </div>
            );
        }
    }
}

export default CarpoolOffers;