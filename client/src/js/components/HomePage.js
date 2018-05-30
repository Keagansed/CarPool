import React, { Component } from 'react';
import { observer } from "mobx-react";

import Carpools from './homepage/carpoolPage/Carpools'
import { getFromStorage } from '../utils/localStorage.js';
import Navbar from './Navbar'
import NavTabs from './homepage/NavTabs'
import Routes from './homepage/routePage/Routes'
import RoutesStore from '../stores/RoutesStore'
import Trips from './homepage/tripsPage/Trips'

@observer class HomePage extends Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    //========= Fetch Session Token ===========
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token)
        {
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

        if(!this.state.loading)
        {
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
        else
        {
            return(
                <div>
					<div className="spinner">
						<div className="double-bounce1"></div>
						<div className="double-bounce2"></div>
					</div>
				</div>
            )
        }

    }

    render(){
        const { token } = this.props.store;
        
        return(
            <div className="HomePage">
                <div className="p-0 page-content">
                    <div className="container-fluid m-0">
                        <div className="row">
                            <div className="col-md-12 p-0">
                                <NavTabs store={this.props.store} token={token}/>
                                <div className="tab-content">
                                    <div className="tab-pane show active">
                                        {this.setTab()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Navbar/>
            
            </div>
        );
    }
}

export default HomePage;