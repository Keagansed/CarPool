// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import logo  from "./../../../css/images/logo.png";
import { getFromStorage } from './../../utils/localStorage';
import ServerURL from '../../utils/server';

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
    * Purpose: Check to see whether the user is already logged in
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token) {
            const { token } = obj;

            fetch(ServerURL + '/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.props.store.setToken(token);
                    this.props.store.setLoggedIn(true);
                }
            })
        }
    }

    /*
    * Purpose: Sets the 'store.resetPass' variable to senders current value
    */
    updatePasswordValue = (event) => {
        this.setState({ password: event.target.value });
        this.props.store.resetPass = event.target.value;
        this.props.store.passwordChangeMessage = '';
    }

    /*
    * Purpose: Sets the value of password2 for error checking purposes
    */
    updatePassword2Value = (event) => {
        this.setState({ password2: event.target.value });
        this.props.store.passwordChangeMessage = '';
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

        const { loggedIn } = this.props.store;
        const errors = validate(this.state.password, this.state.password2);
        const { passwordChangeMessage } = this.props.store;
        let messageColor = "txt-green ";
        if (passwordChangeMessage === 'This password reset link is not valid')
            messageColor = "txt-red ";
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        if(!loggedIn) {
            return(
                <div className="vertical-center bg-purple">
                    <div className="container-fluid">
                        <div className="row">
                            <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} alt="carpool_logo" id="logo-256"/> 
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
                                    className={(shouldMarkError('password2') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem"}
                                    onBlur={this.handleBlur('password2')}
                                    placeholder="Confirm New Password"
                                    id="inputConfirmPassword"
                                    value={this.state.password2}
                                /> 
                            </div>
                            <div className="row">
                                <p className={messageColor + "mx-auto mbottom-05rem mtop-05rem"}>{passwordChangeMessage}</p>
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
        }else{
            return(               
                <Redirect to={{
                    pathname: "/HomePage", 
                }}/>
            );
        }
    }
}

export default ResetPasswordPage;