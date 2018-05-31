import React, { Component } from 'react';

import {
    getFromStorage
} from '../../utils/localStorage.js'

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:[]
        };
        this.messageContent = props.messageContent;
        this.messageID = props.messageID;
    }

    componentDidMount(){
        const idFor = this.props._id;
        fetch('/api/account/getVouches?idFor='+idFor)
            .then(res => res.json())
            .then(vouches => this.setState({vouches}));

        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));

        let objDiv = document.getElementById("messageBody");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    getUsername(_id)
    {
        for (var x in this.state.user)
        {
            if(this.state.user[x]._id === _id)
            {
                return this.state.user[x].firstName;
            }
        }
    }

    getDaysAgo(dat)
    {
        var today = new Date();
        var createdOn = new Date(JSON.parse(dat));
        var msInDay = 24 * 60 * 60 * 1000;

        createdOn.setHours(0,0,0,0);
        today.setHours(0,0,0,0)

        var diff = (+today - +createdOn)/msInDay

        if (diff === 1)
            return diff + " day ago";

        return diff + " days ago";
    }

    getTime(dat)
    {
        var createdOn = new Date(JSON.parse(dat));
        let hours = createdOn.getHours();
        let mins = createdOn.getMinutes();
        if (mins === 0)
        {
            mins = "00";
        }
        return hours+":"+mins;
    }

    checkIfToday(dat)
    {
        let dateObj = new Date(JSON.parse(dat));
        let todaysDate = new Date();
        // return true;
        if(dateObj.toDateString() === todaysDate.toDateString()) {
            return true;
        }
        return false;
    }


    render(props) {
        let dat = "";
        if(this.checkIfToday(this.props.dateTime))
        {
            dat = this.getTime(this.props.dateTime);
        }
        else
        {
            dat = this.getDaysAgo(this.props.dateTime);
        }

        if (this.props.userID === getFromStorage('sessionKey').token)
        {
            return (
                <div className="myMessage fade-in" id="this.props.userID">
                    <strong>You</strong><br/>
                    <p className="messageContent">{ this.messageContent }</p>
                    <div className="dateTime">{dat}</div>
                </div>
            );
        }
        else
        {
            return (
                <div className="message fade-in" id="this.props.userID">
                    <strong><p>{this.getUsername(this.props.userID)}</p></strong>
                    <p className="messageContent">{ this.messageContent }</p>
                    <div className="dateTime">{dat}</div>
                </div>
            );
        }
    }
}

export default Message;
