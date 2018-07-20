import React, { Component } from 'react';
import { observer } from "mobx-react";

import { getFromStorage } from './../../utils/localStorage.js';
import Navbar from './../navbar/Navbar';
import NavTabs from './NavTabs';
import ProfileSettings from './ProfileSettingsPage/ProfileSettings';
import AlertsSettings from './AlertsSettingsPage/AlertsSettings';

@observer class SettingsPage extends Component{

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

    setTab = () => {
        const { store } = this.props;

        if(!this.state.loading)
        {
            if(store.profileTab === true)
            {
                return <ProfileSettings/>;            
            }
            else if(store.alertsTab === true)
            {
                return <AlertsSettings/>;
            }
        }

    }

    render(){
        const { token } = this.props.store;
        
        return(
            <div className="size-100 bg-purple">
                    <NavTabs store={this.props.store} token={token}/>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        {this.setTab()}
                    </div>
                    <Navbar token={token}/>
            </div>
        );
    }
}

export default SettingsPage;