// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import Carpools from '../components/carpool/Carpools';
import { HomeNavTabs } from '../components/navigation/NavTabs';
import Navbar from '../components/navigation/Navbar';
import NewRoute from '../components/route/NewRoute';
import OffersStore from '../stores/OffersStore';
import Routes from '../components/route/Routes';
import RoutesStore from '../stores/RoutesStore';
import Trips from '../components/trip/Trips';

import { getFromStorage } from '../utils/localStorage.js';

/*
* Purpose: Container compenent for the application HomePage, only takes care of tab switching all data
* is in sub-components
*/
@observer class HomePage extends Component{
    constructor() {
        super()

        this.state = {
            token: "",
        }
    }

    /*
    * Purpose: Verifies the users token before component mounting to make sure the user is authorised
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        let { token } = obj;

        this.setState({
            token,
        })
        
        let { store } = this.props;

        store.token = token;
        store.routeTab = true;
        store.carpoolTab = false;
        store.tripTab = false;
    }

    /*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
    setTab = () => {
        const { store } = this.props;
        const { token } = this.state;

        if(store.routeTab === true) {
            return <Routes store={RoutesStore} token={token}/>;            
        }
        else if(store.carpoolTab === true) {
            return <Carpools store={OffersStore} token={token}/>;
        }
        else if(store.tripTab === true) {
            return <Trips/>;
        }
        else if(store.addTab === true) {
            return <NewRoute
                        store={RoutesStore} 
                        token={this.props.store.token}
                    />
        }
    }

    /*
    * Purpose: Returns the JSX for the NavTabs component
    */
    renderNavTabs = () => {
        return <HomeNavTabs store={this.props.store}/>; 
    }

    /*
    * Purpose: Returns the JSX for the Navbar component
    */
    renderNavBar = () => {
        return <Navbar token={this.state.token}/>;
    }

    render() {
        return(
            <div className="size-100 bg-purple">
                {this.renderNavTabs()}
                <div className="padtop-50px padbot-50px scroll-vert">
                    {this.setTab()}
                </div>
                {this.renderNavBar()}
            </div>
        );
    }
}

export default HomePage;