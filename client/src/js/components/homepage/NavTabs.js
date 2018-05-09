import { observer } from 'mobx-react';
import React, { Component } from 'react';

@observer class NavTabs extends Component{

    handleAddRoute = (event) => {
        event.preventDefault();



    }

    handleRouteToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToRoute();
    }

    handleCarPoolToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToCarpool();
    }

    handleTripToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrip();
    }

    render(){
        return(
        
            <ul className="nav nav-tabs bg-primary fixed">
                <li className="nav-item w-25 bg-info text-center px-0">
                    <a href="" className="nav-link active bg-info" onClick={this.handleRouteToggle}>
                        <b>
                            <b>Routes</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 text-center bg-info">
                    <a className="nav-link bg-info" href="" onClick={this.handleCarPoolToggle}>
                        <b>
                            <b>Carpools</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 text-center bg-info">
                    <a className="nav-link bg-info" href="" onClick={this.handleTripToggle}>
                        <b>
                            <b>Trips</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 bg-info text-center flex-center no-active">
                    <div className="nav-link p-0 bg-info no-active" href="">
                        <i className="fa fa-plus fa-lg fa-fw d-inline nav-item-circle" onClick={this.handleAddRoute}></i>
                    </div>
                </li>
            </ul>
           
        )
    }
}

export default NavTabs