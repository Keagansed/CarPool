// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';

/*
* The purpose of this NavTabs class is to provide a tabular menu that is available on the Profile page.
* This tabbed menu provides access to the "Vouches" and "Trust" tabs on the Profile Page.
*/
@observer class NavTabs extends Component{

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

export default NavTabs;