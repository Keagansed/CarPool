// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import logo  from "../../css/images/logo.png";

const util = require('./../utils/idCheck');

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(fName, lName, idNum, email, password1, password2) {
    return {
        fName: fName.length === 0 || fName.length > 50,
        lName: lName.length === 0 || lName.length > 50,
        idNum: !util.ValidateIDNumber(idNum),
        email: !util.ValidateEmail(email),
        password1: password1.length === 0,
        password2: password2.length === 0 || password2 !== password1,
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

            touched: {
                fName: false,
                lName: false,
                idNum: false,
                email: false,
                password1: false,
                password2: false,
            },
        };
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
    * Purpose: Calls the store.signUp() function if all values have been entered correctly
    */
    handleSignup = event => {
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }
        this.props.store.signUp();
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.fName, this.state.lName, this.state.idNum, this.state.email, this.state.password1, this.state.password2);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    /*
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    render() {
        /*
        * Purpose: Only give fields red borders if the user has changed/access them
        * and they are still not valid.
        */
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };

        const { registered } = this.props.store; 
        const errors = validate(this.state.fName, this.state.lName, this.state.idNum, this.state.email, this.state.password1, this.state.password2);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        if(!registered) {
            return(
                <div className="vertical-center bg-purple">
                    <div className="container-fluid">
                        <div className="row">
                                <img className="img-fluid d-block mx-auto mbottom-1rem" src={logo} id="logo-256" alt="carpool_logo"/> 
                        </div>
                        <form>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpfNameValue} 
                                    type="text" 
                                    id="inputFirstName"
                                    className={(shouldMarkError('fName') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('fName')}
                                    placeholder="First Name"
                                    value={this.state.fName}
                                />  
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUplNameValue}  
                                    type="text" 
                                    id="inputLastName"
                                    className={(shouldMarkError('lName') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('lName')}
                                    placeholder="Last Name" 
                                    value={this.state.lName}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpIDValue} 
                                    type="text" 
                                    id="inputID"
                                    className={(shouldMarkError('idNum') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('idNum')}
                                    placeholder="ID Number"  
                                    value={this.state.idNum}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpEmailValue} 
                                    type="email" 
                                    id="inputEmail"
                                    className={(shouldMarkError('email') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('email')}
                                    placeholder="Email"
                                    value={this.state.email}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpPasswordValue1} 
                                    type="password" 
                                    id="inputPassword"
                                    className={(shouldMarkError('password1') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('password1')}
                                    placeholder="Password" 
                                    value={this.state.password1}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateSignUpPasswordValue2} 
                                    type="password" 
                                    id="inputConfirmPassword"
                                    className={(shouldMarkError('password2') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('password2')}
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
                    pathname: "/Introduction", 
                }}/>
            );
        }
    }
}

export default Register;
    