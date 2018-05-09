import { observer } from 'mobx-react';
import React, { Component } from 'react';

@observer class NavTabs extends Component{

    handleAddRoute = (event) => {
        event.preventDefault();



    }

    handleRouteToggle = (event) => {
        event.preventDefault();

        
    }

    render(){
        return(
        
            <ul className="nav nav-tabs bg-primary fixed">
                <li className="nav-item w-25 bg-info text-center px-0">
                    <a href="" className="nav-link active bg-info" data-toggle="tab" data-target="#tabone" onClick={this.handleTabToggle}>
                        <b>
                            <b>Routes</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 text-center bg-info">
                    <a className="nav-link bg-info" data-target="#tabtwo" data-toggle="tab" href="" onClick={this.handleTabToggle}>
                        <b>
                            <b>Carpools</b>
                        </b>
                    </a>
                </li>
                <li className="nav-item w-25 text-center bg-info">
                    <a className="nav-link bg-info" href="" data-target="#tabthree" data-toggle="tab" onClick={this.handleTabToggle}>
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