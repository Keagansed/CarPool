import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';

import { getFromStorage } from './../../../../utils/localStorage.js';
import ReviewTripModal from './reviewTripModal/ReviewTripModal';

@observer class TripPage extends Component{

    constructor(){
        super()

        this.state = {
            loading: true,
            trip:[]
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

        fetch('/api/system/getTrip?_id='+this.props.match.params.tripID)
            .then(res => res.json())
            .then(json => this.setState({trip : json}));
    }

    render(){
        //const { token } = this.props.store;
        let tripName;
        try{
            tripName = this.state.trip[0].tripName;
        }
        catch(E) {

        }
        
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
                                {tripName}
                            </div>
                            {/* If this trip is still upcoming the below component should be CancelTripModal **Still to be implemented */}
                            <ReviewTripModal trip={this.state.trip[0]}/>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px">
                        
                    </div>
            </div>
        );
    }
}

export default TripPage;