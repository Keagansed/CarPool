// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';

/*
* The purpose of this NavTabs class is to provide a tabular menu that is available on the Home page.
* This tabbed menu provides access to the "Routes", "Carpools", and "Trips" tabs on the Home page.
*/
@observer class NavTabs extends Component {

    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. In this case
    * the routeTabActive field is set to true because the "Routes" tab is active when the Home page is first
    * loaded.
    */
    constructor() {
        super()

        this.state = {
            //routeTabActive represents the status of the "Routes" tab.
            routeTabActive: "active",
            //carpoolTabActive represents the status of the "Carpools" tab.
            carpoolTabActive: "",
            //tripTabActive represents the status of the "Trips" tab.
            tripTabActive: "", 
            //addTabActive represents the status of the "Add" tab. 
            addTabActive: "",  
        }
    }

    /*
    * The purpose of the handleRouteToggle method is to set the "Routes" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleRouteToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToRoute();
        this.setState({
            routeTabActive: "active",
            carpoolTabActive: "",
            tripTabActive: "", 
            addTabActive: "",
        });
    }

    /*
    * The purpose of the handleCarPoolToggle method is to set the "Carpools" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleCarPoolToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToCarpool();
        this.setState({
            routeTabActive: "",
            carpoolTabActive: "active",
            tripTabActive: "", 
            addTabActive: "",
        });
    }

    /*
    * The purpose of the handleTripToggle method is to set the "Trips" tab to active. The method
    * will also deactivate the other tabs.
    */
    handleTripToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrip();
        this.setState({
            routeTabActive: "",
            carpoolTabActive: "",
            tripTabActive: "active", 
            addTabActive: "",
        });
    }

    handleAddToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToAdd();
        this.setState({
            routeTabActive: "",
            carpoolTabActive: "",
            tripTabActive: "", 
            addTabActive: "active",
        });
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
                            className={"btnTab col-3 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.state.routeTabActive} 
                            onClick={this.handleRouteToggle}
                        >
                            Routes
                        </button>
                        <button 
                            className={"btnTab col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.state.carpoolTabActive} 
                            onClick={this.handleCarPoolToggle}
                        >
                            Carpools
                        </button>
                        <button 
                            className={"btnTab col-3 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.state.tripTabActive} 
                            onClick={this.handleTripToggle}
                        >
                            Trips
                        </button>
                        <button 
                            className={"btnTab col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px pad-0 " + this.state.addTabActive} 
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

export default NavTabs;