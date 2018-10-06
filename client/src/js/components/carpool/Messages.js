//File Type: Component

import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import app from '../../stores/FirebaseStore.js';
import MessageStore from '../../stores/MessagingStore.js';
import TripSuggest from './TripSuggest';
import Message from './Message';
import MessageForm from './MessageForm';
import { getFromStorage } from '../../utils/localStorage.js';
import NewTripDialog from './NewTripDialog';
import CarpoolInfoDialog from './CarpoolInfoDialog';

import "../../../css/components/Spinner.css"

//Styling specific to this page
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    topNav: {
        position: 'fixed',
        top: 0,
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
});

/*
 * Purpose: container for the messages that are sent within a carpool chat
 */
@observer class Messages extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'carpoolID' contains the 
     * ID of the carpool chat. 'messages' contains all the messages that were/are sent in the chat. 'users' contains
     * the users that are in the carpool.
     */
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            carpoolID: "",
            messages: [],
            users: [],
            userList: [],
            infoDialog: false,
        };

        MessageStore.getAllUsers(getFromStorage('sessionKey').token);
        this.addMessage = this.addMessage.bind(this);
        this.suggestTrip = this.suggestTrip.bind(this);
        this.updateLastRefresh = this.updateLastRefresh.bind(this);
        this.database = app.database().ref().child('groupChats/' + this.props.match.params.carpoolID);
        this.messages = app.database().ref().child('groupChats/' + this.props.match.params.carpoolID + "/messages");
        this.users = app.database().ref().child('groupChats/' + this.props.match.params.carpoolID + "/users");
    }

    //Open/close info dialog
    openInfoDialog = () => {
        this.setState({ infoDialog: true });
    };
    closeInfoDialog = () => {
        this.setState({ infoDialog: false });
    };

    /*
     * Purpose: adds all messages to previous messages, sets 'carpoolID' and updates users.
     */
    componentWillMount() {
        let token = getFromStorage('sessionKey').token;

        this.setState({
            token,
        });
    }

    componentDidMount() {
        const previousUsers = this.state.users;
        let previousMessages = this.state.messages;

        this.messages.on('child_added', snap => {
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

        this.database.on('child_added', snap => {
            if (snap.key === "carpoolID") {
                this.setState({
                    carpoolID: snap.val()
                });
            }
        });

        this.users.on('child_added', snap => {
            previousUsers[snap.key] = snap.val();
            this.setState({
                users: previousUsers
            });

        });

        const date = JSON.stringify(new Date());
        app.database().ref().child('groupChats/' + this.props.match.params.carpoolID + "/users/" + this.state.token)
            .update({ lastRefresh: date }).then(() => {
                return {};
            }).catch(error => {

                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }

            });

    }

    //Switch off event listeners for firebase
    componentWillUnmount() {
        this.database.off();
        this.messages.off();
        this.users.off();
    }
    /*
     * Purpose: adds a new message to the current messages
     */
    addMessage(message, userID) {
        this.messages.push().set({
            userID: userID,
            messageContent: message,
            dateTime: JSON.stringify(new Date()),
            tripSuggest: false
        });
    }

    /*
     * Purpose:  adds a trip suggestion to the messages
     */
    suggestTrip(message, userID, users, tripID) {
        this.messages.push().set({
            userID: userID,
            messageContent: message,
            dateTime: JSON.stringify(new Date()),
            tripSuggest: true,
            users,
            tripID: tripID,
            usersResponded: { [getFromStorage('sessionKey').token]: true }
        });
    }

    /*
     * Purpose: updates the last refresh which is used to be able to determine if a message is new.
     */
    updateLastRefresh() {
        let date = JSON.stringify(new Date());
        app.database().ref().child('groupChats/' + this.props.match.params.carpoolID + "/users/" + this.state.token)
            .update({ lastRefresh: date }).then(() => {
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
        const { classes } = this.props;

        for (let user in this.state.users) {

            if (user === this.state.token) {
                verify = true;
            }

        }

        if (this.state.loading) {

            return (
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

        if (verify) {
            return (
                <div className={classes.root}>
                    {/* App Bar */}
                    <AppBar className={classes.topNav}>
                        <Toolbar className={classes.toolbar} variant='dense'>
                            <Link to={`/HomePage`} style={{ textDecoration: 'none', color: 'white' }}>
                                <IconButton color="inherit" aria-label="Back">
                                    <BackIcon />
                                </IconButton>
                            </Link>
                            <CarpoolInfoDialog
                                token={this.state.token}
                                users={this.state.users}
                                carpoolName={this.props.match.params.carpoolName}
                                carpoolID={this.props.match.params.carpoolID}
                                mongoCarpoolID={this.state.carpoolID}
                            />
                            <NewTripDialog
                                token={this.state.token}
                                users={this.state.users}
                                carpoolName={this.props.match.params.carpoolName}
                                carpoolID={this.props.match.params.carpoolID}
                                mongoCarpoolID={this.state.carpoolID}
                            />
                        </Toolbar>
                    </AppBar>
                    <List style={{paddingTop: 48, paddingBottom: 33}}>
                        {//Messages and trip suggestions
                            this.state.messages.map((message) => {
                                let userColour;
                                let userName = MessageStore.getUsername(message.userID);
                                try {
                                    userColour = this.state.users[message.userID].colour;
                                } catch (e) {
                                    userColour = "black";
                                }

                                if (message.tripSuggest) {
                                    return (
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
                                } else {
                                    if (message.userID === "Server") {
                                        return (
                                            <Message
                                                token={this.state.token}
                                                messageContent={message.messageContent}
                                                messageID={message.id}
                                                userID={message.userID}
                                                userName={"Server"}
                                                userColour={userColour}
                                                dateTime={message.dateTime}
                                                key={message.id}
                                            />
                                        );
                                    } else {
                                        return (
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
                                }
                            })
                        }
                    </List>
                    {/* Input message */}
                    <MessageForm addMessage={this.addMessage} />
                </div>

                // <div className="size-100 bg-purple">
                //     <div className="fixed-top container-fluid height-50px bg-aqua">
                //         <div className="row height-100p">
                //             <Link to={`/HomePage`} className="col-2 txt-center">
                //                 <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.updateLastRefresh}>
                //                     <i className="fa fa-chevron-circle-left txt-center"></i>
                //                 </button>
                //             </Link>
                //             <CarpoolInfoModal 
                //                 token={this.state.token}
                //                 users={this.state.users} 
                //                 carpoolName={this.props.match.params.carpoolName} 
                //                 carpoolID={this.props.match.params.carpoolID}
                //                 mongoCarpoolID={this.state.carpoolID}
                //             />
                //             <NewTripModal 
                //                 token={this.state.token}
                //                 users={this.state.users} 
                //                 suggestTrip={this.suggestTrip} 
                //                 carpoolID={this.state.carpoolID}  
                //                 carpoolName={this.props.match.params.carpoolName}
                //             />
                //         </div>
                //     </div>
                //     {/* Padding is there for top and bottom navs*/}
                //     <div className="padtop-50px padbot-50px">
                //         {/*<Messages carpoolID={this.props.match.params.carpoolID} carpoolName={this.props.match.params.carpoolName}/>*/}
                //         <div id="messageBody" className="autoScroll padtop-50px padbot-50px">
                //             {
                //                 this.state.messages.map((message) => {
                //                     let userColour;
                //                     let userName = MessageStore.getUsername(message.userID);

                //                     try{
                //                         userColour = this.state.users[message.userID].colour;
                //                     }catch(e) {
                //                         userColour = "black";
                //                     }

                //                     if(message.tripSuggest) {

                //                         return(
                //                             <TripSuggest
                //                                 token={this.state.token}
                //                                 messageContent={message.messageContent} 
                //                                 messageID={message.id} 
                //                                 users={message.users} 
                //                                 carpoolID={this.props.match.params.carpoolID} 
                //                                 tripID={message.tripID} 
                //                                 usersResponded={message.usersResponded} 
                //                                 userID={message.userID} 
                //                                 userColour={userColour} 
                //                                 dateTime={message.dateTime} 
                //                                 key={message.id}
                //                             />
                //                         );

                //                     }else{

                //                         if (message.userID === "Server"){
                //                             return(
                //                                 <Message
                //                                     token={this.state.token}
                //                                     messageContent={message.messageContent}
                //                                     messageID={message.id}
                //                                     userID={message.userID}
                //                                     userName={"Server"}
                //                                     userColour={userColour}
                //                                     dateTime={message.dateTime}
                //                                     key={message.id}
                //                                 />
                //                             );
                //                         } else {
                //                             return(
                //                                 <Message
                //                                     token={this.state.token}
                //                                     messageContent={message.messageContent}
                //                                     messageID={message.id}
                //                                     userID={message.userID}
                //                                     userName={userName}
                //                                     userColour={userColour}
                //                                     dateTime={message.dateTime}
                //                                     key={message.id}
                //                                 />
                //                             );
                //                         }



                //                     }

                //                 })
                //             }
                //         </div>
                //         <MessageForm addMessage={this.addMessage}/>
                //     </div>
                // </div>
            );

        } else {

            return (
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

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Messages);