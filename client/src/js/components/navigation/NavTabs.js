// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';

/*
* The purpose of this HomeNavTabs class is to provide a tabular menu that is available on the Home page.
* This tabbed menu provides access to the "Routes", "Carpools", and "Trips" tabs on the Home page.
*/
@observer export class HomeNavTabs extends Component {

    /*
    * The purpose of the handleRouteToggle method is to set the "Routes" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleRouteToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToRoute();
    }

    /*
    * The purpose of the handleCarPoolToggle method is to set the "Carpools" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleCarPoolToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToCarpool();
    }

    /*
    * The purpose of the handleTripToggle method is to set the "Trips" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleTripToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrip();
    }

    handleAddToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToAdd();
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements using JSX.
    */
    render() {
        return(
            <div className="fixed-top container-fluid height-50px bg-aqua">
                <div className="row font-20px height-100p">
                    <div className="col-12 pad-0">
                        <button 
                            className={"btnTab col-3 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.props.store.routeTabActive} 
                            onClick={this.handleRouteToggle}
                        >
                            Routes
                        </button>
                        <button 
                            className={"btnTab col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.props.store.carpoolTabActive} 
                            onClick={this.handleCarPoolToggle}
                        >
                            Carpools
                        </button>
                        <button 
                            className={"btnTab col-3 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.props.store.tripTabActive} 
                            onClick={this.handleTripToggle}
                        >
                            Trips
                        </button>
                        <button 
                            className={"btnTab col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.props.store.addTabActive} 
                            onClick={this.handleAddToggle}
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

/*
* The purpose of this ProfileNavTabs class is to provide a tabular menu that is available on the Profile page.
* This tabbed menu provides access to the "Vouches" and "Trust" tabs on the Profile Page.
*/
@observer export class ProfileNavTabs extends Component{

    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. In this case
    * the vouchTabActive field is set to true because the "Vouches" tab is active when the Profile page is first
    * loaded.
    */
    constructor(){
        super()

        this.state = {
            //vouchTabActive represents the status of the "Vouches" tab.
            vouchTabActive: "active",
            //trustTabActive represents the status of the "Trust" tab.
            trustTabActive: ""   
        }
    }

    /*
    * The purpose of the handleVouchToggle method is to set the "Vouches" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleVouchToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToVouch();
        this.setState({
            vouchTabActive: "active",
            trustTabActive: ""
        });
    }

    /*
    * The purpose of the handleTrustToggle method is to set the "Trust" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleTrustToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrust();
        this.setState({
            vouchTabActive: "",
            trustTabActive: "active"
        });
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render(){
        return(
            <div className="container-fluid height-50px bg-aqua">
                <div className="row font-20px height-100p">
                    <button 
                        className={"btnTabWhiteActive col-6 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.vouchTabActive} 
                        onClick={this.handleVouchToggle}
                    >
                        Vouches
                    </button>
                    <button 
                        className={"btnTabWhiteActive col-6 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.trustTabActive} 
                        onClick={this.handleTrustToggle}
                    >
                        Trust
                    </button>
                </div>
            </div>
        )
    }
}

/*
* The purpose of this SettingsNavTabs class is to provide a tabular menu that is available on the Settings page.
* This tabbed menu provides access to the "Profiles" and "Alerts" tabs on the Settings page.
*/
@observer export class SettingsNavTabs extends Component {
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