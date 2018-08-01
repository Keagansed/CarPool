// File Type: Component

import React, { Component } from 'react';

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
            newMessageContent : ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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

        return(
            <div>
                {/*<input className="messageInput" placeholder="Write a message..." value={this.state.newMessageContent}*/}
                {/*onChange={this.handleUserInput}/>*/}
                {/*<button className="messageButton" onClick={this.sendMessage}>Send Message</button>*/}

                <div className="fixed-bottom container-fluid height-50px">
                    <div className="row height-100p txt-purple font-20px fw-bold">
                        <input type="text" placeholder="Write a message..." className="col-10 bord-0 focusbord-1px-purple"
                               value={this.state.newMessageContent}
                               onChange={this.handleUserInput}/>
                        <button className="col-2 btn height-100p bg-white txt-purple fw-bold brad-0 font-20px txt-center" onClick={this.sendMessage}>
                            <i className="fa fa-arrow-circle-right" ></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageForm;
