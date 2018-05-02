import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
// import '../css/App.css';
import '../css/style.css';

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Profile from './components/Profile';
import LoginStore from "./stores/LoginStore";
import ProfileStore from "./stores/ProfileStore";
// import Vouching from './components/Vouching';
// import VerificationDocuments from './components/VerificationDocuments';

class App extends Component {

  render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact component={LandingPage}/>
					<Route path={"/Login"} exact render={(props) => <LoginPage {...props} store={LoginStore}/>}/>
					<Route path={"/Register"} exact render={(props) => <RegisterPage {...props} store={LoginStore}/>}/>
					<Route path={"/profile/:_id"} exact render={(props) => <Profile {...props} store={ProfileStore}/>}/>
					{/* <Route path={"/vouching/:_id"} exact component={Vouching}/>
					<Route path={"/verification/:_id"} exact component={VerificationDocuments}/> */}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
