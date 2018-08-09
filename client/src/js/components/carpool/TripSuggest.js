// File Type: Component

import React, { Component } from 'react';

import app from '../../stores/MessagingStore'
import { getFromStorage } from '../../utils/localStorage.js';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
 * Purpose: a message interface for a trip suggestion and an interface for viewing and accepting/declining the trip  
 */
class TripSuggest extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'user' contains all the users.
     * 'buttons' contains the html button elements for the modal interface. 'toggle' represents the visibility of the
     *  modal. 'messageContent' is the text of the message, and the messages ID is contained within 'messageID'.
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            user:[],
            buttons: [],
            toggle: false
        };
        this.messageContent = props.messageContent;
        this.messageID = props.messageID;
        this.message = app.database().ref().child('groupChats/'+this.props.carpoolID+"/messages/"+this.messageID);
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }

    /*
     * Purpose: sets the 'buttons' fields to the appropriate html button elements.
     */
    componentWillMount() {
        this.setState({buttons : (
            <div className="row txt-white padleft-10px padright-10px padtop-0" key={Math.random()}>
                <div className="col-6">
                    <button onClick={this.accept} className="btn btn-primary mx-auto width-100p brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold">
                        Accept
                    </button>
                </div>
                <div className="col-6">
                    <button onClick={this.reject} className="btn btn-primary mx-auto width-100p brad-2rem mbottom-1rem bg-red txt-purple fw-bold" id="btnSuggestTrip">
                        Reject
                    </button>
                </div>
            </div>)
        });
    }

    /*
     * Purpose: acquires all the users and stores them in the 'user' field.
     */
    componentDidMount(){
        const idFor = this.props._id;
        fetch('/api/account/vouch/getVouches?idFor='+idFor)
            .then(res => res.json())
            .then(vouches => this.setState({vouches}));

        fetch('/api/account/profile/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));

        let objDiv = document.getElementById("messageBody");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    /*
     * Purpose: toggles the visibility of the modal interface.
     */
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     * Purpose: uses the _id argument to get the name of the user from the 'user' field.
     */
    getUsername(_id) {

        for(var x in this.state.user) {

            if(this.state.user[x]._id === _id) {
                return this.state.user[x].firstName;
            }

        }
    }

    /*
     * Purpose: determines how many days have past since the message has been sent
     */
    getDaysAgo(dat) {
        var today = new Date();
        var createdOn = new Date(JSON.parse(dat));
        var msInDay = 24 * 60 * 60 * 1000;

        createdOn.setHours(0,0,0,0);
        today.setHours(0,0,0,0)

        var diff = (+today - +createdOn)/msInDay

        if(diff === 1) {
            return diff + " day ago";
        }

        return diff + " days ago";
    }

    /*
     * Purpose: determines the exact time that the message was sent.
     */
    getTime(dat) {
        var createdOn = new Date(JSON.parse(dat));
        let hours = createdOn.getHours();
        let mins = createdOn.getMinutes();

        if(mins === 0) {
            mins = "00";
        }else if(mins<10) {
            mins = "0"+mins;
        }

        return hours+":"+mins;
    }

    /*
     * Purpose: determines if the date that the message was/is sent is today or not.
     */
    checkIfToday(dat) {
        let dateObj = new Date(JSON.parse(dat));
        let todaysDate = new Date();
        // return true;

        if(dateObj.toDateString() === todaysDate.toDateString()) {
            return true;
        }

        return false;
    }

    /*
     * Purpose: updates the 'usersResponded' field in firebase, and changes the 'buttons' field to reflect the users 
     * response. Performs an API POST request to reflect the response of the user to the trip suggestion.
     */
    accept() {
        app.database().ref().child('groupChats/'+this.props.carpoolID+"/messages/"+this.messageID+"/usersResponded")
            .update({[getFromStorage('sessionKey').token]:true}).then(() => {
                return{};
            }).catch(error => {

                return{
                    errorCode: error.code,
                    errorMessage: error.message
                }
                
            });

        this.setState({buttons : (
                <div className="row txt-white padtop-0" key={Math.random()}>
                    <div className="col-12">
                        <p className="txt-aqua">Accepted</p>
                    </div>
                </div>
            )
        });

        fetch('/api/system/trip/respondToTrip',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                _id: this.props.tripID,
                userID: getFromStorage('sessionKey').token
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{

            if(json.success) {
                // this.tripID = json._id;
                // suggestTrip(messageContent, getFromStorage('sessionKey').token, users, this.tripID);
            }else{
                alert(json.message);
            }

        })
    }

    /*
     * Purpose: updates the 'usersResponded' field in firebase, and changes the 'buttons' field to reflect
     * the response of the user.
     */
    reject() {
        app.database().ref().child('groupChats/'+this.props.carpoolID+"/messages/"+this.messageID+"/usersResponded")
            .update({[getFromStorage('sessionKey').token]:false}).then(() => {
                return{};
            }).catch(error => {
                return{
                    errorCode: error.code,
                    errorMessage: error.message
                }
            });

        this.setState({buttons : (
            <div className="row txt-white padtop-0" key={Math.random()}>
                <div className="col-12">
                    <p className="txt-red">Rejected</p>
                </div>
            </div>
        )
        });

        this.buttons = this.state.buttons;
    }

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render(props) {
        var modal = [];
        modal.push(
            // Modal
            <div key={Math.random()} className="modal" tabIndex="-1" role="dialog" id="carpoolInfoModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Trip Suggestion</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row txt-white padver-10px padtop-0">
                                <div className="col-12">
                                    <div className="col-12 tripSuggest">
                                        <div className="txt-purple">
                                            { this.messageContent }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row padtop-0">
                                <div className="col-12">
                                    <div className="col-12">
                                        {this.state.buttons}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        let dat = "";

        if(this.checkIfToday(this.props.dateTime)) {
            dat = this.getTime(this.props.dateTime);
        }else{
            dat = this.getDaysAgo(this.props.dateTime);
        }

        if(this.props.userID === getFromStorage('sessionKey').token) {
            this.buttons = (
                <div className="row txt-white padtop-0" key={Math.random()}>
                    <div className="col-12">
                        <p className="txt-grey">You suggested this trip</p>
                    </div>
                </div>
            );
        }else{
            
            try{

                if(this.props.usersResponded[getFromStorage('sessionKey').token] === undefined) {
                    throw new Error();
                }else if(this.props.usersResponded[getFromStorage('sessionKey').token]) {
                    this.buttons = (
                        <div className="row txt-white padtop-0" key={Math.random()}>
                            <div className="col-12">
                                <p className="txt-aqua">Accepted</p>
                            </div>
                        </div>
                    );
                }

                if(!this.props.usersResponded[getFromStorage('sessionKey').token]) {
                    this.buttons = (
                        <div className="row txt-white padtop-0" key={Math.random()}>
                            <div className="col-12">
                                <p className="txt-red">Rejected</p>
                            </div>
                        </div>
                    );
                }

            }catch(e) {

                try {

                    if(this.props.users[getFromStorage('sessionKey').token] === true) {
                        this.buttons = this.state.buttons;
                    }else{
                        this.buttons = (
                            <div className="row txt-white padtop-0" key={Math.random()}>
                                <div className="col-12">
                                    <p className="txt-grey">You are not part of this suggestion</p>
                                </div>
                            </div>
                        );
                    }

                }catch(e) {
                    this.buttons = (
                        <div className="row txt-white padtop-0" key={Math.random()}>
                            <div className="col-12">
                                <p className="txt-grey">You are not part of this suggestion</p>
                            </div>
                        </div>
                    );
                }

            }

        }

        if(this.props.userID === getFromStorage('sessionKey').token) {

            return(
                <div className="container-fluid bg-purple bordbot-2px-white">
                    {/* Maybe use different colours for different users? */}
                    <div className="row padver-10px padbot-10px" onClick={this.toggle}>
                        <div className="col-6">
                            <div className={"col-12 "+this.props.userColour}>
                                <h5>You</h5>
                            </div>
                            <div className={this.props.userColour + " col-12"}>
                                Suggested a trip.
                            </div>
                        </div>
                        <div className="col-6 vertical-right txt-grey">
                            <div className="col-12">
                                <h6>{dat}</h6>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
                    {modal}
                </div>
            );

        }else{

            return(
                <div className="container-fluid bg-purple bordbot-2px-white">
                    <div  onClick={this.toggle}>
                        <div className="row padver-10px padbot-0">
                            <div className="col-6">
                                <div className={"col-12 "+this.props.userColour}>
                                    <h5>{this.getUsername(this.props.userID)}</h5>
                                </div>
                                <div className="col-12">
                                    {/* Empty for now */}
                                </div>
                            </div>
                            <div className="col-6 vertical-right txt-grey">
                                <div className="col-12">
                                    <h6>{dat}</h6>
                                </div>
                                <div className="col-12">
                                    {/* Empty for now */}
                                </div>
                            </div>
                        </div>
                        <div className="row padver-10px padtop-0">
                            <div className="col-12">
                                <div className={"col-12 "+this.props.userColour}>
                                    Suggested a trip. Click for more info.
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

export default TripSuggest;