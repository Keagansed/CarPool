// File Type: Component

import { observer } from 'mobx-react';
import React, { Component } from 'react';

/*
* The purpose of this NavTabs class is to provide a tabular menu that is available on the Settings page.
* This tabbed menu provides access to the "Profiles" and "Alerts" tabs on the Settings page.
*/
@observer class NavTabs extends Component {
    constructor() {
        super()

        this.state = {
            profileTab: "active",
            alertsTab: "",    
        }
    }

    /*
    * The purpose of the handleRouteToggle method is to set the "Profile" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleProfileToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToProfile();

        this.setState({
            profileTab: "active",
            alertsTab: "", 
        })
    }

    /*
    * The purpose of the handleRouteToggle method is to set the "Alerts" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleAlertsToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToAlerts();
        
        this.setState({
            profileTab: "",
            alertsTab: "active", 
        })
    }

    render() {
        return(
            <div className="fixed-top container-fluid height-50px bg-aqua">
                <div className="row font-20px height-100p">
                    <button className={"btnTab  col-6 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.profileTab} onClick={this.handleProfileToggle}>
                        Profile
                    </button>
                    <button className={"btnTab  col-6 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.alertsTab} onClick={this.handleAlertsToggle}>
                        Alerts
                    </button>
                </div>
            </div>
        )
    }
}

export default NavTabs;