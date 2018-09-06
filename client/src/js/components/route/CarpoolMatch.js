// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../stores/FirebaseStore.js';
import MapComponent from '../google/GeneralMapWrapper';
import OffersStore from '../../stores/OffersStore';
import CarpoolMatchStore from './../../stores/CarpoolMatchStore';

//Just using temporarily for demonstration purposes - remove when not needed anymore
import tempGroupPic from '../../../css/images/profile_default.png';
import { observer } from "mobx-react";

import { toJS } from 'mobx';

//'display' is used to show the modal
const display = {
    display: 'block'
};
//'hide' is used to hide the modal
const hide = {
    display: 'none'
};

/*
* The purpose of this CarpoolMatch class is to provide a component representitive of a
* carpool match on a route's page. When clicked on, a modal should be displayed which
* gives users the option to request to join the carpool.
*/
@observer class CarpoolMatch extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);
  
        this.state = {
            //'toggle' represents the state of the modal - false indicates it is not being shown.
            toggle: false,
            //carpoolMembers is used to store the members of any carpool match temporarily when accessed
            carpoolMembers:[],
            //routeArr is used to store the routes of any carpool match temporarily when accessed
            routeArr:[]
        }

        this.routeArr = [];
        this.carpoolMembers = [];
        this.carpoolMatchStore = new CarpoolMatchStore();
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentDidMount() {

        this.carpoolMatchStore.getRoute(this.props.token, this.props.uRouteId);

        this.props.routeArr.forEach(route => {
            this.carpoolMatchStore.getRoute(this.props.token, route)
        });
       
    }

    generateUserProfileLinks = () => {
        // console.log(toJS(this.carpoolMatchStore.carpoolMembers));
        this.carpoolMembers = [];
        this.carpoolMembers = [];

        this.carpoolMatchStore.carpoolMembers.forEach(userObj =>{
            const memberComponent = (
                <div 
                    className="row bordbot-1px-dash-grey"
                    key={Math.random()}
                >
                    <div className="col-6">
                        {userObj.firstName+' '+userObj.lastName}
                    </div>
                    <div className="col-6 vertical-right">
                        <Link to={"/ProfilePage/"+userObj._id}>View Profile</Link>
                    </div>
                </div>
            )
            this.carpoolMembers.push(memberComponent);
        });
        this.routeArr = this.carpoolMatchStore.routeArr.slice();
        
    } 
    /*
    * The purpose of the toggle method is to switch the modal between being active and inactive.
    */
    toggle = (event) => {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     * The purpose of the makeOfferToJoin method is to send an offer to another user to join in an existing carpool.
     */
    makeOfferToJoin() {

        fetch('/api/system/route/getRoute?routeId=' + this.props.routeArr[0].id + '&token=' + this.props.token, {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(route => {
                if(route.success) {

                    fetch('/api/system/carpool/getCarpool?_id=' + this.props.carpoolId, {
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json'
                        },
                    })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(carpool => {
                            let groupChatID = carpool.data[0].groupChatID;
                            let users = app.database().ref().child('groupChats/'+groupChatID+"/users");
                            let hasAdded = false;

                            users.on('child_added', snap =>{
                                if(carpool.success) {
                                    if(!hasAdded){
                                        OffersStore.makeOfferToJoin(
                                            carpool.data[0].carpoolName, 
                                            this.props.token, 
                                            this.props.uRouteId, 
                                            route.data[0].userId, 
                                            snap.key, true, 
                                            this.props.carpoolId
                                        );
                                        let groupChatMessages = app.database().ref().child('groupChats/'+groupChatID+'/messages');

                                        fetch('/api/account/profile?token=' + this.props.token + '&userId=' + this.props.token,{
                                            method:'GET',
                                            headers:{
                                                'Content-Type':'application/json'
                                            },
                                        })
                                            .then(res => res.json())
                                            .catch(error => console.error('Error:', error))
                                            .then(sender => {

                                                fetch('/api/account/profile?token=' + this.props.token + '&userId=' + route.data[0].userId,{
                                                    method:'GET',
                                                    headers:{
                                                        'Content-Type':'application/json'
                                                    },
                                                })
                                                    .then(res => res.json())
                                                    .catch(error => console.error('Error:', error))
                                                    .then(receiver => {
                                                        if (receiver.success && sender.success){
                                                            groupChatMessages.push().set({
                                                                userID: "Server",
                                                                messageContent: (sender.data[0].firstName + " " + sender.data[0].lastName + " has requested to join your carpool. The invite has been sent to " + receiver.data[0].firstName + " " + receiver.data[0].lastName +  "."),
                                                                dateTime: JSON.stringify(new Date()),
                                                                tripSuggest:false
                                                            });
                                                        }
                                                    });
                                            });
                                        hasAdded = true;
                                    }
                                }else{
                                    console.log("error: "+ carpool.message);
                                }
                            });
                        });

                    this.toggle();
                }else{
                    console.log("error: "+ route.message);
                }
            });
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        this.generateUserProfileLinks();
        var modal = [];
        // Push the content of the modal to the array
        modal.push(
            // Modal
            <div 
                key="0" 
                className="modal" 
                tabIndex="-1" 
                role="dialog" 
                id="myModal" 
                style={this.state.toggle ? display : hide}
            >
                <div 
                    className="modal-dialog" 
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Request to Join Carpool</h5>
                            <button 
                                type="button" 
                                className="close" 
                                onClick={this.toggle} 
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Other Carpool Members</h6>
                            </div>
                                {this.carpoolMembers}
                            <div className="row mtop-10px">
                                <h6 className="fw-bold mx-auto">Route Comparison</h6>
                            </div>
                            <div className="row mbottom-10px">
                                <div className="col-12">
                                    <MapComponent routeArr={this.routeArr}/>
                                </div>                                
                            </div>
                            <div className="row">
                                <button 
                                    onClick={this.makeOfferToJoin.bind(this)}
                                    type="submit" 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" 
                                    id="btnNewRoute"
                                >
                                    Send Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        //Return the CarpoolMatch
        return(
            <div>
                <div 
                    className="container-fluid bg-purple bordbot-2px-white" 
                    onClick={this.toggle}
                >
                    <div className="row txt-white padver-10px">
                        <div className="col-2">
                                <img 
                                    src={tempGroupPic} 
                                    className="mx-auto my-auto rounded-circle bord-2px-white bg-lightgrey" 
                                    height="60" 
                                    width="60" 
                                    alt="s" 
                                />
                        </div>
                        <div className="col-7">
                            <div className="col-12">
                                <h5>{"Carpool: "+this.props.carpoolName}</h5>
                            </div>
                            <div className="col-12">
                                1.5km Further
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5>
                                    <i className="fa fa-handshake-o"></i>
                                </h5>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal to display/hide when the match is clicked on */}
                {modal}
            </div>
        );
    }
}

export default CarpoolMatch;