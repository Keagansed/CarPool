// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import logo  from "../../css/images/logo.png";

/*
* Purpose: Landing page compenent is the first page the user sees when opening the app
*/
class LandingPage extends Component {
    componentWillMount() {
        LoginStore.setRegistered(false);
    }

    render() {
        return(
            <div className="vertical-center bg-white">
                <div className="container-fluid">
                    <div className="row">
                        <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} alt="carpool_logo" id="logo-256"/> 
                    </div>
                    <div className="row">
                        <Link to={`/Login`} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnLogin">
                            Login
                        </Link>
                    </div>
                    <div className="row">
                        <Link to={`/Register`} className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" id="btnRegister">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;