import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/components/LandingPage.css'; 

import LoginStore from '../stores/LoginStore'
import logo  from "./../../css/images/logo.png";
import fbIcon from "./../../css/images/fb_icon.png";
import googleIcon from "./../../css/images/google_icon.png";


class LandingPage extends Component{
    componentWillMount(){
        LoginStore.setRegistered(false);
    }

    render(){
        return(
            <div className="vertical-center">
                <div className="container-fluid">
                    <div className="row">
                        <img className="img-fluid d-block mx-auto" src={logo} id="imgLogo" alt="carpool_logo"/> 
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-primary mx-auto" id="btnLogin">Login</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-primary mx-auto" id="btnRegister">Register</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;