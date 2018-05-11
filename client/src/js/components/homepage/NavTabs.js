import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

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
        
            <ul className="nav nav-tabs bg-primary fixed">
                <li className="nav-item w-25 bg-info text-center px-0">
                    <a href="" className={"nav-link bg-info " + this.state.routeTabActive} onClick={this.handleRouteToggle}>
                        <b>
                            <b>Routes</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 text-center bg-info">
                    <a className={"nav-link bg-info " + this.state.carpoolTabActive} href="" onClick={this.handleCarPoolToggle}>
                        <b>
                            <b>Carpools</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 text-center bg-info">
                    <a className={"nav-link bg-info " + this.state.tripTabActive} href="" onClick={this.handleTripToggle}>
                        <b>
                            <b>Trips</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 bg-info text-center flex-center no-active">
                    <div className="nav-link p-0 bg-info no-active" href="">
                        <Link className="text-secondary" to={{pathname: '/newRoute', token: this.props.token}}>
                            <i className="fa fa-plus fa-lg fa-fw d-inline nav-item-circle" onClick={this.handleAddRoute}></i>
                        </Link>
                    </div>
                </li>
            </ul>
           
        )
    }
}

export default NavTabs