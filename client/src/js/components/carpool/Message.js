// File Type: Component

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { getFromStorage } from '../../utils/localStorage'


/*
 * Purpose: the message component that is displayed in a carpool chat, including the time the
 * message was sent, the senders name and the message content.
 */
class Message extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'user'
     * contains all the users. 'messageContent' is the actual message that the user sends and
     * 'messageID' is the ID for the message.
     */
    constructor(props) {
        super(props);

        this.messageContent = props.messageContent;
        this.messageID = props.messageID;
    }

    /*
     * Purpose: determines how many days have past since the message has been sent
     */
    getDaysAgo(dat) {
        const today = new Date();
        const createdOn = new Date(JSON.parse(dat));
        const msInDay = 24 * 60 * 60 * 1000;

        createdOn.setHours(0,0,0,0);
        today.setHours(0,0,0,0)

        let diff = (+today - +createdOn)/msInDay

        if(diff === 1) {
            return diff + " day ago";
        }

        return diff + " days ago";
    }

    /*
     * Purpose: determines the exact time that the message was sent.
     */
    getTime(dat) {
        const createdOn = new Date(JSON.parse(dat));
        let hours = createdOn.getHours();
        let mins = createdOn.getMinutes();

        if(mins === 0) {
            mins = "00";
        }else if(mins<10) {
            mins = "0"+mins;
        }

        return hours+":"+mins;
    }

    /*
     * Purpose: determines if the date that the message was/is sent is today or not.
     */
    checkIfToday(dat) {
        let dateObj = new Date(JSON.parse(dat));
        let todaysDate = new Date();

        if(dateObj.toDateString() === todaysDate.toDateString()) {
            return true;
        }

        return false;
    }

    /*
     * Purpose: renders the message component in the DOM which have different formats depending on who sent the
     * message in the chat and when the message was sent.
     */
    render() {
        let dat = "";

        if(this.checkIfToday(this.props.dateTime)) {
            dat = this.getTime(this.props.dateTime);
        }else{
            dat = this.getDaysAgo(this.props.dateTime);
        }

        if(this.props.userID === getFromStorage('sessionKey').token) {
            return(
                <ListItem>
                    <ListItemText 
                        primary={<font style={{color: this.props.userColour}}>You</font>} 
                        secondary={this.messageContent} 
                    />
                    <ListItemSecondaryAction>
                        <ListItemText primary={dat} />
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }else{
            return(
                <ListItem>
                    <ListItemText 
                        primary={<font style={{color: this.props.userColour}}>{this.props.userName}</font>} 
                        secondary={this.messageContent}
                        />
                    <ListItemSecondaryAction>
                        <ListItemText primary={dat} />
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }
        
    }
}

export default Message;