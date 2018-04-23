import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import { getFromStorage } from '../utils/localStorage.js'
import { signUpSubmitFunc, signInSubmitFunc } from "../utils/loginQuery.js";

class Login extends Component {
  constructor(props){
    super(props);
    //========= Properties ===========
    this.state ={
      token:'',
    };
  }

    //========= Render Component ===========
  componentDidMount(){
    const obj = getFromStorage('sessionKey');
    if(obj && obj.token){
      //verify token
      const { token } = obj;
      fetch('/api/account/verify?token='+token)
       .then(res => res.json())
       .then(json => {
            if(json.success){
                this.setState({
                    token:token
                })
            }
       });
    }
  }

  render() {
    if(!this.state.token){
        return(
            <div className="center_container login_center_container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 bubble">
                        <h3>Sign In</h3><hr/>
                        <form id="signInSubmit" >
	                        <div className="form-group">
	                            <label htmlFor="signInemail">Email address</label>
	                            <input type="email" className="form-control" id="signInemail" placeholder="Enter email"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signInpass">Password</label>
	                            <input type="password" className="form-control" id="signInpass" placeholder="Enter password"/>
	                        </div>
	                        <button type="submit" className="btn btn-primary" onClick={signInSubmitFunc}>Submit</button>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 col-sm-12 bubble">
                        <h3>Sign Up{this.token}</h3> <hr />
                        <form id="signUpSubmit">
                            <div className="form-group">
                                <label htmlFor="signUpfname">First Name</label>
                                <input type="text" className="form-control" id="signUpfname" placeholder="Enter first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUplname">Last Name</label>
                                <input type="text" className="form-control" id="signUplname" placeholder="Enter last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUpemail">Email address</label>
                                <input type="email" className="form-control" id="signUpemail" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUpid">ID</label>
                                <input type="text" className="form-control" id="signUpid" placeholder="Enter ID" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUppass">Password</label>
                                <input type="password" className="form-control" id="signUppass" placeholder="Enter password" />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={signUpSubmitFunc}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }else{
       return(
            //~ <div className="container">
                //~ <h3>Account</h3>
                //~ <button type="submit" className="btn btn-primary" id="logOutSubmit">Log Out</button>
            //~ </div>
	    <Redirect to={"/profile/" + this.state.token} />
        ); 
    }
  }
}

export default Login;
