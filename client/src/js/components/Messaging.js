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
        };
        this.addMessage = this.addMessage.bind(this);

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('messages');
    }

    componentWillMount(){
        const previousMessages = this.state.messages;
        this.database.on('child_added', snap =>{
            previousMessages.push({
                id: snap.key,
                messageContent: snap.val().messageContent,
            });

            this.setState({
                messages: previousMessages
            });
        })
    }

    addMessage(message)
    {
        this.database.push().set({messageContent: message});
    }

    render() {

        return (
            <div className="messagesWrapper">
                <div className="messagesHeader">
                    <div className="heading">Group messaging</div>
                </div>
                <div className="messagesBody">
                    {
                        this.state.messages.map((message) => {
                            return(
                                <Message messageContent={message.messageContent} messageID={message.id} key={message.id}/>
                            )
                        })
                    }
                </div>
                <div className="messagesFooter" >
                    <MessageForm addMessage={this.addMessage}/>
                </div>
            </div>
        );
    }
}

export default Messaging;
