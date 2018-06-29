import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class RouteInfoModal extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state ={
            toggle: false
        };
    }

    componentDidMount(){
        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
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
            <div key={Math.random()} className="modal" tabIndex="-1" role="dialog" id="carpoolInfoModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Home to Work</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
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
                                            30 June 2018 @ 08:00
                                        </p>
                                    </div>                                
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Repeats</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            Mon Tue Wed Thu Fri
                                        </p>
                                    </div>                                
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route</h6>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            2 Jagluiperd Street To 1195 South Street
                                        </p>
                                    </div>                                
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            ***Map to go here***
                                        </p>
                                    </div>                                
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="col-8 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.toggle}>
                    Home to Work
                </button>
                {modal}
            </div>
        );
    }
}

export default RouteInfoModal;