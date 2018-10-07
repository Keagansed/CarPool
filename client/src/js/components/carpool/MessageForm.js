// File Type: Component

import React, { Component } from 'react';
import SendIcon from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import { getFromStorage } from '../../utils/localStorage.js'

/*
 * Purpose: provides the message form which allows the user to enter a message that they would like to send in the
 * carpool chat
 */
class MessageForm extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'newMessageContent' will contain
     * the actual message that the user wants to send to carpool chat. 
     */
    constructor(props) {
        super(props);
        this.state = {
            newMessageContent: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    /*
     * Purpose:  sets the 'newMessageContent' field to the text from the corresponding input element in the form
     */
    handleUserInput(e) {
        this.setState({
            newMessageContent: e.target.value
        })
    }

    /*
     * Purpose: adds the message to the 'message' field in the Messages component
     */
    sendMessage() {
        this.props.addMessage(this.state.newMessageContent, getFromStorage('sessionKey').token, false);
        this.setState({
            newMessageContent: ''
        })
    }

    /*
     * Purpose: renders the messageForm component in the DOM.
     */
    render() {

        return (
            <Input
                fullWidth
                multiline
                rowsMax="4"
                value={this.state.newMessageContent}
                onChange={this.handleUserInput}
                onKeyPress={this._handleKeyPress}
                endAdornment={
                    <InputAdornment position="end">
                        <SendIcon onClick={this.sendMessage} style={{paddingRight: 10}}/>
                    </InputAdornment>
                }
                style={{position: 'fixed',
                        bottom: 0,
                        borderTop: '1px solid lightgrey',
                        paddingLeft: 5,
                        backgroundColor: 'white',
                        color: 'black',
                }}
            />
        );
    }
}

export default MessageForm;
