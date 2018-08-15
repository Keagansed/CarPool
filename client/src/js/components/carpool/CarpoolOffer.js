// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import CarpoolStore from '../../stores/CarpoolStore'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
 * Purpose: a modal interface that displays an offer to a carpool. It shows the user who sent the
 * invite and allows you to accept or decline the offer.
 */
class CarpoolOffer extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'state' 
     * contains the toggle field which is a boolean that determines the visibility of the modal
     * , sender which is the user the that sent the object, and deleted which is boolean that 
     * shows if the offer has been deleted or not.
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            token: '',
            toggle: false,
            sender: [],
            deleted: false
        }
    }

    /*
     * Purpose: toggles whether the modal is visible or not by setting the 'toggle' field the 
     * opposite of the previous value. It called when the carpool offer, the modal close button,
     * or the accept/decline buttons are clicked.
     */
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     * Purpose: acquires the user that sent the carpool offer through an api call and sets
     * the user to the sender field in the state.
     */
    componentDidMount(){
        fetch('/api/account/profile?token=' + this.props.store.senderId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success){
                this.setState({sender : json.data});
            }
        })
    }

    /*
     * Purpose: selects the appropriate the output text for the modal based on whether the
     * carpool already exists or not
     */    
    renderOtherMembers() {
        let temp = [];

        if(this.props.store.join) {
            temp.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6">Asking to join your existing carpool</div>
                </div>
            );
        }else{
            temp.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6">This is an invite to create a new carpool</div>
                </div>
            );
        }

        return(temp);
    }

    /*
     * Purpose: returns the size of the carpool based on the value of 'join' in the carpool store
     */
    getCarpoolSize() {

        if(this.props.store.join) {
            return 5;
        }else{
            return 1;
        }

    }

    /*
     * Purpose: calls the 'addCarpool' function in the store using the carpool offer ID. Changes
     * the deleted state to true and closes the modal.
     */
    handleAcceptInvite() {
        CarpoolStore.addCarpool(this.props.offerId, this.props.token);
        this.setState({deleted: true});
        this.toggle();
    }

    /*
     * Purpose: does an api call to decline the carpool offer. Sets the deleted state to true
     * and closes the modal.
     */
    handleDeclineInvite() {
        fetch('/api/system/offers/declineInvite?offerId=' + this.props.offerId + '&token=' + this.props.token, {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            console.log(json);
        });

        this.setState({deleted: true});
        this.toggle();
    }

    /*
     * Purpose: renders the component in the DOM. What is rendered is dependant on the 'deleted' field and the visibility of the modal
     * is dependant on the 'toggle' field.
     */
    render() {
        var modal = [];

        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.props.store.CarpoolName}</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Offer Sent By</h6>
                            </div>
                            <div className="row bordbot-1px-dash-grey mbottom-10px" key={Math.random()}>
                                <div className="col-6">{this.state.sender.firstName +" "+ this.state.sender.lastName}</div>
                                <div className="col-6 vertical-right">
                                    <Link to={"/ProfilePage/" + this.props.store.senderId}>View Profile</Link>
                                </div>
                            </div>                           
                            {this.renderOtherMembers()}
                            <div className="row mtop-10px ">
                                <button onClick={this.handleAcceptInvite.bind(this)} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-green txt-white fw-bold">
                                    Accept
                                </button>
                                <button onClick={this.handleDeclineInvite.bind(this)} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-red txt-white fw-bold">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(this.state.deleted){
           
            return(<div></div>);

        }else{
            
            return(
                <div>
                    <div className="container-fluid bg-purple bordbot-2px-white" onClick={this.toggle}>
                        <div className="row txt-white padver-10px">
                            <div className="col-9">
                                <div className="col-12">
                                    <h5>{this.props.store.CarpoolName}</h5>
                                </div>
                                <div className="col-12">
                                    {this.getCarpoolSize()} Members
                                </div>
                            </div>
                            <div className="col-3 vertical-right">
                                <div className="col-12">
                                    <h5><i className="fa fa-info-circle"></i></h5>
                                </div>
                                <div className="col-12">
                                    {/* Empty for now */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {modal}
                </div>
            );
        }

    }
}

export default CarpoolOffer;