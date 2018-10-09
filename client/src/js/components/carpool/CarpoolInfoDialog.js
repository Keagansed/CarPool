// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContentText from '@material-ui/core/DialogContentText';

import app from '../../stores/FirebaseStore.js';
import MessageStore from '../../stores/MessagingStore.js';
import { getFromStorage } from '../../utils/localStorage.js';
import ServerURL from '../../utils/server';

/*
 * Purpose: modal component that provides an interface for a user to suggest a new trip for the carpool members
 */
@observer class NewTripDialog extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' is the visibility of the modal.
     * 'user' contains all the users.
     */
    constructor(props) {
        super(props);
        this.users = app.database().ref().child('groupChats/'+this.props.carpoolID+"/users");
        console.log('TCL: NewTripDialog -> constructor -> this.users', this.users);

        this.state = {
            tripDialog: false,
            groupChatUsers:{},
            redirect: false,
        };
    }

    //Open/close trip dialog
    openTripDialog = () => {
        this.setState({ tripDialog: true });
    };
    closeTripDialog = () => {
        this.setState({ tripDialog: false });
    };

    componentWillMount(){
        const previousUsers = this.state.groupChatUsers;

        this.users.on('child_added', snap =>{
            previousUsers[snap.key] = snap.val();
            this.setState({
                groupChatUsers: previousUsers
            });
        });

    }

    /*
     * Purpose: removes the user from the carpool and returns them to the homepage
     * It is called when the leave carpool button is clicked
     */
    leaveCarpool = () => {
        let tempUsers = {};
        for (let user in this.state.groupChatUsers) {
            if (user !== getFromStorage('sessionKey').token) {
                tempUsers[user] = this.state.groupChatUsers[user];
            }
        }

        this.setState({
            groupChatUsers: tempUsers
        }, async () => {

            let numChildren = 0;

            this.users.once("value")
            .then(snap => {
                numChildren = snap.numChildren();
                console.log('TCL: NewTripDialog -> leaveCarpool -> numChildren', numChildren);

                if(numChildren <= 2) {                
                    app.database().ref().child('groupChats/' + this.props.carpoolID)
                    .remove()
                    .then(() => {
                        console.log("Deleted carpool in firebase");
                        this.setState({
                            redirect: true
                        });
                        return {};
                    })
                    .catch(error => {
                        console.error("Deletion failed: ", error);
                    })
                } else {
                    app.database().ref().child('groupChats/' + this.props.carpoolID)
                    .update({users: this.state.groupChatUsers})
                    .then(() => {
                        this.setState({
                            redirect: true
                        });
                        return {};
                    })
                    .catch(error => {
                        return {
                            errorCode: error.code,
                            errorMessage: error.message
                        }
                    });
                }
            })
                
                        
        });

        fetch(ServerURL + '/api/system/carpool/leaveCarpool?_id=' + this.props.mongoCarpoolID + '&token=' + getFromStorage('sessionKey').token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json) {
                if(json.success) {

                }else{
                    alert(json.message);
                }
            }
        })
    }

    /*
     * Purpose: causes page to be redirected to homepage when the state variable redirect is true
     * It is called when the user clicks yes after clicking the leave caprool button
     */
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/HomePage' />
        }
    };

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        let users = [];

        for(let user in this.props.users) {
            users.push(
                <Link to={"/ProfilePage/" + user} style={{ textDecoration: 'none', color: 'inherit' }} key={Math.random()}>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} divider>
                        <ListItemText primary={MessageStore.getUsername(user)} secondary='Click to View Profile' />
                    </ListItem>
                </Link>
            );
        }

        return (
            <div  style={{flexGrow: 1}}>
                {this.renderRedirect()}
                <Typography variant="title" color="inherit" onClick={this.openTripDialog}>
                    {this.props.carpoolName}
                </Typography>
                <Dialog open={this.state.tripDialog} onClose={this.closeTripDialog} scroll='paper'>
                    <DialogTitle>{this.props.carpoolName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText variant='subheading'>
                            Members
                        </DialogContentText>
                        {users}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.leaveCarpool} color="primary">
                            Leave Carpool
                        </Button>
                        <Button onClick={this.closeTripDialog} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default NewTripDialog;