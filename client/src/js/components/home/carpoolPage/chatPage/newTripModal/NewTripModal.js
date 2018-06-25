import React, { Component } from 'react';
import {observer} from 'mobx-react';

import WeekdaySelector from './WeekdaySelector';

@observer
class NewTripModal extends Component{
    constructor(props){
        super(props);

        this.state ={user:[]};
    }

    componentDidMount(){
        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
    }

    getUsername(_id)
    {
        for (var x in this.state.user)
        {
            if(this.state.user[x]._id === _id)
            {
                return this.state.user[x].firstName;
            }
        }

    }

    render(){
        let users = [];

        for(let user in this.props.users)
        {
            users.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6">{this.getUsername(user)}</div><div className="col-6 vertical-right"><a href={"/ProfilePage/"+user}>View Profile</a></div>
                </div>
            );
        }
        return(
            // Modal
            <div className="modal" tabIndex="-1" role="dialog" id="newTripModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Suggest a Trip</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Time and Date</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input type="time" className="col-5 form-control mx-auto brad-2rem" placeholder="Time" required="required" name="Time" id="inputTripTime"/> 
                                    <input type="date" className="col-5 form-control mx-auto brad-2rem" placeholder="Date" required="required" name="Date" id="inputTripDate"/>
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Repeat Weekly</h6>
                                </div>
                                <div className="row">
                                    <div className="mx-auto">
                                        <WeekdaySelector/>
                                    </div>
                                </div>
                                <div className="row bordbot-1px-dash-grey">
                                    <h6 className="fw-bold mx-auto">Participants</h6>
                                </div>
                                {users}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTripModal;