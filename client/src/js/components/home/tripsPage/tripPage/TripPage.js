import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';

import { getFromStorage } from './../../../../utils/localStorage.js';
import ReviewTripModal from './reviewTripModal/ReviewTripModal';
import MapWrapper from './MapWrapper';

@observer class TripPage extends Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    //========= Fetch Session Token ===========
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }  
    }

    render(){
        //const { token } = this.props.store;
        
        return(
            <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row font-20px height-100p">
                            <Link to={`/HomePage`} className="col-2 txt-center">
                                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                    <i className="fa fa-chevron-circle-left txt-center"></i>
                                </button>
                            </Link>
                            <div className="col-8 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                Home To Work
                            </div>
                            {/* If this trip is still upcoming the below component should be CancelTripModal **Still to be implemented */}
                            <ReviewTripModal />
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px container-fluid">
                        <div className="row mtop-10px">
                            <h6 className="fw-bold mx-auto txt-white">Date and Time</h6>
                        </div>
                        <div className="row">
                            <div className="mx-auto txt-white">Mon 12 January @ 08:00</div>
                        </div>
                        <div className="row mtop-10px">
                            <h6 className="fw-bold mx-auto txt-white">Route Details</h6>
                        </div>
                        <div className="row">
                            <div className="mx-auto padhor-5px txt-white txt-center">
                                From 91 Jagluiperd Street, Pretoria, South Africa 
                                To 1095 South Street, Pretoria, South Africa
                            </div>
                        </div>
                        <MapWrapper/>
                        <div className="row mtop-10px">
                            <h6 className="fw-bold mx-auto txt-white">Your Pickup</h6>
                        </div>
                        <div className="row">
                            <div className="mx-auto padhor-5px txt-white txt-center">08:05 @ 10 John Street, Pretoria, South Africa</div>
                        </div>
                        <div className="row mtop-10px bordbot-1px-dash-grey">
                            <h6 className="fw-bold mx-auto txt-white">Driver</h6>
                        </div>
                        <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                            <div className="col-6 txt-left">Keagan Seddon</div>
                            <div className="col-6 vertical-right"><a>View Profile</a></div>
                        </div>
                        <div className="row mtop-10px bordbot-1px-dash-grey">
                            <h6 className="fw-bold mx-auto txt-white">Other Carpoolers</h6>
                        </div>
                        <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                            <div className="col-6 txt-left">Leonardio Ianigro</div>
                            <div className="col-6 vertical-right"><a>View Profile</a></div>
                        </div>
                        <div className="row bordbot-1px-dash-grey txt-white" key={Math.random()}>
                            <div className="col-6 txt-left">Myron Ouyang</div>
                            <div className="col-6 vertical-right"><a>View Profile</a></div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default TripPage;