import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';

import { getFromStorage } from './../../../../utils/localStorage.js';
// import Messages from './Messages';
import Messaging from "../../../Messaging";
import CarpoolInfoModal from './carpoolInfoModal/CarpoolInfoModal';
import NewTripModal from './newTripModal/NewTripModal';

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

    render(){
        //const { token } = this.props.store;
        
        return(
            <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row font-20px height-100p">
                            <Link to={`/HomePage`} className="col-2 txt-center">
                                <button className="btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                    <i className="fa fa-chevron-circle-left"></i>
                                </button>
                            </Link>
                            <button data-toggle="modal" data-target="#carpoolInfoModal" className="col-8 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                Brogrammers Carpool
                            </button>
                            <button data-toggle="modal" data-target="#newTripModal"  className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center">
                                <i className="fa fa-car"></i>
                            </button>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        {/*<Messages/>*/}
                        <Messaging chat="-LDrNCGXxrzxuekBMveA"/>

                    </div>
                    {/*<div className="fixed-bottom container-fluid height-50px">*/}
                        {/*<div className="row height-100p txt-purple font-20px fw-bold">*/}
                            {/*<input type="text" className="col-10 bord-0 focusbord-1px-purple"/>*/}
                            {/*<button className="col-2 btn height-100p bg-white txt-purple fw-bold brad-0 font-20px txt-center">*/}
                                {/*<i className="fa fa-arrow-circle-right"></i>*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <CarpoolInfoModal />
                    <NewTripModal />
            </div>
        );
    }
}

export default ChatPage;