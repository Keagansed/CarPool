// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import logo  from "../../css/images/logo.png";

/*
* Purpose: Register page where the user enters their details to register for the app
*/
@observer class Register extends Component {
    /*
    * Purpose: Sets the 'store.sFName' variable to senders current value
    */
    updateSignUpfNameValue = event => {
        this.props.store.sFName = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sLName' variable to senders current value
    */
    updateSignUplNameValue = event => {
        this.props.store.sLName = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sEmail' variable to senders current value
    */
    updateSignUpEmailValue = event => {
        this.props.store.sEmail = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sId' variable to senders current value
    */
    updateSignUpIDValue = event => {
        this.props.store.sId = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sPassword1' variable to senders current value
    */
    updateSignUpPasswordValue1 = event => {
        this.props.store.sPassword1 = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sPassword2' variable to senders current value
    */
    updateSignUpPasswordValue2 = event => {
        this.props.store.sPassword2 = event.target.value;
    }

    /*
    * Purpose: Calls the store.signUp() function
    */
    handleSignup = event => {
        event.preventDefault();
        this.props.store.signUp();
    }

    render() {
        const { registered } = this.props.store; 

        if(!registered) {
            return(
                <div className="vertical-center bg-purple">
                    <div className="container-fluid">
                        <div className="row">
                                <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} id="imgLogo" alt="carpool_logo"/> 
                        </div>
                        <form>
                            <div className="row">
                                <input onChange={this.updateSignUpfNameValue} type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="First Name" required="required" name="FirstName" id="inputFirstName"/>  
                            </div>
                            <div className="row">
                                <input onChange={this.updateSignUplNameValue}  type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Last Name" required="required" name="LastName" id="inputLastName"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.updateSignUpIDValue} type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="ID Number" required="required" name="ID" id="inputID"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.updateSignUpEmailValue} type="email" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Email" required="required" name="Email" id="inputEmail"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.updateSignUpPasswordValue1} type="password" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Password" required="required" name="Password" id="inputPassword"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.updateSignUpPasswordValue2} type="password" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Confirm Password" required="required" name="ConfirmPassword" id="inputConfirmPassword"/> 
                            </div>
                            <div className="row">
                                <button onClick={this.handleSignup} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnLogin">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }else {
            return(               
                <Redirect to={{
                    pathname: "/Login", 
                }}/>
            );
        }
    }
}

export default Register;
    