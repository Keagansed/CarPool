//File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import app from '../../stores/MessagingStore'
import CarpoolInfoModal from './CarpoolInfoModal';
import { getFromStorage } from '../../utils/localStorage.js'
import Message from './Message';
import MessageForm from './MessageForm';
import NewTripModal from './NewTripModal';
import TripSuggest from './TripSuggest';

import "../../../css/components/Spinner.css"

/*
 * Purpose: container for the messages that are sent within a carpool chat
 */
class Messages extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'carpoolID' contains the 
     * ID of the carpool chat. 'messages' contains all the messages that were/are sent in the chat. 'users' contains
     * the users that are in the carpool.
     */
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            carpoolID:"",
            messages:[],
            users:[],
            userList:[]
        };

        this.addMessage = this.addMessage.bind(this);
        this.suggestTrip = this.suggestTrip.bind(this);
        this.updateLastRefresh = this.updateLastRefresh.bind(this);
        this.database = app.database().ref().child('groupChats/'+this.props.match.params.carpoolID);
        this.messages = app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/messages");
        this.users = app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users");
    }

    /*
     * Purpose: adds all messages to previous messages, sets 'carpoolID' and updates users.
     */
    componentWillMount() {
        let obj = getFromStorage('sessionKey');
        let { token } = obj;
        
        this.setState({
            token,
        });

        const previousUsers = this.state.users;
        let previousMessages = this.state.messages;

        this.messages.on('child_added', snap =>{
            previousMessages.push({
                id: snap.key,
                messageContent: snap.val().messageContent,
                userID: snap.val().userID,
                dateTime: snap.val().dateTime,
                tripSuggest: snap.val().tripSuggest,
                usersResponded: snap.val().usersResponded,
                users: snap.val().users,
                tripID: snap.val().tripID,
            });

            this.setState({
                messages: previousMessages
            });

        });

        this.database.on('child_added', snap =>{
            if(snap.key==="carpoolID"){
                this.setState({
                    carpoolID: snap.val()
                });
            }
        });
        
        this.users.on('child_added', snap =>{
            previousUsers[snap.key] = snap.val();
            this.setState({
                users: previousUsers
            });
            
        });

        const date = JSON.stringify(new Date());
        app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users/"+getFromStorage('sessionKey').token)
            .update({lastRefresh:date}).then(() => {
                return {};
            }).catch(error => {

                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }

        });


        fetch('/api/account/profile/getAllUsers?token=' + token)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({userList: json.data})
                }
            });
        
    }

    //Switch off event listeners for firebase
    componentWillUnmount(){
        this.database.off();
        this.messages.off();
        this.users.off();
    }
    /*
     * Purpose: adds a new message to the current messages
     */
    addMessage(message, userID) {
        this.messages.push().set({userID: userID, messageContent: message, dateTime: JSON.stringify(new Date()), tripSuggest:false});
    }

    /*
     * Purpose: Returns an array of all unique userIds from all messages 
     */
    getUsername = (_id) => {

        for(let x in this.state.userList) {

            if(this.state.userList[x]._id === _id) {
                return this.state.userList[x].firstName;
            }

        }

    };

    /*
     * Purpose:  adds a trip suggestion to the messages
     */
    suggestTrip(message, userID, users, tripID) {
        this.messages.push().set({
            userID: userID, 
            messageContent: message, 
            dateTime: JSON.stringify(new Date()), 
            tripSuggest:true, 
            users, 
            tripID:tripID, 
            usersResponded:{[getFromStorage('sessionKey').token]:true}
        });
    }

    /*
     * Purpose: updates the last refresh which is used to be able to determine if a message is new.
     */
    updateLastRefresh() {
        let date = JSON.stringify(new Date());
        app.database().ref().child('groupChats/'+this.props.match.params.carpoolID+"/users/"+this.state.token)
            .update({lastRefresh:date}).then(() => {
                return {};
            }).catch(error => {
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }
            });

        return false;
    }

    /*
     * Purpose: renders the component in the DOM. Displays a spinner if the messages are still loading or if the user cannot be verified.
     * The colour of the senders name is also different for each person. 
     */
    render() {
        let verify = false;

        for(let user in this.state.users) {

            if(user === this.state.token) {
                verify = true;
            }

        }

        if(this.state.loading) {

            return(
                <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            )
            
        }

        if(verify) { 
            
            return(
                <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row height-100p">
                            <Link to={`/HomePage`} className="col-2 txt-center">
                                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.updateLastRefresh}>
                                    <i className="fa fa-chevron-circle-left txt-center"></i>
                                </button>
                            </Link>
                            <CarpoolInfoModal 
                                token={this.state.token}
                                users={this.state.users} 
                                carpoolName={this.props.match.params.carpoolName} 
                                carpoolID={this.props.match.params.carpoolID}
                            />
                            <NewTripModal 
                                token={this.state.token}
                                users={this.state.users} 
                                suggestTrip={this.suggestTrip} 
                                carpoolID={this.state.carpoolID}  
                                carpoolName={this.props.match.params.carpoolName}
                            />
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        {/*<Messages carpoolID={this.props.match.params.carpoolID} carpoolName={this.props.match.params.carpoolName}/>*/}
                        <div id="messageBody" className="autoScroll padtop-50px padbot-50px">
                            {
                                this.state.messages.map((message) => {
                                    let userColour;
                                    let userName = this.getUsername(message.userID);
                                    try{
                                        userColour = this.state.users[message.userID].colour;
                                    }catch(e) {
                                        userColour = "txt-white";
                                    }

                                    if(message.tripSuggest) {

                                        return(
                                            <TripSuggest
                                                token={this.state.token}
                                                messageContent={message.messageContent} 
                                                messageID={message.id} 
                                                users={message.users} 
                                                carpoolID={this.props.match.params.carpoolID} 
                                                tripID={message.tripID} 
                                                usersResponded={message.usersResponded} 
                                                userID={message.userID} 
                                                userColour={userColour} 
                                                dateTime={message.dateTime} 
                                                key={message.id}
                                            />
                                        );

                                    }else{

                                        return(
                                            <Message 
                                                token={this.state.token}
                                                messageContent={message.messageContent} 
                                                messageID={message.id} 
                                                userID={message.userID} 
                                                userName={userName}
                                                userColour={userColour} 
                                                dateTime={message.dateTime} 
                                                key={message.id}
                                            />
                                        );

                                    }

                                })
                            }
                        </div>
                        <MessageForm addMessage={this.addMessage}/>
                    </div>
                </div>
            );

        }else{

            return(
                <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            );

        }

    }
}

export default Messages;