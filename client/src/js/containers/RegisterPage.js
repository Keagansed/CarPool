// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import logo  from "../../css/images/logo.png";

function validate(fName, lName, idNum, email, password1, password2) {
    // true means invalid, so our conditions got reversed
    return {
        fName: fName.length === 0 || fName.length > 50,
        lName: lName.length === 0 || lName.length > 50,
        idNum: idNum.length !== 13,
        email: email.length === 0 || email.length > 100,
        password1: password1.length === 0,
        password2: password2.length === 0,
    };
}

/*
* Purpose: Register page where the user enters their details to register for the app
*/
@observer class Register extends Component {
    constructor() {
        super();
        this.state = {
            fName: '',
            lName: '',
            idNum: '',
            email: '',
            password1: '',
            password2: '',

            everFocusedFirstName: false,
            everFocusedLastName: false,
            everFocusedID: false,
            everFocusedEmail: false,
            everFocusedPassword1: false,
            everFocusedPassword2: false,
            inFocus: '',
        };
        this.updateSignUpfNameValue = this.updateSignUpfNameValue.bind(this);
        this.updateSignUplNameValue = this.updateSignUplNameValue.bind(this);
        this.updateSignUpIDValue = this.updateSignUpIDValue.bind(this);
        this.updateSignUpEmailValue = this.updateSignUpEmailValue.bind(this);
        this.updateSignUpPasswordValue1 = this.updateSignUpPasswordValue1.bind(this);
        this.updateSignUpPasswordValue2 = this.updateSignUpPasswordValue2.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    /*
    * Purpose: Sets the 'store.sFName' variable to senders current value
    */
    updateSignUpfNameValue = event => {
        this.setState({ fName: event.target.value });
        this.props.store.sFName = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sLName' variable to senders current value
    */
    updateSignUplNameValue = event => {
        this.setState({ lName: event.target.value });
        this.props.store.sLName = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sEmail' variable to senders current value
    */
    updateSignUpEmailValue = event => {
        this.setState({ email: event.target.value });
        this.props.store.sEmail = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sId' variable to senders current value
    */
    updateSignUpIDValue = event => {
        this.setState({ idNum: event.target.value });
        this.props.store.sId = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sPassword1' variable to senders current value
    */
    updateSignUpPasswordValue1 = event => {
        this.setState({ password1: event.target.value });
        this.props.store.sPassword1 = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sPassword2' variable to senders current value
    */
    updateSignUpPasswordValue2 = event => {
        this.setState({ password2: event.target.value });
        this.props.store.sPassword2 = event.target.value;
    }

    /*
    * Purpose: Calls the store.signUp() function
    */
    handleSignup = event => {
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }
        this.props.store.signUp();
    }

    canBeSubmitted() {
        const errors = validate(this.state.fName, this.state.lName, this.state.idNum, this.state.email, this.state.password1, this.state.password2);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {
        const { registered } = this.props.store; 
        const errors = validate(this.state.fName, this.state.lName, this.state.idNum, this.state.email, this.state.password1, this.state.password2);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        if(!registered) {
            return(
                <div className="vertical-center bg-purple">
                    <div className="container-fluid">
                        <div className="row">
                                <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} id="imgLogo" alt="carpool_logo"/> 
                        </div>
                        <form>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpfNameValue} 
                                    type="text" 
                                    id="inputFirstName"
                                    className={(errors.fName ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    placeholder="First Name"
                                    value={this.state.fName}
                                />  
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUplNameValue}  
                                    type="text" 
                                    id="inputLastName"
                                    className={(errors.fName ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    placeholder="Last Name" 
                                    value={this.state.lName}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpIDValue} 
                                    type="text" 
                                    id="inputID"
                                    className={(errors.fName ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    placeholder="ID Number"  
                                    value={this.state.idNum}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpEmailValue} 
                                    type="email" 
                                    id="inputEmail"
                                    className={(errors.email ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    placeholder="Email"
                                    value={this.state.email}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpPasswordValue1} 
                                    type="password" 
                                    id="inputPassword"
                                    className={(errors.password1 ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    placeholder="Password" 
                                    value={this.state.password1}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpPasswordValue2} 
                                    type="password" 
                                    id="inputConfirmPassword"
                                    className={(errors.password2 ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    placeholder="Confirm Password"
                                    value={this.state.password2}
                                /> 
                            </div>
                            <div className="row">
                                <button 
                                    onClick={this.handleSignup} 
                                    type="submit" 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" 
                                    disabled={isDisabled}
                                >
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
    