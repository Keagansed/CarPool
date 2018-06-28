import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import app from '../../../../stores/MessagingStore'

import { getFromStorage } from './../../../../utils/localStorage.js';
import Messages from './Messages';
import CarpoolInfoModal from './carpoolInfoModal/CarpoolInfoModal';

@observer class ChatPage extends Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    //========= Fetch Session Token ===========
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }
    }

    updateLastRefresh(id){
        app.database().ref().child('groupChats/'+id+"/users/"+getFromStorage('sessionKey').token)
            .update({lastRefresh:JSON.stringify(new Date())}).then(() => {
            return {};
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
        return false;
    }

    render(){
        return(
            <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row font-20px height-100p">
                            <Link to={`/HomePage`} className="col-2 txt-center">
                                <button className="btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={() =>this.updateLastRefresh(this.props.match.params.carpoolID)}>
                                    <i className="fa fa-chevron-circle-left"></i>
                                </button>
                            </Link>
                            <CarpoolInfoModal />
                            <button data-toggle="modal" data-target="#newTripModal"  className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center">
                                <i className="fa fa-car"></i>
                            </button>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        <Messages carpoolID={this.props.match.params.carpoolID} carpoolName={this.props.match.params.carpoolName}/>
                    </div>
            </div>
        );
    }
}

export default ChatPage;