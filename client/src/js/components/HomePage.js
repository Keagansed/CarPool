import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { observer } from "mobx-react";


import { getFromStorage } from '../utils/localStorage.js'

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
                <div className="p-0">
                    <div className="container-fluid m-0">
                        <div className="row">
                            <div className="col-md-12 p-0">
                                <ul className="nav nav-tabs bg-primary">
                                    <li className="nav-item w-30 bg-info text-center px-0">
                                    <a href="" className="nav-link active bg-info" data-toggle="tab" data-target="#tabone">
                                        <b>
                                        <b>Routes</b>
                                        </b>
                                    </a>
                                    </li>
                                    <li className="nav-item w-30 text-center bg-info">
                                    <a className="nav-link bg-info" data-target="#tabtwo" data-toggle="tab" href="">
                                        <b>
                                        <b>Carpools</b>
                                        </b>
                                    </a>
                                    </li>
                                    <li className="nav-item w-30 text-center bg-info">
                                    <a className="nav-link bg-info" href="" data-target="#tabthree" data-toggle="tab">
                                        <b>
                                        <b>Trips</b>
                                        </b>
                                    </a>
                                    </li>
                                    <li className="nav-item w-10 bg-info text-center">
                                    <a className="nav-link bg-info" href="">
                                        <i className="fa fa-plus fa-lg fa-fw d-inline"></i>&nbsp;</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                                    <div className="list-group bg-info">
                                        <a href="" className="list-group-item list-group-item-action flex-column align-items-start bg-info text-white">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Home to Work</h5>
                                            </div>
                                            <div className="d-flex w-100 justify-content-between">
                                                <small className="text-white">07:00</small>
                                                <small className="text-white">17km</small>
                                                <small className="text-white">4 new matches</small>
                                            </div>
                                        </a>
                                        <a href="" className="list-group-item list-group-item-action flex-column align-items-start bg-info text-white">
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
                <div className="">
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="nav nav-pills navbarBottom text-center">
                                    <li className="nav-item ml-auto w-25">
                                        <Link to={`/`} className="nav-link no-hover">
                                            <i className="fa fa-cog fa-2x text-secondary d-inline"></i>&nbsp;
                                        </Link>
                                    </li>
                                    <li className="nav-item w-25">
                                        <Link to={`/`} className="nav-link no-hover" >
                                            <i className="fa fa-fw fa-car fa-2x d-inline text-secondary"></i>
                                        </Link>
                                    </li>
                                    <li className="nav-item mr-auto text-secondary w-25">
                                    <Link to={{
                                            pathname: "/ProfilePage/" + token,
                                            state: { token: token }
                                        }} className="nav-link no-hover"
                                    >
                                        <i className="fa fa-fw fa-2x fa-user d-inline text-secondary"></i>
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;