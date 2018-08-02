// File Type: Component

import React, { Component } from 'react';

import MapComponent from '../google/GeneralMapWrapper';
import OffersStore from '../../stores/OffersStore'

//Just using temporarily for demonstration purposes - remove when not needed anymore
import tempGroupPic from '../../../css/images/profile_default.png';

//'display' is used to show the modal
const display = {
    display: 'block'
};
//'hide' is used to hide the modal
const hide = {
    display: 'none'
};

/*
* The purpose of this CarpoolMatch class is to provide a component representitive of a
* carpool match on a route's page. When clicked on, a modal should be displayed which
* gives users the option to request to join the carpool.
*/
class CarpoolMatch  extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            //'toggle' represents the state of the modal - false indicates it is not being shown.
            toggle: false,
            //carpoolMembers is used to store the members of any carpool match temporarily when accessed
            carpoolMembers:[],
            //routeArr is used to store the routes of any carpool match temporarily when accessed
            routeArr:[]
        }
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentWillMount() {
        fetch(
            '/api/system/Route/getRoute?_id=' + this.props.uRouteId, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json'
                },
            }
        )
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
            fetch('/api/system/Route/getRoute?_id=' + routeId, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                this.setState( {
                    routeArr:[...this.state.routeArr, {
                        origin : json.data[0].startLocation,
                        destination : json.data[0].endLocation
                    }]
                });

                fetch('/api/account/profile?_id=' + json.data[0].userId,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(json => {
                    let memberComponent = (
                        <div 
                            className="row bordbot-1px-dash-grey" 
                            key={Math.random()}
                        >
                            <div className="col-6">
                                {json[0].firstName+' '+json[0].lastName}
                            </div>
                            <div className="col-6 vertical-right">
                                <a href={"/ProfilePage/"+json[0]._id}>View Profile</a>
                            </div>
                        </div>
                    )
                    this.setState({ 
                        carpoolMembers : [...this.state.carpoolMembers,memberComponent]
                    });
                });

            });
        });

        
    }

    /*
    * The purpose of the toggle method is to switch the modal between being active and inactive.
    */
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
    * The purpose of the makeOffer method is to send an offer to another user to join in a carpool.
    */
    makeOffer() {
        fetch('/api/system/route/getRoute?_id=' + this.props.routeArr[0], {
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

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        var modal = [];
        // Push the content of the modal to the array
        modal.push(
            // Modal
            <div 
                key="0" 
                className="modal" 
                tabIndex="-1" 
                role="dialog" 
                id="myModal" 
                style={this.state.toggle ? display : hide}
            >
                <div 
                    className="modal-dialog" 
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Request to Join Carpool</h5>
                            <button 
                                type="button" 
                                className="close" 
                                onClick={this.toggle} 
                                aria-label="Close"
                            >
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
                                <button 
                                    onClick={this.makeOffer.bind(this)} 
                                    type="submit" 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" 
                                    id="btnNewRoute"
                                >
                                    Send Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        //Return the CarpoolMatch
        return(
            <div>
                <div 
                    className="container-fluid bg-purple bordbot-2px-white" 
                    onClick={this.toggle}
                >
                    <div className="row txt-white padver-10px">
                        <div className="col-2">
                                <img 
                                    src={tempGroupPic} 
                                    className="mx-auto my-auto rounded-circle bord-2px-white bg-lightgrey" 
                                    height="60" 
                                    width="60" 
                                    alt="s" 
                                />
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
                                <h5>
                                    <i className="fa fa-handshake-o"></i>
                                </h5>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal to display/hide when the match is clicked on */}
                {modal}
            </div>
        );
    }
}

export default CarpoolMatch;