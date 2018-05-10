import React, { Component } from 'react';

class Route  extends Component {
    render(){
        return(
            <a href="" className="list-group-item list-group-item-action flex-column align-items-start text-white m-1">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.store.routeName}</h5>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <small className="text-white">{this.props.store.time}</small>
                    <small className="text-white">{this.props.store.startLocation + " to " + this.props.store.endLocation}</small>
                    <small className="text-white">{Math.floor(Math.random() * (40 - 5) + 5) + "km"}</small>
                </div>
            </a>
        );
    }
}

export default Route;