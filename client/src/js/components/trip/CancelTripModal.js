// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getFromStorage } from '../../utils/localStorage.js';
import ServerURL from '../../utils/server';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/**
 * Purpose: An interface to allow the user to cancel a trip they are currently in 
 */
class CancelTripModal extends Component{
    constructor(props) {
        super(props);
  
        this.state = {
            token: '',
            toggle: false
        }

    }

    componentWillMount() {
        const obj = getFromStorage('sessionKey').token;
        let { token } = obj;

        this.setState({
            token,
        })
    }
  
    toggle = (event)=> {
        this.setState(prevState => ( {
            toggle: !prevState.toggle
        }));
    }
 
    cancelOrDelete = ()=> {

        if(this.props.trip.driver === this.state.token){
            this.deleteTrip();
        }else{
            this.cancelTrip();
        }

    }

    cancelTrip = ()=> {
        fetch(ServerURL + '/api/system/trip/cancelTrip?token=' + this.state.token, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                _id: this.props.trip._id,
                token: getFromStorage('sessionKey').token
            })
        })
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=> {

                if(json.success) {
                    // this.tripID = json._id;
                    // suggestTrip(messageContent, getFromStorage('sessionKey').token, users, this.tripID);
                }else{
                    alert(json.message);
                }

            });
        this.toggle();
    }

    deleteTrip = ()=> {
        fetch(ServerURL + '/api/system/trip/deleteTrip?tripId=' + this.props.trip._id + '&token=' + this.state.token)
            .then(res => res.json())
            .then(json => {
            });
        this.toggle();
    }

    render(){
        let modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Cancel Trip</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Are you sure you want to cancel this trip?</h6>
                            </div>
                            <div className="row">
                                <Link to={`/HomePage`} onClick={this.cancelOrDelete} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold">
                                    <button type="submit" id="btnYesCancel">
                                        Yes
                                    </button>
                                </Link>
                                <button type="submit" onClick={this.toggle} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNoCancel">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="col-2 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px"  onClick={this.toggle}>
                    <i className="fa fa-trash"></i>
                </button>
                { modal }
            </div>
        );
    }
}

export default CancelTripModal;