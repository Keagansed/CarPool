import React, { Component } from 'react';

import Message from './messaging/Message';
import MessageForm from './messaging/MessageForm';
import { DB_CONFIG } from '../config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import '../../css/components/Message.css'

import {
    getFromStorage
} from '../utils/localStorage.js'

class Messaging extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages:[
            ],
            users:[
            ],
        };

        this.addMessage = this.addMessage.bind(this);
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('groupChats/'+this.props.chat);
        this.messages = this.app.database().ref().child('groupChats/'+this.props.chat+"/messages");
        this.users = this.app.database().ref().child('groupChats/'+this.props.chat+"/users");
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
            if (this.state.users[user] === getFromStorage('sessionKey').token)
            {
                verify = true;
            }
        }

        if (verify){
            return (
                <div>
                    {/*<div className="messagesWrapper">*/}
                    {/*<div className="messagesHeader">*/}
                    {/*<div className="heading">Group messaging</div>*/}
                    {/*</div>*/}
                    <div className="messagesBody" id="messageBody">
                        {
                            this.state.messages.map((message) => {
                                return(
                                    <Message messageContent={message.messageContent} messageID={message.id} userID={message.userID} dateTime={message.dateTime} key={message.id}/>
                                )
                            })
                        }
                        </div>
                        {/*<div className="messagesFooter" >*/}
                        <MessageForm addMessage={this.addMessage}/>
                        {/*</div>*/}
                        {/*</div>*/}
                </div>
            );
        }
        else
        {
            return (
                <h2>Loading...</h2>
            );
        }


    }
}

export default Messaging;
