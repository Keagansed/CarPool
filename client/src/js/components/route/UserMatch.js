import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Just using temporarily for demonstration purposes
import MapComponent from '../google/GeneralMapWrapper';
import OffersStore from '../../stores/OffersStore'

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
            userName: "",
            routeArr:[],
            toggle: false,
            carpoolName:"",
            profilePic:""
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
            this.setState({ 
                userName : (json[0].firstName +" "+ json[0].lastName),
                profilePic : json[0].profilePic
            });
        });
        
        fetch('/api/system/Route/getRoute?_id=' + this.props.uRouteId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({
                carpoolName : json.data[0].routeName,
                routeArr:[...this.state.routeArr,{
                    origin : json.data[0].startLocation,
                    destination : json.data[0].endLocation
                }]
            });
        });

        fetch('/api/system/Route/getRoute?_id=' + this.props.routeId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({
                carpoolName : json.data[0].routeName,
                routeArr:[...this.state.routeArr,{
                    origin : json.data[0].startLocation,
                    destination : json.data[0].endLocation
                }]
            });
        });

    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    makeOffer = () =>{
        OffersStore.makeOffer(this.state.carpoolName, this.props.token, this.props.uRouteId, this.props.userId, this.props.store._id, false);
        this.toggle();
    }
    
    handleCarpoolNameChange(e){
        this.setState({carpoolName: e.target.value});
    }

    render(){
        const profilePicture = "./../../api/account/getImage?filename="+this.state.profilePic;
    
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
                                <div className="col-6">{this.state.userName}</div><div className="col-6 vertical-right">
                                    <Link to={"/ProfilePage/"+this.props.userId}>View Profile</Link>
                                </div>
                            </div>                           
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Route Comparison</h6>
                            </div>
                            <div className="row mbottom-10px">
                                <div className="col-12">
                                    <MapComponent routeArr={this.state.routeArr}/>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="txt-center mbottom-0">
                                        Carpool Name
                                    </h6>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-6"> 
                                    <input className="txt-center mbottom-0" type="text" onChange={this.handleCarpoolNameChange.bind(this)} value={this.state.carpoolName} />
                                </div>
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
                                <img src={profilePicture} className="mx-auto my-auto rounded-circle bord-2px-white" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12">
                                <h5>{this.state.userName}</h5>
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
                                {this.props.store.time}
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