// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import logo  from "./../../../css/images/logo.png";

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(password, password2) {
    return {
        password: password.length === 0,
        password2: password2 !== password || password2.length === 0,
    };
}

/*
* Purpose: Reset password page where user resets password
*/
@observer class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.props.store.resetToken = this.props.match.params.ResetPasswordToken;
        
        this.state ={
            token:'',
            password: '',
            password2: '',

            touched: {
                password: false,
                password2: false,
            },
        }; 
    }

    /*
    * Purpose: Sets the 'store.resetPass' variable to senders current value
    */
    updatePasswordValue = (event) => {
        this.setState({ password: event.target.value });
        this.props.store.resetPass = event.target.value;
    }

    /*
    * Purpose: Sets the value of password2 for error checking purposes
    */
    updatePassword2Value = (event) => {
        this.setState({ password2: event.target.value });
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.password, this.state.password2);
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

    /*
    * Purpose: Calls the store.sendPassword() function
    */
    resetPassword = (event) => {
        event.preventDefault();
        this.props.store.resetPassword();
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

        const errors = validate(this.state.password, this.state.password2);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return(
            <div className="vertical-center bg-purple">
                <div className="container-fluid">
                    <div className="row">
                        <img 
                            className="img-fluid d-block mx-auto mbottom-2rem" 
                            src={logo} 
                            id="imgLogo" 
                            alt="carpool_logo"
                        /> 
                    </div>
                    <form>
                        <div className="row">
                            <input 
                                onChange={this.updatePasswordValue} 
                                type="password" 
                                className={(shouldMarkError('password') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                onBlur={this.handleBlur('password')}
                                placeholder="New Password" 
                                id="inputPassword"
                                value={this.state.password}
                            /> 
                        </div>
                        <div className="row">
                            <input 
                                onChange={this.updatePassword2Value} 
                                type="password" 
                                className={(shouldMarkError('password2') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                onBlur={this.handleBlur('password2')}
                                placeholder="Confirm New Password"
                                id="inputConfirmPassword"
                                value={this.state.password2}
                            /> 
                        </div>
                        <div className="row">
                            <button 
                                onClick={this.resetPassword} 
                                type="submit" 
                                className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" 
                                id="btnLogin"
                                disabled={isDisabled}
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ResetPasswordPage;