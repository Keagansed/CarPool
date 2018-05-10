import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import '../css/font.css';
import './../css/style.css';

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
// import Profile from './components/Profile';
import HomePage from "./components/HomePage";
import HomePageStore from './stores/HomePageStore'
import LoginStore from "./stores/LoginStore";
import NewRoute from "./components/homepage/routePage/NewRoute"
//import ProfileStore from "./stores/ProfileStore";
import RegisterPage from "./components/RegisterPage";
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
					<Route path={"/HomePage"} exact render={(props) => <HomePage {...props} store={HomePageStore}/>}/>
					{/* <Route path={"/profile/:_id"} exact render={(props) => <Profile {...props} store={ProfileStore}/>}/> */}
					{/* <Route path={"/vouching/:_id"} exact component={Vouching}/>
					<Route path={"/verification/:_id"} exact component={VerificationDocuments}/> */}
					<Route path={"/newRoute"} exact component={NewRoute}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
