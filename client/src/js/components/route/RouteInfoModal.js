// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import MapComponent from '../google/GeneralMapWrapper';
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
* The purpose of this RouteInfoModal class is to provide a component that allows a user
* to view the info of a route. The component consists of an info sign which opens a the 
* route information modal when clicked on.
*/
@observer class RouteInfoModal extends Component{
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);

        this.state = {
            //toggle is used to show/hide the modal
            toggle: false
        };

        this.routeStore1 = new RouteStore(); 
        this.routeArr = [];
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentWillMount() {
        //Get own route 
        this.routeStore1.getRoute(this.props.token, this.props.routeId);
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
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        let originName, destinationName;

        if(typeof(this.routeStore1.routeObj.routeName) !== "undefined"){
            originName = this.routeStore1.routeObj.startLocation.name;
            destinationName = this.routeStore1.routeObj.endLocation.name;

            this.routeArr = [...this.routeArr, {
                origin: this.routeStore1.routeObj.startLocation,
                destination: this.routeStore1.routeObj.endLocation
            }];
        }

        var modal = [];
        modal.push(
            // Modal
            <div 
                key={Math.random()} 
                className="modal" 
                tabIndex="-1" 
                role="dialog" 
                id="carpoolInfoModal" 
                style={this.state.toggle ? display : hide}
            >
                <div 
                    className="modal-dialog" 
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">
                                {this.routeStore1.routeObj.routeName}
                            </h5>
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
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Time and Date</h6>
                            </div>
                            <div className="row padbot-10px">
                                <div className="col-12">
                                    <p className="txt-center mbottom-0">
                                        30 June 2018 @ {this.routeStore1.routeObj.time}
                                    </p>
                                </div>                                
                            </div>
                            {/*<div className="row">*/}
                                {/*<h6 className="fw-bold mx-auto">Repeats</h6>*/}
                            {/*</div>*/}
                            {/*<div className="row padbot-10px">*/}
                                {/*<div className="col-12">*/}
                                    {/*<p className="txt-center mbottom-0">*/}
                                        {/*Mon Tue Wed Thu Fri*/}
                                    {/*</p>*/}
                                {/*</div>                                */}
                            {/*</div>*/}
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Route</h6>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="txt-center mbottom-0">
                                        <p>{ originName }</p>
                                        <p>To</p>
                                        <p>{ destinationName }</p>
                                    </div>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <MapComponent routeArr={this.routeArr}/>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="col-8 txt-center">
                <button 
                    className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" 
                    onClick={this.toggle}
                >
                    {this.routeStore1.routeObj.routeName}
                </button>
                {modal}
            </div>
        );
    }
}

export default RouteInfoModal;