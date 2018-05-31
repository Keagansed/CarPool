import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './../css/AllPages.css'; 

import LoginStore from './stores/LoginStore';

import LandingPage from "./components/landing/LandingPage.js";
import LoginPage from "./components/login/LoginPage.js";
import RegisterPage from "./components/register/RegisterPage.js";

class App extends Component {

  render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact component={LandingPage}/>
					<Route path={"/Login"} exact render={(props) => <LoginPage {...props} store={LoginStore}/>}/>
					<Route path={"/Register"} exact render={(props) => <RegisterPage {...props} store={LoginStore}/>}/>
					{/* <Route path={"/HomePage"} exact render={(props) => <HomePage {...props} store={HomePageStore}/>}/>
					<Route path={"/profile/:_id"} exact render={(props) => <Profile {...props} store={ProfileStore}/>}/>
					<Route path={"/profile/:_id"} exact render={(props) => <Profile {...props} store={ProfileStore}/>}/>
					<Route path={"/ProfilePage/:_id"} exact render={(props) => <ProfilePage {...props} store={ProfileStore}/>}/>
					<Route path={"/vouching/:_id"} exact component={Vouching}/>
					<Route path={"/verification/:_id"} exact component={VerificationDocuments}/>
					<Route path={"/newRoute"} exact component={NewRoute}/> */}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
