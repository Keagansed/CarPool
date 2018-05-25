import React, { Component } from 'react';

import {
    getFromStorage
} from '../../utils/localStorage.js'

class MessageForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            newMessageContent : ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleUserInput(e)
    {
        this.setState({
            newMessageContent: e.target.value,
        })
    }

    sendMessage()
    {
        this.props.addMessage(this.state.newMessageContent, getFromStorage('sessionKey').token);
        this.setState({
            newMessageContent: '',
        })
    }


    render() {

        return (
            <div className="formWrapper">
                <input className="messageInput" placeholder="Write a message..." value={this.state.newMessageContent}
                onChange={this.handleUserInput}/>
                <button className="messageButton" onClick={this.sendMessage}>Send Message</button>
            </div>
        );
    }
}

export default MessageForm;
