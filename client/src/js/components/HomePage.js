import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { observer } from "mobx-react";

import { getFromStorage } from '../utils/localStorage.js'
import Navbar from './Navbar'
import NavTabs from './NavTabs'

// import bgImage from "./../../css/images/backgroundImage.png";

@observer class HomePage extends Component{

    constructor(props){
        super(props);
        //========= Properties ===========
        this.state ={
          token:'',
        }; 
    }
    //========= Fetch Session Token ===========
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            //verify token
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.setToken(token);
                    this.props.store.setLoggedIn(true);
                }
            })
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
                                <NavTabs />
                                <div className="tab-content overflow-scroll">
                                    <div className="tab-pane fade show active overflow-scroll" id="tabone" role="tabpanel">
                                        <div className="list-group bg-info overflow-scroll">
                                            <a href="" className="list-group-item list-group-item-action flex-column align-items-start text-white m-1">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">Home to Work</h5>
                                                </div>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <small className="text-white">07:00</small>
                                                    <small className="text-white">17km</small>
                                                    <small className="text-white">4 new matches</small>
                                                </div>
                                            </a>
                                            <a href="" className="list-group-item list-group-item-action flex-column align-items-start text-white m-1">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">Work to Home</h5>
                                                </div>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <small className="text-white">16:00</small>
                                                    <small className="text-white">17km</small>
                                                    <small className="text-white">1 new match</small>
                                                </div>
                                            </a>                                          
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                                    <p className="">Tab pane two. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    <div className="tab-pane fade" id="tabthree" role="tabpanel">
                                    <p className="">Tab pane three. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
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