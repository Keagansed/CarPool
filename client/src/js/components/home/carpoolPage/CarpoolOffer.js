import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class CarpoolOffer  extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            sender: [],
            deleted: false
        }
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    componentDidMount(){
        fetch('/api/account/getProfile?_id=' + this.props.store.senderId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({sender : json[0]});
        })
    }
    
    renderOtherMembers(){
        let temp = [];
        if (this.props.store.join){
            temp.push(
                <div className="row bordbot-1px-dash-grey">
                    <h6 className="fw-bold mx-auto">Other Carpool Members</h6>
                </div>
            );
            temp.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6">this is an existing carpool</div>
                    <div className="col-6 vertical-right">
                        <Link to={"/ProfilePage/" + this.props.store.recieverId}>View Profile</Link>
                    </div>
                </div>
            );
        }
        else
            temp.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6">This is an invite to create a new carpool</div>
                </div>
            );
        return(temp);
    }

    getCarpoolSize(){
        if (this.props.store.join)
            return 5;
        else
            return 1;
    }

    handleAcceptInvite(){
        fetch('/api/system/offers/acceptInvite?offerId=' + this.props.offerId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            console.log(json);
        });
        this.setState({deleted: true});
        this.toggle();
    }

    handleDeclineInvite(){
        fetch('/api/system/offers/declineInvite?offerId=' + this.props.offerId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            console.log(json);
        });
        this.setState({deleted: true});
        this.toggle();
    }

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.props.store.CarpoolName}</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Offer Sent By</h6>
                            </div>
                            <div className="row bordbot-1px-dash-grey mbottom-10px" key={Math.random()}>
                                <div className="col-6">{this.state.sender.firstName +" "+ this.state.sender.lastName}</div>
                                <div className="col-6 vertical-right">
                                    <Link to={"/ProfilePage/" + this.props.store.senderId}>View Profile</Link>
                                </div>
                            </div>                           
                            {this.renderOtherMembers()}
                            <div className="row mtop-10px ">
                                <button onClick={this.handleAcceptInvite.bind(this)} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-green txt-white fw-bold">
                                    Accept
                                </button>
                                <button onClick={this.handleDeclineInvite.bind(this)} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-red txt-white fw-bold">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (this.state.deleted)
            return(<div></div>);
        else{
            return(
                <div>
                    <div className="container-fluid bg-purple bordbot-2px-white" onClick={this.toggle}>
                        <div className="row txt-white padver-10px">
                            <div className="col-9">
                                <div className="col-12">
                                    <h5>{this.props.store.CarpoolName}</h5>
                                </div>
                                <div className="col-12">
                                    {this.getCarpoolSize()} Members
                                </div>
                            </div>
                            <div className="col-3 vertical-right">
                                <div className="col-12">
                                    <h5><i className="fa fa-info-circle"></i></h5>
                                </div>
                                <div className="col-12">
                                    {/* Empty for now */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {modal}
                </div>
            );
        }
    }
}

export default CarpoolOffer;