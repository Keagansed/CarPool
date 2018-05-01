import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import { getFromStorage } from '../utils/localStorage.js'

@observer class Login extends Component {
  constructor(props){
    super(props);

    this.state ={
      token:'',
      email:'',
      password:''
    };
  }

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

  componentDidMount(){
    
  }

  updateEmailValue = event =>
  {
    this.setState({
        email: event.target.value,
    })
  }

  updatePasswordValue = event =>
  {
    this.setState({
        password: event.target.value,
    })
  }

  handleLogin = event => {
    event.preventDefault();

    this.props.store.authenticate(this.state.email, this.state.password);
  }

  render() {

    const { loggedIn, token } = this.props.store;

    if(!loggedIn){
        return(
            <div className="center_container login_center_container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 bubble">
                        <h3>Sign In</h3><hr/>
                        <form id="signInSubmit">
	                        <div className="form-group">
	                            <label htmlFor="signInemail">Email address</label>
	                            <input type="email" onChange={this.updateEmailValue} className="form-control" id="signInemail" placeholder="Enter email"/>
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="signInpass">Password</label>
	                            <input type="password" onChange={this.updatePasswordValue} className="form-control" id="signInpass" placeholder="Enter password"/>
	                        </div>
	                        <button onClick={this.handleLogin} type="submit" className="btn btn-primary" >Submit</button>
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
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }else{
       return(
	        <Redirect to={{
                pathname: "/profile/" + token,
                state: { token: token }
            }}/>
        ); 
    }
  }
}

export default Login;
