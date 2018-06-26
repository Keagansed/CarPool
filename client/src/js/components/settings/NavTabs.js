import { observer } from 'mobx-react';
import React, { Component } from 'react';

@observer class NavTabs extends Component{

    constructor(){
        super()

        this.state = {
            profileTab: "active",
            alertsTab: "",    
        }
    }

    handleProfileToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToProfile();
        this.setState({
            profileTab: "active",
            alertsTab: "", 
        })
    }

    handleAlertsToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToAlerts();
        this.setState({
            profileTab: "",
            alertsTab: "active", 
        })
    }

    render(){
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