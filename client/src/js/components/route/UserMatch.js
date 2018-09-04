// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Just using temporarily for demonstration purposes
import MapComponent from '../google/GeneralMapWrapper';
import OffersStore from '../../stores/OffersStore';
import RouteStore from './../../stores/RouteStore';


//'display' is used to show the modal
const display = {
    display: 'block'
};
//'hide' is used to hide the modal
const hide = {
    display: 'none'
};

/*
* The purpose of this UserMatch class is to provide a component representitive of a
* route match on a route's page. When clicked on, a modal should be displayed which
* gives users the option to send a carpool offer to the user who created the matching route.
*/
@observer class UserMatch  extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
  
        this.state = {
            token: '',
            //'toggle' represents the state of the modal - false indicates it is not being shown.
            toggle: false
        }

        this.routeArr = [];

        //Create instance of store for component
        this.routeStore1 = new RouteStore(); 
        this.routeStore2 = new RouteStore(); 

        this.carpoolName= "";
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place after the component is rendered on the screen.
    */
    componentDidMount(){
        // this.routeStore1.getProfile(this.props.token, this.props.userId);

        this.routeStore1.getRoute(this.props.token, this.props.uRouteId);
        this.routeStore2.getRoute(this.props.token, this.props.routeId);

    }

    
    /*
    * The purpose of the toggle method is to switch the modal between being active and inactive.
    */
    toggle = (event) => {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
    * The purpose of the makeOffer method is to send an offer to another user to join in a carpool.
    */
    makeOffer = () => {
        OffersStore.makeOffer(
            this.carpoolName, 
            this.props.token, 
            this.props.uRouteId, 
            this.props.userId, 
            this.props.store._id, 
            false
        );
        this.toggle();
    }
    
    /*
    * The purpose of the handleCarpoolNameChange method is change the carpool name of the new
    * carpool for which an offer is being made. This name is stored in the carpoolName field.
    */
    handleCarpoolNameChange = (e) => {
        this.carpoolName =  e.target.value;
    }

    genRouteArr = () => {
        this.routeArr = [];

        const routeObj1 = {
            origin: this.routeStore1.routeObj.startLocation,
            destination: this.routeStore1.routeObj.endLocation
        };
        const routeObj2 = {
            origin: this.routeStore2.routeObj.startLocation,
            destination: this.routeStore2.routeObj.endLocation
        };

        this.routeArr.push(routeObj1,routeObj2);
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        // profilePicture stores the exact path of the matched user's profile picture 
        // let profilePicture = "default.jpg";
        let profilePicture, userFullName;
        // console.log(this.props.userObj);
        if(
            typeof(this.props.userObj) !== "undefined" && 
            typeof(this.props.userObj.firstName) !== "undefined" && 
            typeof(this.props.userObj.lastName) !== "undefined"
        ){
            profilePicture = "./../../api/account/getImage?filename="+this.props.userObj.profilePic;
            userFullName  = this.props.userObj.firstName + " "+this.props.userObj.lastName;
        }
    
        if(typeof(this.routeStore1.routeObj.routeName) !== "undefined"){
            this.carpoolName = this.routeStore1.routeObj.routeName;
            
            this.genRouteArr();
            
        }

        var modal = [];
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
                            <h5 className="modal-title fw-bold">Offer to Carpool</h5>
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
                                <h6 className="fw-bold mx-auto">Offer Recipient</h6>
                            </div>
                            <div 
                                className="row bordbot-1px-dash-grey mbottom-10px" 
                                key={Math.random()}
                            >
                                <div className="col-6">
                                    { userFullName }
                                </div>
                                <div className="col-6 vertical-right">
                                    <Link to={"/ProfilePage/"+this.props.userId}>View Profile</Link>
                                </div>
                            </div>                           
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Route Comparison</h6>
                            </div>
                            <div className="row mbottom-10px">
                                <div className="col-12">
                                    <MapComponent routeArr={this.routeArr}/>
                                </div>                                
                            </div>
                            <div className="row">
                                <input 
                                    type="text" 
                                    onChange={this.handleCarpoolNameChange}
                                    className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput"
                                    placeholder="Carpool Name"
                                />
                            </div>
                            <div className="row">
                                <button 
                                    type="submit" 
                                    onClick={this.makeOffer} 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" 
                                    id="btnNewRoute"
                                >
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
                <div 
                    className="container-fluid bg-purple bordbot-2px-white" 
                    onClick={this.toggle}
                >
                    <div className="row txt-white padver-10px">
                        <div className="col-2">
                                <img 
                                    src={profilePicture} 
                                    className="mx-auto my-auto rounded-circle bord-2px-white" 
                                    height="60" 
                                    width="60" 
                                    alt="s" 
                                />
                        </div>
                        <div className="col-7">
                            <div className="col-12">
                                <h5>{ userFullName }</h5>
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