// File Type: Component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import MessageIcon from '@material-ui/icons/Chat';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Inbox';

import app from '../../stores/FirebaseStore.js';
import CarpoolOffers from './CarpoolOffers';
import { getFromStorage } from '../../utils/localStorage.js';
import MessageStore from '../../stores/MessagingStore.js';
import VerifyWrapper from '../../containers/VerifyWrapper';

import 'firebase/database';
import "../../../css/components/Spinner.css";

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
 * Purpose: a chat interface for the users in the same carpool whereby users can arrange a trip
 * and then suggest that trip. 
 */
class Carpools extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'groupChats'
     * is an array that contains all the group chats in firebase. 'loading' is a boolean which
     * represents whether the carpools are loading or not. 'offers' is all the offers that a user has.
     */
    constructor(props) {
        super(props);
        this.state = {
            groupChats: [],
            loading: true,
            offers: [],
        };

        this.groupChats = app.database().ref().child('groupChats');
        this.groupChatID = "";
    }

    /*
     * Purpose: sets the state of the 'offers' field and fetches other necessary data
     */
    componentDidMount() {
        this.setState({ offers: <CarpoolOffers store={this.props.store} token={this.props.token} /> });

        if (MessageStore.allUsers.length === 0) {
            MessageStore.getAllUsers(this.props.token);
        }

        const previousChats = this.state.groupChats;
        let previousChatsData = [];

        this.groupChats.on('child_added', snap => {
            previousChats.push({
                id: snap.key,
            });

            let groupChatsData = app.database().ref().child('groupChats/' + snap.key);

            groupChatsData.on('child_added', snapData => {
                previousChatsData[snapData.key] = snapData.val();
            });

            previousChats[snap.key] = previousChatsData;

            previousChatsData = [];

            this.setState({
                groupChats: previousChats
            });

            this.setState({
                loading: false,
            })
        });
    }

    //Switch off event listeners for firebase
    componentWillUnmount() {
        this.groupChats.off();
    }

    /*
* Purpose: displays a spinner while the carpools are loading.
*/
    renderLoading = () => {

        return (
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        )
    }

    /*
     * Purpose: renders the component in the DOM which shows the carpool offers and current carpools that
     * the user is apart of. Also shows if there are any new messages in any carpools that the user is in.
     */
    render() {
        if (this.state.loading) {
            return (
                <div className="scroll-vert">
                    {this.renderLoading()}
                </div>
            );
        }

        let verifyUser = false;
        let showNoCarpools = true;
        const { classes } = this.props;

        return (
            <List component="nav" className={classes.root}>
                <ListSubheader>{`Carpool Offers`}</ListSubheader>
                {this.state.offers}
                <ListSubheader>{`Joined Carpools`}</ListSubheader>
                {   //joined Carpools if there are any
                    this.state.groupChats.map((groupChat) => {
                        try {
                            for (let user in this.state.groupChats[groupChat.id].users) {
                                if (user === getFromStorage('sessionKey').token) {
                                    verifyUser = true;
                                }
                            }

                            if (verifyUser) {
                                let usersArray = [];
                                let users = app.database().ref().child('groupChats/' + groupChat.id + "/users");
                                users.on('child_added', snap => {
                                    usersArray[snap.key] = snap.val();
                                });
                                let messagesArray = [];
                                let messages = app.database().ref().child('groupChats/' + groupChat.id + "/messages");
                                messages.on('child_added', snap => {
                                    messagesArray[snap.key] = snap.val();
                                });
                                let newMessageCount = 0;
                                for (let message in messagesArray) {
                                    let lastRefresh = JSON.parse(usersArray[getFromStorage('sessionKey').token].lastRefresh);
                                    let messageDate = JSON.parse(messagesArray[message].dateTime);
                                    if (messageDate > lastRefresh) {
                                        newMessageCount++;
                                    }
                                }
                                //Number of new messages text
                                let messageString = "Messages";
                                if (newMessageCount === 1) {
                                    messageString = "Message";
                                }

                                verifyUser = false;
                                showNoCarpools = false;
                                return (
                                    <Link
                                        key={Math.random()}
                                        to={`/HomePage/Chat/` + groupChat.id + '/' + this.state.groupChats[groupChat.id].name}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <ListItem button divider>
                                            <Avatar>
                                                <GroupIcon />
                                            </Avatar>
                                            <ListItemText primary={this.state.groupChats[groupChat.id].name} secondary={newMessageCount + ' New ' + messageString} />
                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="Open Chat">
                                                    <MessageIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Link>
                                )
                            } else {
                                verifyUser = false;
                                return (<div key={Math.random()}></div>);
                            }
                        } catch (e) {
                            verifyUser = false;
                            return (<div key={Math.random()}></div>)
                        }
                    })
                }
                {
                    <div style={showNoCarpools ? display : hide}>
                        <ListItem divider>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                            <ListItemText primary="No carpools to display" secondary="View your routes to join a carpool" />
                        </ListItem>
                    </div>

                }
            </List>
        );
    }
}

Carpools.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyWrapper(Carpools));