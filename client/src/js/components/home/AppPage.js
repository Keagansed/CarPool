import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import HomePageStore from '../../stores/HomePageStore'
import MatchesPage from './routePage/matchesPage/MatchesPage'
import Messages from './carpoolPage/chatPage/Messages'
import NewRoute from './routePage/NewRoute'
import ProfilePage from '../profile/ProfilePage'
import ProfileStore from '../../stores/ProfileStore'
import Settings from '../settings/SettingsPage'
import SettingsPageStore from '../../stores/SettingsPageStore'
import TripPage from './tripsPage/tripPage/TripPage'

class AppPage extends Component {
    render(){
        return(
            <Switch>
                <Route path={"/AppPage"} exact render={(props) => <HomePage {...props} store={HomePageStore}/>}/>
                <Route path={"/HomePage/RouteMatches/:_id"} exact render={(props) => <MatchesPage {...props} store={HomePageStore}/>}/>
                <Route path={"/AppPage_HomePage/Trip/:tripID"} exact render={(props) => <TripPage {...props} store={HomePageStore}/>}/>
                <Route path={"/AppPage_HomePage/Chat/:carpoolID/:carpoolName"} exact render={(props) => <Messages {...props} store={HomePageStore}/>}/>
                <Route path={"/ProfilePage/:_id"} exact render={(props) => <ProfilePage {...props} store={ProfileStore}/>}/>
                <Route path={"/AppPage_Settings"} exact render={(props) => <Settings {...props} store={SettingsPageStore}/>}/>
                <Route path={"/AppPage_newRoute"} exact component={NewRoute}/>
            </Switch>
        );
    }
}

export default AppPage;