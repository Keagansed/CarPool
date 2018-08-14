// File Type: Component

import React, { Component } from 'react';

import MapComponent from '../google/GeneralMapWrapper';

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
class RouteInfoModal extends Component{
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            routeId: this.props.routeId,
            //the route field store the current route object
            route:{},
            //the originName field stores the current routes origin
            originName:"",
            //the destinationName field stores the current routes destination
            destinationName:"",
            //the routeArr field
            routeArr:[],
            //toggle is used to show/hide the modal
            toggle: false
        };
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentWillMount() {

        //Get current route and compare with OtherRoutes
        fetch('/api/system/Route/getRoute?routeId='+ this.state.routeId + '&token=' + this.props.token, { 
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success) {
                this.setState({
                    route:json.data[0],
                    originName:json.data[0].startLocation.name,
                    destinationName:json.data[0].endLocation.name,
                    routeArr:[{
                        origin : json.data[0].startLocation,
                        destination : json.data[0].endLocation
                    }]

                });
            }else{
                console.log(json.message);
            }
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
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
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
                                {this.state.route.routeName}
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
                                        30 June 2018 @ {this.state.route.time}
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
                                        <p>{this.state.originName}</p>
                                        <p>To</p>
                                        <p>{this.state.destinationName}</p>
                                    </div>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <MapComponent routeArr={this.state.routeArr}/>
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
                    {this.state.route.routeName}
                </button>
                {modal}
            </div>
        );
    }
}

export default RouteInfoModal;