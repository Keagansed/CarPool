// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import app from '../../stores/MessagingStore'
import CarpoolOffers from './CarpoolOffers';
import { getFromStorage } from '../../utils/localStorage'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'firebase/database';
import "../../../css/components/Spinner.css"

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
            groupChats:[],
            loading: true,
            offers:[],
        };

        this.groupChats = app.database().ref().child('groupChats');
        this.groupChatID = "";
    }
    
    /*
     * Purpose: sets the state of the 'offers' field.
     */
    componentDidMount() {
        this.setState({offers:<CarpoolOffers store={this.props.store} token={this.props.token}/>});
    }

    /*
     * Purpose: acquires the data for the chat and changes loading state once acquired.
     */
    componentWillMount() {
        const previousChats = this.state.groupChats;
        let previousChatsData = [];

        this.groupChats.on('child_added', snap =>{
            previousChats.push({
                id: snap.key,
            });

            let groupChatsData = app.database().ref().child('groupChats/'+snap.key);

            groupChatsData.on('child_added', snapData =>{
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

    /*
     * Purpose: renders the component in the DOM which shows the carpool offers and current carpools that
     * the user is apart of. Also shows if there are any new messages in any carpools that the user is in.
     */
    render() {

        if(this.state.loading) {

            return(
                <div>
                    <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Carpool Offers</h4>
                    </div>
                    <h5 className="txt-center mtop-10px txt-white">
                        No Offers
                    </h5>
                    <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Your Carpools</h4>
                    </div>
                    <h5 className="txt-center mtop-10px txt-white">
                        No Carpools
                    </h5>
                </div>
            )

        }

        let verifyUser = false;

        return(
            <div>
                <div className="scroll-vert">
                    <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Carpool Offers</h4>
                    </div>
                    {this.state.offers}
                    <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Your Carpools</h4>
                    </div>
                    {
                        this.state.groupChats.map((groupChat) => {
                            
                            try{

                                for(let user in this.state.groupChats[groupChat.id].users) {

                                    if(user === getFromStorage('sessionKey').token) {
                                        verifyUser = true;
                                    }

                                }

                                if(verifyUser) {
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

                                    for(let message in messagesArray) {
                                        let lastRefresh = JSON.parse(usersArray[getFromStorage('sessionKey').token].lastRefresh);
                                        let messageDate = JSON.parse(messagesArray[message].dateTime);
                                        
                                        if(messageDate > lastRefresh) {
                                            newMessageCount++;
                                        }

                                    }

                                    let messageString = "Messages";

                                    if(newMessageCount === 1) {
                                        messageString = "Message";
                                    }

                                    verifyUser = false;

                                    return(
                                        <div key={Math.random()}>
                                            <Link
                                                to={`/HomePage/Chat/` + groupChat.id + '/' + this.state.groupChats[groupChat.id].name}>
                                                <div className="container-fluid bg-purple bordbot-2px-white">
                                                    <div className="row txt-white padver-10px">
                                                        <div className="col-9">
                                                            <div className="col-12">
                                                                <h5>{this.state.groupChats[groupChat.id].name}</h5>
                                                            </div>
                                                            <div className="col-12">
                                                                {newMessageCount} New {messageString}
                                                            </div>
                                                        </div>
                                                        <div className="col-3 vertical-right">
                                                            <div className="col-12">
                                                                <h5><i className="fa fa-chevron-circle-right"></i></h5>
                                                            </div>
                                                            <div className="col-12">
                                                                {/* Empty for now */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }else{
                                    verifyUser = false;

                                    return(<div key={Math.random()}></div>);

                                }
                            }catch(e) {
                                verifyUser = false;

                                return(<div key={Math.random()}></div>)
                                
                            }

                        })
                    }

                </div>
            </div>

        );
    }
}

export default Carpools;