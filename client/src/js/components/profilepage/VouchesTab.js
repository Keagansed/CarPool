import { observer } from "mobx-react";
import React, { Component } from 'react';

import starFilled  from "./../../../css/images/star-filled.png";
import starEmpty from "./../../../css/images/star-empty.png";
import infoIcon from "./../../../css/images/info-icon.png";

@observer class VouchesTab  extends Component 
{

    getFName = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.firstName;
    }

    getLName = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.lastName;
    }

    getSecLvl = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.secLvl;
    }

    getProfilePic = () =>
    {
        if(this.props.store.profileFound)
            return "../api/account/getImage?filename=" + this.props.store.profilePic;
    }

    getToken = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.token;
    }

    render(){

        return(
            <div className="tab-pane show active" id="tabtwo" role="tabpanel">
                <div className="list-group bg-info">
                    <a className="list-group-item list-group-item-action flex-column align-items-start bg-info text-white m-0 py-1">
                        <div className="row p-0">
                            <div className="col-3 col-md-3 text-center p-0">
                                <img className="d-block rounded-circle border-secondary mx-auto" src={this.getProfilePic()} id="imgProfilePic" width="80" height="80" alt =""/> 
                            </div>
                            <div className="col-6 col-md-6 px-2">
                                <div className="row">
                                    <div className="col-md-12 col-12 p-0">
                                        <img className="d-block img-fluid d-inline-flex" src={starFilled} width="20" height="20" alt="star"/>
                                        <img className="d-block img-fluid d-inline-flex mx-1" src={starFilled} width="20" height="20" alt="star"/>
                                        <img className="d-block img-fluid d-inline-flex" src={starFilled} width="20" height="20" alt="star"/>
                                        <img className="d-block img-fluid d-inline-flex mx-1" src={starFilled} width="20" height="20" alt="star"/>
                                        <img className="d-block img-fluid d-inline-flex" src={starEmpty} width="20" height="20" alt="star"/> 
                                    </div>
                                    <div className="col-md-12 col-12 p-0">
                                        <p className="text-secondary m-0">
                                            <b>Peter Parker</b>
                                        </p>
                                    </div>
                                    <div className="col-md-12 col-12 p-0">
                                        <p className="m-0 text-10 text-secondary">10/05/2018</p>
                                    </div>
                                    <div className="col-md-12 col-12 p-0">
                                        <p className="m-0 text-10 text-secondary">Pleasant company, he kept me entertained </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mr-auto col-3 col-md-3">
                                <img className="d-block rounded-circle p-1 my-3 float-right" src={infoIcon} width="50" height="50" alt="profile"/> 
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default VouchesTab;