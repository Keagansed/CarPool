import React, { Component } from 'react';
import CarpoolOffer from './CarpoolOffer';
import OfferStore from '../../../stores/OfferStore';

class CarpoolOffers extends Component{

    componentDidMount(){
        this.props.store.getOffers(this.props.token);
    }


    renderOffers(){
        const Offers = this.props.store.offers.map(offer =>             
            <CarpoolOffer key={offer._id} store={new OfferStore(offer.CarpoolName, offer.senderId, offer.senderRoute, offer.recieverId, offer.recieverRoute, offer.join)}/>
        )
        
        if(Offers.length > 0) {
            return Offers;
        }else {
            return(
                <h5 className="txt-center mtop-50px txt-white">
                    No Offers{console.log(Offers)}
                </h5>
            );
        }
    }
    render(){
        return(
            <div>
                {this.renderOffers()}
            </div>
        );
    }
}

export default CarpoolOffers;