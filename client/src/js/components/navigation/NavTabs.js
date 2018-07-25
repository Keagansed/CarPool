// import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import RoutesStore from "../../stores/RoutesStore";

import NewRouteModal from '../route/NewRouteModal';

@observer class NavTabs extends Component{

    constructor(){
        super()

        this.state = {
            routeTabActive: "active",
            carpoolTabActive: "",
            tripTabActive: "",    
        }
    }

    handleRouteToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToRoute();
        this.setState({
            routeTabActive: "active",
            carpoolTabActive: "",
            tripTabActive: "", 
        })
    }

    handleCarPoolToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToCarpool();
        this.setState({
            routeTabActive: "",
            carpoolTabActive: "active",
            tripTabActive: "", 
        })
    }

    handleTripToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrip();
        this.setState({
            routeTabActive: "",
            carpoolTabActive: "",
            tripTabActive: "active", 
        })
    }

    render(){
        return(
            <div className="fixed-top container-fluid height-50px bg-aqua">
                <div className="row font-20px height-100p">
                    <div className="col-10 pad-0">
                        <button className={"btnTab col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.routeTabActive} onClick={this.handleRouteToggle}>
                            Routes
                        </button>
                        <button className={"btnTab col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.carpoolTabActive} onClick={this.handleCarPoolToggle}>
                            Carpools
                        </button>
                        <button className={"btnTab col-4 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.tripTabActive} onClick={this.handleTripToggle}>
                            Trips
                        </button>
                    </div>
                    <NewRouteModal store={RoutesStore} token={this.props.store.token}/>
                </div>
            </div>
        )
    }
}

export default NavTabs;