// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Modal from '../components/login/PasswordModal';

import { getFromStorage } from '../utils/localStorage.js';
import logo  from "../../css/images/logo.png";

/*
* Purpose: Login page where the user enters login details to proceed to the HomePage
*/
@observer class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state ={
          token:'',
        }; 
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
        this.props.store.lEmail = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.lPassword' variable to senders current value
    */
    updateLoginPasswordValue = (event) => {
        this.props.store.lPassword = event.target.value;
    }

    /*
    * Purpose: Calls the store.authenticate() function
    */
    handleLogin = (event) => {
        event.preventDefault();
        this.props.store.authenticate(this.state.email, this.state.password);
    }

    /*
    * Purpose: Toggles the modal to display
    */
    openModal = (event) => {
        event.preventDefault();
        this.modal.open();
    }

    render() {
        const { loggedIn } = this.props.store;
    
        if(!loggedIn) {
            return(
                <div className="vertical-center bg-purple">
                    <div className="container-fluid">
                        <div className="row">
                            <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} id="imgLogo" alt="carpool_logo"/> 
                        </div>
                        <form>
                            <div className="row">
                                <input onChange={this.updateLoginEmailValue} type="email" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Email" required="required" name="Email" id="inputEmail"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.updateLoginPasswordValue} type="password" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Password" required="required" name="Password" id="inputPassword"/> 
                            </div>
                            <div className="row">
                                <button onClick={this.handleLogin} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnLogin">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="row">
                            <Modal />
                        </div>
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