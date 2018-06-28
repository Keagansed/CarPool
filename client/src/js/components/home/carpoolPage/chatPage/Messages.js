import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Message from './Message';
import TripSuggest from './TripSuggest';
import MessageForm from './MessageForm';
import app from '../../../../stores/MessagingStore'
import "../../../../../css/components/Spinner.css"
import CarpoolInfoModal from './carpoolInfoModal/CarpoolInfoModal';
import NewTripModal from './newTripModal/NewTripModal';

import {
    getFromStorage
} from '../../../../utils/localStorage.js'

class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages:[
            ],
            users:[
            ],
        };

        this.addMessage = this.addMessage.bind(this);
        this.suggestTrip = this.suggestTrip.bind(this);
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
            });

            this.setState({
                messages: previousMessages
            });
        });
        const previousUsers = this.state.users;
        this.users.on('child_added', snap =>{
            previousUsers[snap.key] = snap.val();
            this.setState({
                users: previousUsers
            });
        });

        app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users/"+getFromStorage('sessionKey').token)
            .update({lastRefresh:JSON.stringify(new Date())}).then(() => {
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

    suggestTrip(message, userID, users) {
        this.messages.push().set({userID: userID, messageContent: message, dateTime: JSON.stringify(new Date()), tripSuggest:true, users});
    }

    updateLastRefresh(id){
        app.database().ref().child('groupChats/'+id+"/users/"+getFromStorage('sessionKey').token)
            .update({lastRefresh:JSON.stringify(new Date())}).then(() => {
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
                <div>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            )
        }

        if (verify){
            return (
                <div>
                    <div className="size-100 bg-purple">
                        <div className="fixed-top container-fluid height-50px bg-aqua">
                            <div className="row font-20px height-100p">
                                <Link to={`/HomePage`} className="col-2 txt-center">
                                    <button className="btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={() =>this.updateLastRefresh(this.props.match.params.carpoolID)}>
                                        <i className="fa fa-chevron-circle-left"></i>
                                    </button>
                                </Link>
                                <CarpoolInfoModal users={this.state.users} carpoolName={this.props.match.params.carpoolName}/>
                                <NewTripModal users={this.state.users} suggestTrip={this.suggestTrip}/>
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
                                            {/*window.alert(message.usersResponded);*/}
                                            return(
                                                <TripSuggest messageContent={message.messageContent} messageID={message.id} users={message.users} carpoolID={this.props.match.params.carpoolID} usersResponded={message.usersResponded} userID={message.userID} userColour={userColour} dateTime={message.dateTime} key={message.id}/>
                                            );
                                        }
                                        else{
                                            return(
                                                <Message messageContent={message.messageContent} messageID={message.id} userID={message.userID} userColour={userColour} dateTime={message.dateTime} key={message.id}/>
                                            );
                                        }

                                        ;                            })
                                }
                            </div>
                            <MessageForm addMessage={this.addMessage}/>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            );
        }


    }
}

export default Messages;