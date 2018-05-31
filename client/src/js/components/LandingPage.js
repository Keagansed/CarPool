import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginStore from './../stores/LoginStore';
import logo  from "./../../css/images/logo.png";
import fbIcon from "./../../css/images/fb_icon.png";
import googleIcon from "./../../css/images/google_icon.png";


class LandingPage extends Component{
    componentWillMount(){
        LoginStore.setRegistered(false);
    }

    render(){
        return(
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 my-4">
                            <img className="img-fluid d-block mx-auto" src={logo} id="imgLogo" alt="logo"/> 
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <Link to={`/Login`} className="btn w-75 text-center btn-primary text-secondary roundCorners font-weight-medium" id="btnLogin">
                            <b>Login</b>
                        </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                        <Link to={`/Register`} className="btn w-75 text-center btn-primary text-secondary roundCorners my-3 font-weight-medium" id="btnRegister">
                            <b>Register</b>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="py-2 text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="" id="dividerOR">
                                    <strike>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </strike>&nbsp; &nbsp; <b className="small font-weight-medium">OR</b> &nbsp; &nbsp;
                                    <strike>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strike>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-0">
                    <div className="text-center container">
                        <div className="row text-center">
                            <div className="col-2-pr-5 col-sm-2 col-md-6 col-lg-2 col-xl-2 ml-auto">
                                <img className="img-fluid d-block mx-auto" src={fbIcon} id="btnFacebookLogin" alt="fbLogin"/> 
                            </div>
                            <div className="col-2-pl-5 col-sm-2 col-md-6 col-lg-2 col-xl-2 mr-auto">
                                <img className="img-fluid d-block mx-auto" src={googleIcon} id="btnGoogleLogin" alt="googleLogin"/> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LandingPage;