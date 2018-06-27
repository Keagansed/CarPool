import React, { Component } from 'react';

class CarpoolInfoModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            user:[],
        };
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

        return (
            <div className="mx-auto">
                <div key="0" className="modal" tabIndex="-1" role="dialog" id="carpoolInfoModal" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-aqua">
                                <h5 className="modal-title fw-bold">{this.props.carpoolName}</h5>
                                <button type="button" className="close" data-toggle="modal" data-target="#carpoolInfoModal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row bordbot-1px-dash-grey">
                                    <h6 className="fw-bold mx-auto">Carpool Members</h6>
                                </div>
                                {users}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarpoolInfoModal;