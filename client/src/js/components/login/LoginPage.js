import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import "./../../../css/components/Login.css"

import logo  from "./../../../css/images/logo.png";
import { getFromStorage } from './../../utils/localStorage.js';
import Modal from './modal';

@observer class Login extends Component {
    constructor(props){
        super(props);
        // ========= Properties ===========
        this.state ={
          token:'',
        }; 
    }

    //========= Render Component ===========
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            //verify token
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.setToken(token);
                    this.props.store.setLoggedIn(true);
                }
            })
        }
    }
    componentDidMount(){}

    updateLoginEmailValue = event =>
    {
        this.props.store.lEmail = event.target.value;
    }

    updateLoginPasswordValue = event =>
    {
        this.props.store.lPassword = event.target.value;
    }

    handleLogin = event => {
        event.preventDefault();
        this.props.store.authenticate(this.state.email, this.state.password);
    }

    openModal = event =>{
        event.preventDefault();
        console.log("link clicked");
        this.modal.open();
    }

    render() {

        const { loggedIn } = this.props.store;
    
        if(!loggedIn){
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
                            <a data-toggle="modal" data-target="#myModal" className="mx-auto txt-white fw-100" id="linkForgotPassword">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <Modal />
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

export default Login;