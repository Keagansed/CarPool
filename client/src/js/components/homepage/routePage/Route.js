import React, { Component } from 'react';

class Route  extends Component {
    render(){
        return(
            <a href="" className="list-group-item list-group-item-action flex-column align-items-start text-white m-1">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.header}</h5>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <small className="text-white">{this.props.time}</small>
                    <small className="text-white">{this.props.distance}</small>
                    <small className="text-white">{this.props.matches}</small>
                </div>
            </a>
        );
    }
}

export default Route;