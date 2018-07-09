import { observer } from 'mobx-react';
import React, { Component } from 'react';
import CarpoolOffer from './CarpoolOffer';
import OfferStore from '../../../stores/OfferStore';

@observer class CarpoolOffers extends Component{
    componentDidMount(){
        this.props.store.getOffers(this.props.token);
    }


    renderOffers(){
        const Offers = this.props.store.offers.map(offer =>             
            <CarpoolOffer key={offer._id} store={new OfferStore(offer.CarpoolName, offer.SenderID, offer.SenderRoute, offer.RecieverID, offer.RecieverRoute, offer.JoinRequest)}/>
        )
        
        if(Offers.length > 0) {
            return Offers;
        }else {
            return(
                <h5 className="txt-center mtop-50px txt-white">
                    No Offers{console.log(this.props.token)}
                </h5>
            );
        }
    }

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

    render(){
        if (this.props.store.loadingOffers){
            return(
                <div className="scroll-vert">
                    {this.renderLoading()}
                </div>
            );
        }
        else{
            return(
                <div>
                    {this.renderOffers()}
                </div>
            );
        }
    }
}

export default CarpoolOffers;