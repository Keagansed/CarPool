import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import React, { Component } from 'react';

import VouchAverage from "../vouching/VouchAverage";

@observer class ProfileHeader  extends Component {

    getFName = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.firstName;
    }

    getLName = () =>
    {
        if(this.props.store.profileFound)
        {
            return this.props.store.lastName;
        }
        else
        {
            return "."
        }
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

    getVouchAverage = () =>
    {
        if(this.props.store.profileFound)
        {
            const vouchPath = "/vouching/" + this.getToken();

            return <Link to={vouchPath}> <VouchAverage _id={this.getToken()}/></Link>
        }
        else{
            return <b className="opacity-0 m-0">0</b>
        }
    }

    render(){

        

        return(

            <div className="col-md-12 col-12 profileHeader">
                <div className="row w-100 m-0 h-100 py-3">

                    <div className="m-0 p-0 col-md-12" id="colHeaderImage">
                        <img src={this.getProfilePic()} id="profilePic" className="d-block mx-auto rounded-circle border-white profilePic" height="120" width="120" alt="" />
                    </div>

                    <div className="p-0 col-md-12">
                        <h5 className={"text-white text-center m-0 p-1 " + this.props.store.opacity} id="headName">
                            <b>{this.getFName()} {this.getLName()}</b>
                        </h5>
                    </div>

                    <div className="py-2 col-md-12">
                        <div className="row">

                            <div className="col-4">
                                <div className="row">
                                    <div className="col-12 text-center py-0">
                                        <p className="text-primary m-0 text-center font-weight-normal" id="pRatingAvg">
                                            {this.getVouchAverage()}
                                        </p>
                                    </div>
                                    <div className="col-12 py-0">
                                        <p className="text-white text-center m-0 font-weight-medium" id="pRatingLabel">Ratings</p>
                                    </div>
                                </div>
                            </div>

                            <div className="thin-border-sides col-4 col-md-4">
                                <p className="text-primary text-center m-0  font-weight-normal" id="pNumTrips">
                                    <font color="#140d4f" className="text-primary">0</font>
                                </p>
                                <p className="text-white text-center m-0 font-weight-medium" id="pNumTripsLabel">Trips</p>
                            </div>

                            <div className="col-4 col-md-4">
                                <p className="text-primary text-center m-0  font-weight-normal" id="pTrust">
                                    <font color="#140d4f" className="text-primary">{this.getSecLvl()}/5</font>
                                </p>
                                <p className="text-white text-center m-0 font-weight-medium" id="pTrustLabel">Trust</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;