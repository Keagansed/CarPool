import { observer } from "mobx-react";
import React, { Component } from 'react';

import fbIcon from "./../../css/images/fb_icon.png";
import googleIcon from "./../../css/images/google_icon.png";


@observer class Register extends Component {

    updateSignUpfNameValue = event =>
    {
        this.props.store.sFName = event.target.value;
    }

    updateSignUplNameValue = event =>
    {
        this.props.store.sLName = event.target.value;
    }

    updateSignUpEmailValue = event =>
    {
        this.props.store.sEmail = event.target.value;
    }

    updateSignUpIDValue = event =>
    {
        this.props.store.sId = event.target.value;
    }

    updateSignUpPasswordValue1 = event =>
    {
        this.props.store.sPassword1 = event.target.value;
    }

    updateSignUpPasswordValue2 = event =>
    {
        this.props.store.sPassword2 = event.target.value;
    }

    handleSignup = event => {
        event.preventDefault();
        this.props.store.signUp();
    }

    render() {
        return(
            <div>
                <div className="text-center">
                    <div className="container">
                        <div className="row bigTopMargin">
                            <div className="col-md-12">
                                <form className="">
                                    <div className="form-group my-2">
                                        <input onChange={this.updateSignUpfNameValue} type="text" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="First Name" required="required" name="txtFirstName" id="txtFirstName"/> 
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.updateSignUplNameValue}  type="text" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="Last Name" required="required" name="txtLastName" id="txtLastName"/> 
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.updateSignUpIDValue} type="text" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="ID Number" required="required" name="txtID" id="txtID"/> 
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.updateSignUpEmailValue} type="email" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="Email" required="required" name="txtEmail" id="txtEmail"/> 
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.updateSignUpPasswordValue1} type="password" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="Password" required="required" name="txtPassword" id="txtPassword"/> 
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.updateSignUpPasswordValue2} type="password" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="Confirm Password" required="required" name="txtConfirmPassword" id="txtConfirmPassword"/> 
                                    </div>
                                    <button onClick={this.handleSignup} type="submit" className="mt-3 mb-2 btn btn-primary roundCorners w-75 text-secondary font-weight-medium">
                                        <b>Register</b>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-2 text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                    <strike>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </strike>&nbsp; &nbsp; <b className="small font-weight-medium">OR</b> &nbsp; &nbsp;
                                    <strike>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strike>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-2">
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

export default Register;
    