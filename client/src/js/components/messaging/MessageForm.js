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
        this.sendNote = this.sendNote.bind(this);
    }

    handleUserInput(e)
    {
        this.setState({
            newMessageContent: e.target.value,
        })
    }

    sendNote()
    {
        this.props.addMessage(this.state.newMessageContent);
        this.setState({
            newMessageContent: '',
        })
    }


    render() {

        return (
            <div className="formWrapper">
                <input className="messageInput" placeholder="Write a message..." value={this.state.newMessageContent}
                onChange={this.handleUserInput}/>
                <button className="messageButton" onClick={this.sendNote}>Send Message</button>
            </div>
        );
    }
}

export default MessageForm;
