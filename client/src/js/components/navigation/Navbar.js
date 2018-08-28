// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomePageStore from '../../stores/HomePageStore';

/*
* The purpose of the Navbar class is to provide a navbar that is available throughout the application.
* This Navbar provides links to the home page, the user's profile page, and the settings page.
*/
class Navbar extends Component {

    handleNavigate = () => {
        HomePageStore.routeTab = true;
        HomePageStore.carpoolTab = false;
        HomePageStore.tripTab = false;
        HomePageStore.addTab = false;

        HomePageStore.routeTabActive = "active";
        HomePageStore.carpoolTabActive = "";
        HomePageStore.tripTabActive = "";
        HomePageStore.addTabActive = "";
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements using JSX.
    */
    render() {
        return(
            <div className="height-50px fixed-bottom container-fluid pad-10px bg-aqua">
                <div className="row">
                    <div className="col-4 txt-center">
                        <Link to={`/Settings`} onClick={this.handleNavigate}>
                            <i className="fa fa-cog txt-purple txt-30px"></i>
                        </Link>
                    </div>
                    <div className="col-4 txt-center">
                        <Link to={`/HomePage`} onClick={this.handleNavigate}>
                            <i className="fa fa-home txt-purple txt-30px"></i>
                        </Link>
                    </div>
                    <div className="col-4 txt-center">
                        <Link to={{pathname: "/ProfilePage/" + this.props.token}} onClick={this.handleNavigate}>
                            <i className="fa fa-user txt-purple txt-30px"></i>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;