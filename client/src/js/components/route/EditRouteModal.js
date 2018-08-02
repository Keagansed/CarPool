// File Type: Component

import React, { Component } from 'react';

// import WeekdaySelector from './WeekdaySelector';

//'display' is used to show the modal
const display = {
    display: 'block'
};
//'hide' is used to hide the modal
const hide = {
    display: 'none'
};

/*
* The purpose of this CarpoolMatch class is to provide a component that will be displayed on
* route pages to allow users to edit a route. The component should expand an editRoute modal 
* when clicked on.
*/
class EditRouteModal extends Component{
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state ={
            //'toggle' represents the state of the modal - false indicates it is not being shown.
            toggle: false,
            //'routeObj' represents the route for which details are being changed.
            routeObj: {}
        };
    }

    /*
    * The purpose of the componentDidMount method is to perform all programming tasks
    * that need to take place after the component is rendered on the screen.
    */
    componentDidMount(){
        fetch('/api/account/profile/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
        
        fetch('/api/system/route/getRoute?_id=' + this.props.routeId, {
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({routeObj : json.data[0]});
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
    render(){
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
                            <h5 className="modal-title fw-bold">Edit Route</h5>
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
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route Name</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input 
                                        type="text" 
                                        className="col-11 form-control mx-auto brad-2rem" 
                                        placeholder={this.state.routeObj.routeName} 
                                        required="required" 
                                        name="routeName" 
                                        id="inputRouteName"
                                    /> 
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Time and Date</h6>
                                </div>
                                <div className="row padbot-10px">
                                    {/* Default values should be current details of trip */}
                                    <input 
                                        type="time" 
                                        className="col-4 form-control mx-auto brad-2rem" 
                                        placeholder={"Time"} 
                                        required="required" 
                                        name="Time" 
                                        id="inputRouteTime" 
                                        defaultValue={this.state.routeObj.time}
                                    /> 
                                    {/* <input type="date" className="col-6 form-control mx-auto brad-2rem" placeholder="Date" required="required" name="Date" id="inputRouteDate" defaultValue="2018-06-20"/> */}
                                </div>
                                {/* <div className="row">
                                    <h6 className="fw-bold mx-auto">Repeat Weekly</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <div className="mx-auto">
                                        <WeekdaySelector/>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Start and End Locations</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input 
                                        type="text" 
                                        className="col-11 form-control mx-auto brad-2rem" 
                                        placeholder="2 Jagluiperd Street, The Wilds, Pretoria, South Africa" 
                                        required="required" 
                                        name="StartLocation" 
                                        id="inputRouteStart"
                                    /> 
                                </div>
                                <div className="row padbot-10px">
                                    <input 
                                        type="text" 
                                        className="col-11 form-control mx-auto brad-2rem" 
                                        placeholder="1195 South Street, Hatfield, Pretoria, South Africa" 
                                        required="required" 
                                        name="EndLocation" 
                                        id="inputRouteEnd"
                                    /> 
                                </div>
                                <div className="row">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" 
                                        id="btnNewRoute"
                                    >
                                        Confirm Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="col-2 txt-center">
                <button 
                    className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px"  
                    onClick={this.toggle}
                >
                    <i className="fa fa-wrench"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default EditRouteModal;