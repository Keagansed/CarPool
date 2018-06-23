import React, { Component } from 'react';

import 'firebase/database';
import app from '../../../stores/MessagingStore'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "../../../../css/components/Spinner.css"


import {
    getFromStorage
} from '../../../utils/localStorage.js'

class Carpools extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupChatID: '',
            groupChatName: '',
            user1: '',
            user2: '',
            user3: '',
            groupChats:[],
            loading: true,
        };

        this.addChat = this.addChat.bind(this);

        this.groupChats = app.database().ref().child('groupChats');
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
        let users = {[this.state.user1]:{lastRefresh:JSON.stringify(new Date()),colour:"txt-lime"},
            [this.state.user2]:{lastRefresh:JSON.stringify(new Date()),colour:"txt-lightBlue"},
            [this.state.user3]:{lastRefresh:JSON.stringify(new Date()),colour:"txt-orange"}};
        this.groupChats.push().set({name: name, users: users});
    }

    render() {

        if(this.state.loading)
        {
            return(
                <div>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
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
            )
        }

        return (
            <div>
                <div className="container-fluid bg-purple">
                    {
                        this.state.groupChats.map((groupChat) => {
                            let verifyUser = false;
                            for (let user in this.state.groupChats[groupChat.id].users)
                            {
                                if(user === getFromStorage('sessionKey').token)
                                    verifyUser = true;
                            }
                            if(verifyUser) {
                                let usersArray = [];
                                let users = app.database().ref().child('groupChats/'+groupChat.id+"/users");
                                users.on('child_added', snap =>{
                                    usersArray[snap.key] = snap.val();
                                });

                                let messagesArray = [];
                                let messages = app.database().ref().child('groupChats/'+groupChat.id+"/messages");
                                messages.on('child_added', snap =>{
                                    messagesArray[snap.key] = snap.val();
                                });

                                let newMessageCount = 0;
                                for (let message in messagesArray)
                                {
                                    {/*window.alert(messagesArray[message].userID);*/}
                                    let lastRefresh = JSON.parse(usersArray[getFromStorage('sessionKey').token].lastRefresh);
                                    let messageDate = JSON.parse(messagesArray[message].dateTime);
                                    if(messageDate > lastRefresh)
                                        newMessageCount++;
                                }
                                let messageString = "Messages";
                                if(newMessageCount === 1)
                                    messageString = "Message";
                                return (
                                    <div key={Math.random()}>
                                        <Link to={`/HomePage/Chat/`+groupChat.id+'/'+this.state.groupChats[groupChat.id].name}>
                                            <div className="row txt-white padver-10px bordbot-2px-white">
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
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    }

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

export default Carpools;