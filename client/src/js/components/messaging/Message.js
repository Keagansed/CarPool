import React, { Component } from 'react';

import {
    getFromStorage
} from '../../utils/localStorage.js'

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.messageContent = props.messageContent;
        this.messageID = props.messageID;
    }


    render(props) {
        if (this.props.userID === getFromStorage('sessionKey').token)
        {
            return (
                <div className="myMessage fade-in">
                    <p className="messageContent">{ this.messageContent }</p>
                </div>
            );
        }
        else
        {
            return (
                <div className="message fade-in">
                    <p className="messageContent">{ this.messageContent }</p>
                </div>
            );
        }
    }
}

export default Message;
