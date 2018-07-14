import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from './../../../../../css/images/profile_default.png';
import OffersStore from './../../../../stores/OffersStore'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class UserMatch  extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            user: {},
            toggle: false,
            carpoolName:""
        }
    }

    componentDidMount(){
        fetch('/api/account/getProfile?_id=' + this.props.userId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({user : json[0]});
        });
        
        fetch('/api/system/route/getRoute?_id=' + this.props.uRouteId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({carpoolName : json.data[0].routeName});
        });
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    makeOffer = () =>{
        OffersStore.makeOffer(this.state.carpoolName, this.props.token, this.props.uRouteId, this.props.userId, this.props.uRouteId, false);
        this.toggle();
    }
    
    handleCarpoolNameChange(e){
        this.setState({carpoolName: e.target.value});
    }

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Offer to Carpool</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Offer Recipient</h6>
                            </div>
                            <div className="row bordbot-1px-dash-grey mbottom-10px" key={Math.random()}>
                                <div className="col-6">{this.state.user['firstName'] + ' ' + this.state.user['lastName']}</div><div className="col-6 vertical-right">View Profile</div>
                            </div>                           
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Route Comparison</h6>
                            </div>
                            <div className="row mbottom-10px">
                                <div className="col-12">
                                    <p className="txt-center mbottom-0">
                                        ***Map to go here***
                                    </p>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="txt-center mbottom-0">
                                        Carpool Name
                                    </h6>
                                </div>     
                                <input type="text" onChange={this.handleCarpoolNameChange.bind(this)} value={this.state.carpoolName} />
                            </div>
                            <div className="row">
                                <button type="submit" onClick={this.makeOffer} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNewRoute">
                                    Make Offer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                <div className="container-fluid bg-purple bordbot-2px-white" onClick={this.toggle}>
                    <div className="row txt-white padver-10px">
                        <div className="col-2">
                                <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-white" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12">
                                <h5>{this.state.user['firstName']}</h5>
                            </div>
                            <div className="col-12">
                                1.2km Further
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-handshake-o"></i></h5>
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

export default UserMatch;