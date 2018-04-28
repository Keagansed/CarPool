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
      email:'',
      fname:'',
      lname:'',
      id:'',
      pass:'',
    };

  }
  //========= Capture form input ===========
  changeEmail = (event)=>{
    this.setState({email:event.target.value});
  }
  changefName = (event)=>{
    this.setState({fname:event.target.value});
  }
  changelName = (event)=>{
    this.setState({lname:event.target.value});
  }
  changeID = (event)=>{
    this.setState({id:event.target.value});
  }
  changePass = (event)=>{
    this.setState({pass:event.target.value});
  }
  //========= Call external functions ===========
  signInFunc = (event)=>{
    event.preventDefault();
    signInSubmitFunc(this.state.email, this.state.pass);
  }

  signUpFunc = (event)=>{
    event.preventDefault();
    signUpSubmitFunc(
        this.state.fname,
        this.state.lname,
        this.state.email,
        this.state.id,
        this.state.pass
        );
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
	                            <input type="email" className="form-control" onChange={this.changeEmail} placeholder="Enter email"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signInpass">Password</label>
	                            <input type="password" className="form-control" onChange={this.changePass} placeholder="Enter password"/>
	                        </div>
	                        <button type="submit" className="btn btn-primary" onClick={this.signInFunc}>Submit</button>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 col-sm-12 bubble">
                        <h3>Sign Up{this.token}</h3> <hr />
                        <form id="signUpSubmit">
                            <div className="form-group">
                                <label htmlFor="signUpfname">First Name</label>
                                <input type="text" className="form-control" onChange={this.changefName} placeholder="Enter first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUplname">Last Name</label>
                                <input type="text" className="form-control" onChange={this.changelName} placeholder="Enter last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUpemail">Email address</label>
                                <input type="email" className="form-control" onChange={this.changeEmail}placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUpid">ID</label>
                                <input type="text" className="form-control" onChange={this.changeID} placeholder="Enter ID" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUppass">Password</label>
                                <input type="password" className="form-control" onChange={this.changePass} placeholder="Enter password" />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.signUpFunc}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }else{
       return(
	       <Redirect to={"/profile/" + this.state.token} />
        ); 
    }
  }
}

export default Login;
