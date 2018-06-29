import React, { Component } from 'react';
import { observer } from "mobx-react";

import UserMatch from './UserMatch';
import CarpoolMatch from './CarpoolMatch';

@observer class Matches extends Component{
    constructor(){
        super()

        this.state = {
            userID: '',
            carpoolID: ''
        }
    }

    handleUserIDChange(e){
        this.setState({userID: e.target.value})
    }

    handleCarpoolIDChange(e){
        this.setState({carpoolID: e.target.value})
    }

    render(){
        // const { token } = this.props.store;
        
        return(
            <div>
                {/* dummy static matches */}
                <UserMatch />
                <CarpoolMatch/>

                {/* TEMPORARY >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <button id="addUserMatch" className="btn btn-primary margin-top" type="submit" data-toggle="modal" data-target="#userMatchModal">New User Match</button>
                <div className="modal fade" id="userMatchModal">
                    <div className="modal-dialog">
                        <div className="modal-content bubble-more-visible">
                            <form id="userMatchSubmit">
                                <div className="form-group">
                                    <label htmlFor="userID">User ID</label>
                                    <input type="text" className="form-control" id="userID" onChange={this.handleUserIDChange.bind(this)} />
                                </div>
                                <button className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                <button id="addCarpoolMatch" className="btn btn-primary margin-top" type="submit" data-toggle="modal" data-target="#carpoolMatchModal">New Carpool Match</button>
                <div className="modal fade" id="carpoolMatchModal">
                    <div className="modal-dialog">
                        <div className="modal-content bubble-more-visible">
                            <form id="carpoolMatchSubmit">
                                <div className="form-group">
                                    <label htmlFor="userID">Carpool ID</label>
                                    <input type="text" className="form-control" id="userID" onChange={this.handleCarpoolIDChange.bind(this)} />
                                </div>
                                <button className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* TEMPORARY <<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
            </div>
        );
    }
}

export default Matches;