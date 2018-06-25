import { observer } from 'mobx-react';
import React, { Component } from 'react';

@observer class NavTabs extends Component{

    constructor(){
        super()

        this.state = {
            profileTab: "active",
            trustTab: "",
            alertsTab: "",    
        }
    }

    handleProfileToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToProfile();
        this.setState({
            profileTab: "active",
            trustTab: "",
            alertsTab: "", 
        })
    }

    handleTrustToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrust();
        this.setState({
            profileTab: "",
            trustTab: "active",
            alertsTab: "", 
        })
    }

    handleAlertsToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToAlerts();
        this.setState({
            profileTab: "",
            trustTab: "",
            alertsTab: "active", 
        })
    }

    render(){
        return(
            <div className="fixed-top container-fluid height-50px bg-aqua">
                <div className="row font-20px height-100p">
                    <button className={"btnTabWhiteActive  col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.profileTab} onClick={this.handleProfileToggle}>
                        Profile
                    </button>
                    <button className={"btnTabWhiteActive  col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.trustTab} onClick={this.handleTrustToggle}>
                        Trust
                    </button>
                    <button className={"btnTabWhiteActive  col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.alertsTab} onClick={this.handleAlertsToggle}>
                        Alerts
                    </button>
                </div>
            </div>
        )
    }
}

export default NavTabs;