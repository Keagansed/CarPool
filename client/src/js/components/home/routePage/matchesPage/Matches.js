import React, { Component } from 'react';
import { observer } from "mobx-react";

import { getFromStorage } from './../../../../utils/localStorage.js';
import Navbar from './../../../navbar/Navbar';
import Match from './Match';

@observer class Matches extends Component{

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
        const { token } = this.props.store;
        
        return(
            <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row height-100p">
                            <div className="col-12 txt-center fw-bold font-20px my-auto">
                                Route Matches
                            </div>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                    {/* dummy static matches */}
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                    </div>
                    <Navbar token={token}/>
            </div>
        );
    }
}

export default Matches;