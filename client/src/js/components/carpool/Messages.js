import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Message from './Message';
import TripSuggest from './TripSuggest';
import MessageForm from './MessageForm';
import app from '../../stores/MessagingStore'
import "../../../css/components/Spinner.css"
import CarpoolInfoModal from './CarpoolInfoModal';
import NewTripModal from './NewTripModal';

import {
    getFromStorage
} from '../../utils/localStorage.js'

class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
            carpoolID:"",
            messages:[
            ],
            users:[
            ],
        };

        this.addMessage = this.addMessage.bind(this);
        this.suggestTrip = this.suggestTrip.bind(this);
        this.updateLastRefresh = this.updateLastRefresh.bind(this);
        this.database = app.database().ref().child('groupChats/'+this.props.match.params.carpoolID);
        this.messages = app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/messages");
        this.users = app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users");
    }

    componentWillMount(){
        const previousMessages = this.state.messages;
        this.messages.on('child_added', snap =>{
            previousMessages.push({
                id: snap.key,
                messageContent: snap.val().messageContent,
                userID: snap.val().userID,
                dateTime: snap.val().dateTime,
                tripSuggest: snap.val().tripSuggest,
                usersResponded: snap.val().usersResponded,
                users: snap.val().users,
                tripID: snap.val().tripID,
            });

            this.setState({
                messages: previousMessages
            });
        });
        this.database.on('child_added', snap =>{
            if(snap.key==="carpoolID"){
                this.setState({
                    carpoolID: snap.val()
                });
            }
        });
        const previousUsers = this.state.users;
        this.users.on('child_added', snap =>{
            previousUsers[snap.key] = snap.val();
            this.setState({
                users: previousUsers
            });
        });

        let date = JSON.stringify(new Date());
        app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users/"+getFromStorage('sessionKey').token)
            .update({lastRefresh:date}).then(() => {
            return {};
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    }

    addMessage(message, userID) {
        this.messages.push().set({userID: userID, messageContent: message, dateTime: JSON.stringify(new Date()), tripSuggest:false});
    }

    suggestTrip(message, userID, users, tripID) {
        this.messages.push().set({userID: userID, messageContent: message, dateTime: JSON.stringify(new Date()), tripSuggest:true, users, tripID:tripID, usersResponded:{[getFromStorage('sessionKey').token]:true}});
    }

    updateLastRefresh(){
        let date = JSON.stringify(new Date());
        app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users/"+getFromStorage('sessionKey').token)
            .update({lastRefresh:date}).then(() => {
            return {};
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
        return false;
    }

    render() {

        let verify = false;

        for(let user in this.state.users)
        {
            if (user === getFromStorage('sessionKey').token)
            {
                verify = true;
            }
        }

        if(this.state.loading)
        {
            return(
                <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            )
        }

        if (verify){
            return (
                <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row height-100p">
                            <Link to={`/HomePage`} className="col-2 txt-center">
                                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.updateLastRefresh}>
                                    <i className="fa fa-chevron-circle-left txt-center"></i>
                                </button>
                            </Link>
                            <CarpoolInfoModal users={this.state.users} carpoolName={this.props.match.params.carpoolName}/>
                            <NewTripModal users={this.state.users} suggestTrip={this.suggestTrip} carpoolID={this.state.carpoolID}  carpoolName={this.props.match.params.carpoolName}/>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        {/*<Messages carpoolID={this.props.match.params.carpoolID} carpoolName={this.props.match.params.carpoolName}/>*/}
                        <div id="messageBody" className="autoScroll padtop-50px padbot-50px">
                            {
                                this.state.messages.map((message) => {
                                    let userColour;
                                    try {
                                        userColour = this.state.users[message.userID].colour;
                                    }
                                    catch (e) {
                                        userColour = "txt-white";
                                    }
                                    if(message.tripSuggest){
                                        return(
                                            <TripSuggest messageContent={message.messageContent} messageID={message.id} users={message.users} carpoolID={this.props.match.params.carpoolID} tripID={message.tripID} usersResponded={message.usersResponded} userID={message.userID} userColour={userColour} dateTime={message.dateTime} key={message.id}/>
                                        );
                                    }
                                    else{
                                        return(
                                            <Message messageContent={message.messageContent} messageID={message.id} userID={message.userID} userColour={userColour} dateTime={message.dateTime} key={message.id}/>
                                        );
                                    }
                                })
                            }
                        </div>
                        <MessageForm addMessage={this.addMessage}/>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            );
        }


    }
}

export default Messages;