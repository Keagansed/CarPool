import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './../css/AllPages.css'; 

import HomePage from "./containers/HomePage";
import HomePageStore from './stores/HomePageStore';
import IntroPage from "./containers/IntroPage";
import LandingPage from "./containers/LandingPage";
import LoginPage from "./containers/LoginPage";
import ResetPasswordPage from "./components/login/ResetPasswordPage";
import LoginStore from './stores/LoginStore';
import MatchesPage from "./components/route/MatchesPage";
import Messages from "./components/carpool/Messages";
import NewRoute from "./components/route/NewRoute"
import ProfilePage from "./containers/ProfilePage";
import ProfileStore from './stores/ProfileStore';
import RegisterPage from "./containers/RegisterPage";
import Settings from "./containers/SettingsPage";
import SettingsPageStore from "./stores/SettingsPageStore";
import TripPage from "./components/trip/TripPage";

class App extends Component {

  render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact component={LandingPage}/>
					<Route path={"/Login"} exact render={(props) => <LoginPage {...props} store={LoginStore}/>}/>
					<Route path={"/Register"} exact render={(props) => <RegisterPage {...props} store={LoginStore}/>}/>
					<Route path={"/Introduction"} exact component={IntroPage}/>
					<Route path={"/HomePage"} exact render={(props) => <HomePage {...props} store={HomePageStore}/>}/>
					<Route path={"/HomePage/RouteMatches/:_id"} exact render={(props) => <MatchesPage {...props} store={HomePageStore}/>}/>
					<Route path={"/HomePage/Trip/:tripID"} exact render={(props) => <TripPage {...props} store={HomePageStore}/>}/>
					<Route path={"/HomePage/Chat/:carpoolID/:carpoolName"} exact render={(props) => <Messages {...props} store={HomePageStore}/>}/>
					<Route path={"/ProfilePage/:_id"} exact render={(props) => <ProfilePage {...props} store={ProfileStore}/>}/>
					<Route path={"/reset/:ResetPasswordToken"} exact render={(props) => <ResetPasswordPage {...props} store={LoginStore}/>}/>
					<Route path={"/Settings"} exact render={(props) => <Settings {...props} store={SettingsPageStore}/>}/>
					<Route path={"/newRoute"} exact component={NewRoute}/> 
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
