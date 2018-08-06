// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import Carpools from '../components/carpool/Carpools';
import Navbar from '../components/navigation/Navbar';
import NavTabs from '../components/navigation/NavTabs';
import NewRoute from "../components/route/NewRoute";
import OffersStore from '../stores/OffersStore'
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
            loading: true,
        }
    }

    /*
    * Purpose: Verifies the users token before component mounting to make sure the user is authorised
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token) {
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }
        
        let { store } = this.props;

        store.routeTab = true;
        store.carpoolTab = false;
        store.tripTab = false;
    }

    /*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
    setTab = () => {
        const { store } = this.props;

        if(!this.state.loading) {
            if(store.routeTab === true) {
                return <Routes store={RoutesStore} token={this.props.store.token}/>;            
            }
            else if(store.carpoolTab === true) {
                return <Carpools store={OffersStore} token={this.props.store.token}/>;
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
        else {
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }

    }

    /*
    * Purpose: Returns the JSX for the NavTabs component
    */
    renderNavTabs = () => {
        if(!this.state.loading) {
            return <NavTabs store={this.props.store}/>;
        }
    }

    /*
    * Purpose: Returns the JSX for the Navbar component
    */
    renderNavBar = () => {
        if(!this.state.loading) {
            return <Navbar token={this.props.store.token}/>;
        }
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