import React, { Component } from 'react';

import { DB_CONFIG } from '../config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import '../../css/components/Message.css'

import {
    getFromStorage
} from '../utils/localStorage.js'

class MessageGroups extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupChatID: '',
            groupChatName: '',
            user1: '',
            user2: '',
            user3: '',
            groupChats:[
            ],
        };

        this.addChat = this.addChat.bind(this);

        // this.app = firebase.initializeApp(DB_CONFIG);
        // this.groupChats = this.app.database().ref().child('groupChats');
        // this.users = this.app.database().ref().child('groupChats/'+this.props.match.params.chat+"/users");
    }

    componentWillMount(){
        const previousChats = this.state.groupChats;
        let previousChatsData = [];
        this.groupChats.on('child_added', snap =>{
            previousChats.push({
                id: snap.key,
            });

            let groupChatsData = this.app.database().ref().child('groupChats/'+snap.key);

            groupChatsData.on('child_added', snapData =>{
                previousChatsData[snapData.key] = snapData.val();
            });

            previousChats[snap.key] = previousChatsData;

            previousChatsData = [];

            this.setState({
                groupChats: previousChats
            });
        })
    }

    handleNameChange(e){
        this.setState({groupChatName: e.target.value})
    }

    handle1Change(e){
        this.setState({user1: e.target.value})
    }

    handle2Change(e){
        this.setState({user2: e.target.value})
    }

    handle3Change(e){
        this.setState({user3: e.target.value})
    }

    addChat()
    {
        let name = this.state.groupChatName;
        let userIDs = {user1:this.state.user1,user2:this.state.user2,user3:this.state.user3};
        this.groupChats.push().set({name: name, users: userIDs});
    }

    render() {

        return (
            <div>
                <div className="messagesWrapper">
                    <div className="messagesHeader">
                        <div className="heading">Group messaging</div>
                    </div>
                    <div className="messagesBody">
                        {
                            this.state.groupChats.map((groupChat) => {
                                if(this.state.groupChats[groupChat.id].users.user1 === getFromStorage('sessionKey').token ||
                                    this.state.groupChats[groupChat.id].users.user2 === getFromStorage('sessionKey').token ||
                                    this.state.groupChats[groupChat.id].users.user3 === getFromStorage('sessionKey').token) {
                                    return (
                                        <div className="chatList" key={Math.random()}>
                                            <a href={"/Messaging/" + groupChat.id}>{this.state.groupChats[groupChat.id].name}</a>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <button id="addGroup" className="btn btn-primary margin-top" type="submit" data-toggle="modal" data-target="#groupChatModal">Create new group</button>

                <div className="modal fade" id="groupChatModal">
                    <div className="modal-dialog">
                        <div className="modal-content bubble-more-visible">
                            <form id="vouchSubmit">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" onChange={this.handleNameChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user1">User</label>
                                    <input type="text" className="form-control" id="user1" onChange={this.handle1Change.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user2">User</label>
                                    <input type="text" className="form-control" id="user2" onChange={this.handle2Change.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user3">User</label>
                                    <input type="text" className="form-control" id="user3" onChange={this.handle3Change.bind(this)} />
                                </div>
                                <button className="btn btn-secondary" onClick={this.addChat} >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MessageGroups;
