import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//import { getFromStorage } from '../utils/localStorage.js';

import fbIcon from "./../../css/images/fb_icon.png";
import googleIcon from "./../../css/images/google_icon.png";

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
        // const obj = getFromStorage('sessionKey');
        // if(obj && obj.token){
        //     //verify token
        //     const { token } = obj;
        //     fetch('/api/account/verify?token='+token)
        //     .then(res => res.json())
        //     .then(json => {
        //         if(json.success){
        //             this.props.store.setToken(token);
        //             this.props.store.setLoggedIn(true);
        //         }
        //     })
        // }
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

    render() {

        const { loggedIn } = this.props.store;
    
        if(!loggedIn){
            return(
                <div className="text-center">
                    <div className="container">
                        <div className="row bigTopMargin">
                            <div className="col-md-12">
                                <form className="">
                                    <div className="form-group">
                                        <input onChange={this.updateLoginEmailValue} type="email" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="Email" required="required" name="txtEmail" id="txtEmail"/> 
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.updateLoginPasswordValue} type="password" className="form-control roundCorners bg-info border-1_5 border-primary w-75 mx-auto text-white" placeholder="Password" required="required" name="txtPassword" id="txtPassword"/> 
                                    </div>
                                    <p className="my-2" id="dividerOR">
                                        <strike>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strike> &nbsp; <b className="small">Forgot Password?</b> &nbsp;
                                        <strike>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strike>
                                    </p>
                                    <button onClick={this.handleLogin} type="submit" className="btn btn-primary roundCorners w-75 text-secondary my-3 font-weight-medium">
                                        <b>Login</b>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <p id="dividerOR">
                                        <b className="small font-weight-medium">OR</b>
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