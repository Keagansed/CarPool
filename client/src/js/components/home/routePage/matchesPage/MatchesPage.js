import React, { Component } from 'react';
import { observer } from "mobx-react";

import { getFromStorage } from './../../../../utils/localStorage.js';
import Navbar from './../../../navbar/Navbar';
import Matches from './Matches';

@observer class MatchesPage extends Component{

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
                        <div className="row font-20px height-100p">
                            <div className="col-10">
                                <button className="btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                    Home to Work
                                </button>
                            </div>
                            <button className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center">
                                <i class="fa fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        <Matches />
                    </div>
                    <Navbar token={token}/>
            </div>
        );
    }
}

export default MatchesPage;