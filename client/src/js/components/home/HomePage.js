import React, { Component } from 'react';
import { observer } from "mobx-react";

import Carpools from './carpoolPage/Carpools';
import { getFromStorage } from './../../utils/localStorage.js';
import Navbar from './../navbar/Navbar';
import NavTabs from './NavTabs';
import Routes from './routePage/Routes';
import RoutesStore from './../../stores/RoutesStore';
import Trips from './tripsPage/Trips';

import { waypointGenerator } from './../../utils/waypointGenerator';
@observer class HomePage extends Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    //========= Fetch Session Token ===========
    componentWillMount(){
        waypointGenerator();
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }  
    }

    setTab = () => {
        const { store } = this.props;

        if(!this.state.loading){
            if(store.routeTab === true)
            {
                return <Routes store={RoutesStore} token={this.props.store.token}/>;            
            }
            else if(store.carpoolTab === true)
            {
                return <Carpools/>;
            }
            else if(store.tripTab === true)
            {
                return <Trips/>;
            }
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }

    }

    renderNavTabs = () => {
        if(!this.state.loading){
            return <NavTabs store={this.props.store}/>;
        }
    }

    renderNavBar = () => {
        if(!this.state.loading){
            return <Navbar token={this.props.store.token}/>;
        }
    }

    render(){
        return(
            <div className="size-100 bg-purple">
                {this.renderNavTabs()}
                <div className="padtop-50px padbot-50px">
                    {this.setTab()}
                </div>
                {this.renderNavBar()}
            </div>
        );
    }
}

export default HomePage;