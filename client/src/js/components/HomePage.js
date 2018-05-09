import React, { Component } from 'react';
import { observer } from "mobx-react";

import { getFromStorage } from '../utils/localStorage.js'
import Carpools from './homepage/carpoolPage/Carpools'
import Navbar from './Navbar'
import NavTabs from './homepage/NavTabs'
import Routes from './homepage/routePage/Routes'
import Trips from './homepage/tripsPage/Trips'

@observer class HomePage extends Component{

    //========= Fetch Session Token ===========
    componentWillMount(){
        
        const { token } = this.props.location;

        fetch('/api/account/verify?token='+token)
        .then(res => res.json())
        .then(json => {
            if(json.success){
                this.props.store.setToken(token);
                this.props.store.setLoggedIn(true);
            }
        })
        
    }

    render(){
        const { token } = this.props.location;

        return(
            <div className="HomePage">
                <div className="p-0 page-content">
                    <div className="container-fluid m-0">
                        <div className="row">
                            <div className="col-md-12 p-0">
                                <NavTabs store={this.props.store}/>
                                <div className="tab-content">
                                    
                                    <Routes/>

                                    <Carpools />

                                    <Trips />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Navbar token={token}/>
            
            </div>
        );
    }
}

export default HomePage;