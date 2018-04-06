import React, { Component } from 'react';
import '../../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { getFromStorage } from '../utils/localStorage.js'
import "../utils/loginQuery.js";
import Profile from "./Profile.js"


class Login extends Component {
  constructor(props){
    super(props);

    this.state ={
      token:'',
    };
  }

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
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h3>Sign Up{this.token}</h3> <hr/>
                        <form id="signUpSubmit">
	                        <div className="form-group">
	                            <label htmlFor ="signUpfname">First Name</label>
	                            <input type="text" className="form-control" id="signUpfname" placeholder="Enter first name"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signUplname">Last Name</label>
	                            <input type="text" className="form-control" id="signUplname" placeholder="Enter last name"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signUpemail">Email address</label>
	                            <input type="email" className="form-control" id="signUpemail" placeholder="Enter email"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signUpid">ID</label>
	                            <input type="text" className="form-control" id="signUpid" placeholder="Enter ID"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signUppass">Password</label>
	                            <input type="password" className="form-control" id="signUppass" placeholder="Enter password"/>
	                        </div>
	                        <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>

                    <div className="col-md-6 col-md-offset-3">
                        <h3>Sign In</h3><hr/>
                        <form id="signInSubmit">
	                        <div className="form-group">
	                            <label htmlFor="signInemail">Email address</label>
	                            <input type="email" className="form-control" id="signInemail" placeholder="Enter email"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signInpass">Password</label>
	                            <input type="password" className="form-control" id="signInpass" placeholder="Enter password"/>
	                        </div>
	                        <button type="submit" className="btn btn-primary" >Submit</button>
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
	    <Profile _id={this.state.token} />
        ); 
    }
  }
}

export default Login;
