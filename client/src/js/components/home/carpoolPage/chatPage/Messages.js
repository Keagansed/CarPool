import React, { Component } from 'react';

import Message from './Message';
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
        this.database = app.database().ref().child('groupChats/'+this.props.carpoolID);
        this.messages = app.database().ref().child('groupChats/'+this.props.carpoolID+"/messages");
        this.users = app.database().ref().child('groupChats/'+this.props.carpoolID+"/users");
    }

    componentWillMount(){
        const previousMessages = this.state.messages;
        this.messages.on('child_added', snap =>{
            previousMessages.push({
                id: snap.key,
                messageContent: snap.val().messageContent,
                userID: snap.val().userID,
                dateTime: snap.val().dateTime,
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
            if (snap.key === getFromStorage('sessionKey').token)
            {
                app.database().ref().child('groupChats/'+this.props.carpoolID+"/users/"+getFromStorage('sessionKey').token)
                    .update({lastRefresh:JSON.stringify(new Date())}).then(() => {
                    return {};
                }).catch(error => {
                    return {
                        errorCode: error.code,
                        errorMessage: error.message
                    }
                });

            }
        });
    }

    addMessage(message, userID)
    {
        this.messages.push().set({userID: userID, messageContent: message, dateTime: JSON.stringify(new Date())});
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
                    <div id="messageBody">
                        {
                            this.state.messages.map((message) => {
                                let userColour = this.state.users[message.userID].colour;
                                return(
                                    <Message messageContent={message.messageContent} messageID={message.id} userID={message.userID} userColour={userColour} dateTime={message.dateTime} key={message.id}/>
                                )
                            })
                        }
                    </div>
                    <MessageForm addMessage={this.addMessage}/>
                    <CarpoolInfoModal users={this.state.users}/>
                    <NewTripModal users={this.state.users}/>
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