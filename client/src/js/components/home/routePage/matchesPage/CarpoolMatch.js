import React, { Component } from 'react';
import MapComponent from './../../GeneralMapWrapper';

//Just using temporarily for demonstration purposes
import tempGroupPic from './../../../../../css/images/group_default.png';
import OffersStore from './../../../../stores/OffersStore'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class CarpoolMatch  extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            carpoolMembers:[],
            routeArr:[]
        }
    }

    componentWillMount(){
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

        this.props.routeArr.forEach(routeId => {
            fetch('/api/system/Route/getRoute?_id=' + routeId,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                this.setState({
                    routeArr:[...this.state.routeArr,{
                        origin : json.data[0].startLocation,
                        destination : json.data[0].endLocation
                    }]
                });

                fetch('/api/account/getProfile?_id=' + json.data[0].userId,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(json => {
                    let memberComponent = 
                    (<div className="row bordbot-1px-dash-grey" key={Math.random()}>
                        <div className="col-6">{json[0].firstName+' '+json[0].lastName}</div><div className="col-6 vertical-right"><a href={"/ProfilePage/"+json[0]._id}>View Profile</a></div>
                    </div>)
                    this.setState({ 
                        carpoolMembers : [...this.state.carpoolMembers,memberComponent]
                    });
                });

            });
        });

        
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    makeOffer(){
        fetch('/api/system/route/getRoute?_id=' + this.props.routeArr[0],{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success) {
                OffersStore.makeOffer(this.state.carpoolName, this.props.token, this.props.uRouteId, json.data[0].userId, this.props.carpoolId, true);
                this.toggle();
            }else{
                console.log("error: "+ json.message);
            }
        });
    }

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Request to Join Carpool</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Other Carpool Members</h6>
                            </div>
                                {this.state.carpoolMembers}
                            <div className="row mtop-10px">
                                <h6 className="fw-bold mx-auto">Route Comparison</h6>
                            </div>
                            <div className="row mbottom-10px">
                                <div className="col-12">
                                    <MapComponent routeArr={this.state.routeArr}/>
                                </div>                                
                            </div>
                            <div className="row">
                                <button onClick={this.makeOffer.bind(this)} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNewRoute">
                                    Send Request
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
                                <img src={tempGroupPic} className="mx-auto my-auto rounded-circle bord-2px-white bg-lightgrey" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12">
                                <h5>{"Carpool: "+this.props.carpoolName}</h5>
                            </div>
                            <div className="col-12">
                                1.5km Further
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

export default CarpoolMatch;