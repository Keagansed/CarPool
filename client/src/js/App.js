import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import HomePage from "./components/HomePage";
import HomePageStore from './stores/HomePageStore';
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/landing/LoginPage";
import LoginStore from "./stores/LoginStore";
import NewRoute from "./components/homepage/routePage/NewRoute";
import ProfilePage from './components/ProfilePage';
import ProfileStore from "./stores/ProfileStore";
import RegisterPage from "./components/landing/RegisterPage";
import SettingsPage from "./components/Settings";

import '../css/font.css';
import './../css/style.css';


class App extends Component {

  render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact component={LandingPage}/>
					<Route path={"/Login"} exact render={(props) => <LoginPage {...props} store={LoginStore}/>}/>
					<Route path={"/Register"} exact render={(props) => <RegisterPage {...props} store={LoginStore}/>}/>
					<Route path={"/HomePage"} exact render={(props) => <HomePage {...props} store={HomePageStore}/>}/>
					<Route path={"/ProfilePage/:_id"} exact render={(props) => <ProfilePage {...props} store={ProfileStore}/>}/>
					<Route path={"/newRoute"} exact component={NewRoute}/>
					<Route path={"/Setting"} exact render={(props) => <SettingsPage {...props} store={LoginStore}/>}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
