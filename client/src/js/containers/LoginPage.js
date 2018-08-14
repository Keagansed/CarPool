// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Modal from '../components/login/PasswordModal';
import { getFromStorage } from '../utils/localStorage.js';

import logo  from "../../css/images/logo.png";

const util = require('./../utils/idCheck');
const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(email, password) {
    return {
        email: !util.ValidateEmail(email),
        password: password.length === 0,
    };
}


/*
* Purpose: Login page where the user enters login details to proceed to the HomePage
*/
@observer class Login extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        
        this.state ={
            toggle: false,
            token:'',
            email: '',
            password: '',

            touched: {
                email: false,
                password: false,
            },
        }; 
    }

    /*
     * Purpose: toggles the visibility of the component.  
     */
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
    * Purpose: Check to see whether the user is already logged in
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token) {
            const { token } = obj;

            fetch('/api/account/verify?token='+token)
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
    * Purpose: Sets the 'store.lEmail' variable to senders current value
    */
    updateLoginEmailValue = (event) => {
        this.setState({ email: event.target.value });
        this.props.store.lEmail = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.lPassword' variable to senders current value
    */
    updateLoginPasswordValue = (event) => {
        this.setState({ password: event.target.value });
        this.props.store.lPassword = event.target.value;
    }

    /*
    * Purpose: Calls the store.authenticate() function
    */
    handleLogin = (event) => {
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }
        this.props.store.authenticate(this.state.email, this.state.password);
        //TODO: this toggle should only be called if authentication was unsuccessful
        this.toggle();
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.email, this.state.password);
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

        const { loggedIn } = this.props.store;
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Failed</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            You have entered an incorrect email or password.
                        </div>
                    </div>
                </div>
            </div>
        );
    
        if(!loggedIn) {
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
                                    onChange={this.updateLoginEmailValue} 
                                    type="email" 
                                    className={(shouldMarkError('email') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('email')}
                                    placeholder="Email" 
                                    id="inputEmail"
                                    value={this.state.email}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.updateLoginPasswordValue} 
                                    type="password" 
                                    className={(shouldMarkError('password') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem"}
                                    onBlur={this.handleBlur('password')}
                                    placeholder="Password"
                                    id="inputPassword"
                                    value={this.state.password}
                                /> 
                            </div>
                            <div className="row">
                                <button 
                                    onClick={this.handleLogin} 
                                    type="submit" 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" 
                                    id="btnLogin"
                                    disabled={isDisabled}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="row">
                            {/* forgot password modal */}
                            <Modal />
                        </div>
                        {/* login failed modal */}
                        {modal}
                    </div>
                </div>
            );
        }else {

            return(               
                 <Redirect to={{
                     pathname: "/HomePage", 
                 }}/>
             ); 
        }
    }

}

export default Login;