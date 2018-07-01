import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './../css/AllPages.css'; 

// import ChatPage from "./components/home/carpoolPage/chatPage/ChatPage";
import HomePage from "./components/home/HomePage.js";
import HomePageStore from './stores/HomePageStore';
import LandingPage from "./components/landing/LandingPage.js";
import LoginPage from "./components/login/LoginPage.js";
import LoginStore from './stores/LoginStore';
import MatchesPage from "./components/home/routePage/matchesPage/MatchesPage";
import TripPage from "./components/home/tripsPage/tripPage/TripPage";
import Settings from "./components/settings/SettingsPage";
import Messages from "./components/home/carpoolPage/chatPage/Messages";

import NewRoute from "./components/homepage/routePage/NewRoute"
import ProfilePage from "./components/profile/ProfilePage.js";
import ProfileStore from './stores/ProfileStore';
import RegisterPage from "./components/register/RegisterPage.js";
import SettingsPageStore from "./stores/SettingsPageStore";

class App extends Component {

  render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact component={LandingPage}/>
					<Route path={"/Login"} exact render={(props) => <LoginPage {...props} store={LoginStore}/>}/>
					<Route path={"/Register"} exact render={(props) => <RegisterPage {...props} store={LoginStore}/>}/>
					<Route path={"/HomePage"} exact render={(props) => <HomePage {...props} store={HomePageStore}/>}/>
					<Route path={"/HomePage/RouteMatches/:_id"} exact render={(props) => <MatchesPage {...props} store={HomePageStore}/>}/>
					<Route path={"/HomePage/Trip"} exact render={(props) => <TripPage {...props} store={HomePageStore}/>}/>
					<Route path={"/HomePage/Chat/:carpoolID/:carpoolName"} exact render={(props) => <Messages {...props} store={HomePageStore}/>}/>
					<Route path={"/ProfilePage/:_id"} exact render={(props) => <ProfilePage {...props} store={ProfileStore}/>}/>
					<Route path={"/Settings"} exact render={(props) => <Settings {...props} store={SettingsPageStore}/>}/>
					{/* <Route path={"/profile/:_id"} exact render={(props) => <Profile {...props} store={ProfileStore}/>}/>
					<Route path={"/ProfilePage/:_id"} exact render={(props) => <ProfilePage {...props} store={ProfileStore}/>}/>
					<Route path={"/vouching/:_id"} exact component={Vouching}/>
					<Route path={"/verification/:_id"} exact component={VerificationDocuments}/>*/}
					<Route path={"/newRoute"} exact component={NewRoute}/> 
					{/* <Route path={"/vouching/:_id"} exact component={Vouching}/>
					<Route path={"/verification/:_id"} exact component={VerificationDocuments}/> */}
					{/* <Route path={"/newRoute"} exact component={NewRoute}/>*/}

				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
