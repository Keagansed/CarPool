import { observer } from "mobx-react";
import React, { Component } from 'react';

@observer class ProfileTabs extends Component {
    constructor(){
        super()

        this.state = {
            tripsTabActive: "active",
            vouchesTabActive: "",
            detailsTabActive: "",
        }
    }

    handleTripsToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrips();
        this.setState({
            tripsTabActive: "active",
            vouchesTabActive: "",
            detailsTabActive: "", 
        })
    }

    handleVouchesToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToVouches();
        this.setState({
            tripsTabActive: "",
            vouchesTabActive: "active",
            detailsTabActive: "", 
        })
    }

    handleDetailsToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToDetails();
        this.setState({
            tripsTabActive: "",
            vouchesTabActive: "",
            detailsTabActive: "active", 
        })
    }

    render(){
        return(

            <ul className="nav nav-tabs bg-primary fixed">
                <li className="nav-item w-3rd bg-info text-center px-0">
                    <a className={"nav-link bg-info color-secondary " + this.state.tripsTabActive} onClick={this.handleTripsToggle} href="">
                        <b>
                            <b>Trips</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-3rd text-center bg-info">
                    <a className={"nav-link bg-info color-secondary " + this.state.vouchesTabActive} onClick={this.handleVouchesToggle} href="">
                        <b>
                            <b>Vouches</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-3rd text-center bg-info">
                    <a className={"nav-link bg-info color-secondary " + this.state.detailsTabActive} onClick={this.handleDetailsToggle} href="">
                        <b>
                            <b>Details</b>
                        </b>
                    </a>
                </li>
            </ul>
        );
    }
}
    
export default ProfileTabs;