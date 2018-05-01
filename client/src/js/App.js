import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import '../css/App.css';


import Login from "./components/Login"
import LoginStore from "./stores/LoginStore"
import Profile from './components/Profile';
import ProfileStore from "./stores/ProfileStore"
import Vouching from './components/Vouching';
import VerificationDocuments from './components/VerificationDocuments';

class App extends Component {

  render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact render={(props) => <Login {...props} store={LoginStore}/>}/>
					<Route path={"/profile/:_id"} exact render={(props) => <Profile {...props} store={ProfileStore}/>}/>
					<Route path={"/vouching/:_id"} exact component={Vouching}/>
					<Route path={"/verification/:_id"} exact component={VerificationDocuments}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
