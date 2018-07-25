import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CarpoolOffers from './CarpoolOffers';
import 'firebase/database';
import app from '../../stores/MessagingStore'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "../../../css/components/Spinner.css"
import {
    getFromStorage
} from '../../utils/localStorage'

class Carpools extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupChats:[],
            loading: true,
            offers:[],
        };

        this.groupChats = app.database().ref().child('groupChats');
        this.groupChatID = "";
    }
    
    componentDidMount(){
        this.setState({offers:<CarpoolOffers store={this.props.store} token={this.props.token}/>});
    }

    componentWillMount(){
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

    render() {

        if(this.state.loading)
        {
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
        return (
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
                                for (let user in this.state.groupChats[groupChat.id].users) {
                                    if (user === getFromStorage('sessionKey').token)
                                        verifyUser = true;
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
                                        if (messageDate > lastRefresh)
                                            newMessageCount++;
                                    }
                                    let messageString = "Messages";
                                    if (newMessageCount === 1)
                                        messageString = "Message";
                                    return (
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
                                }
                                else {
                                    return (<div key={Math.random()}></div>);
                                }
                            }
                            catch (e){
                                return (<div key={Math.random()}></div>)
                            }
                        })
                    }

                </div>
            </div>

        );
    }
}

export default Carpools;