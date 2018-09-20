// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import AlertsSettings from './AlertsSettings';
import Navbar from '../components/navigation/Navbar';
import ProfileSettings from '../components/settings/ProfileSettings';
import { SettingsNavTabs } from '../components/navigation/NavTabs';

import { getFromStorage } from '../utils/localStorage.js';
import ServerURL from '../utils/server';

/*
* Purpose: Container page for all the settings components
*/
@observer class SettingsPage extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
        }
    }

    /*
    * Purpose: Verifies the users token before component mounting to make sure the user is authorised
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');

        if(obj && obj.token) {
            const { token } = obj;
            fetch(ServerURL + '/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }  
    }

    /*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
    setTab = () => {
        const { store } = this.props;

        if(!this.state.loading) {
            if(store.profileTab === true) {
                return <ProfileSettings/>;            
            }
            else if(store.alertsTab === true) {
                return <AlertsSettings/>;
            }
        }
    }

    render() {
        const { token } = this.props.store;
        
        return(
            <div className="size-100 bg-purple">
                <SettingsNavTabs store={this.props.store} token={token}/>
                <div className="padtop-50px padbot-50px">
                    {this.setTab()}
                </div>
                <Navbar token={token}/>
            </div>
        );
    }
}

export default SettingsPage;