import React, { Component } from 'react';

// import WeekdaySelector from './WeekdaySelector';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class EditRouteModal extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state ={
            toggle: false,
            routeObj: {}
        };
    }

    componentDidMount(){
        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
        
        fetch('/api/system/route/getRoute?_id=' + this.props.routeId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            this.setState({routeObj : json.data[0]});
        });
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Edit Route</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route Name</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <input type="text" className="col-11 form-control mx-auto brad-2rem" placeholder={this.state.routeObj.routeName} required="required" name="routeName" id="inputRouteName"/> 
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Time and Date</h6>
                                </div>
                                <div className="row padbot-10px">
                                    {/* Default values should be current details of trip */}
                                    <input type="time" className="col-4 form-control mx-auto brad-2rem" placeholder={"Time"} required="required" name="Time" id="inputRouteTime" defaultValue={this.state.routeObj.time}/> 
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
                                    <input type="text" className="col-11 form-control mx-auto brad-2rem" placeholder="2 Jagluiperd Street, The Wilds, Pretoria, South Africa" required="required" name="StartLocation" id="inputRouteStart"/> 
                                </div>
                                <div className="row padbot-10px">
                                    <input type="text" className="col-11 form-control mx-auto brad-2rem" placeholder="1195 South Street, Hatfield, Pretoria, South Africa" required="required" name="EndLocation" id="inputRouteEnd"/> 
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNewRoute">
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
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px"  onClick={this.toggle}>
                    <i className="fa fa-wrench"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default EditRouteModal;