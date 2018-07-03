import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class CarpoolOffer  extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false
        }
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
                            <h5 className="modal-title fw-bold">Work to Home Offer</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row bordbot-1px-dash-grey">
                                    <h6 className="fw-bold mx-auto">Offer Sent By</h6>
                                </div>
                                <div className="row bordbot-1px-dash-grey mbottom-10px" key={Math.random()}>
                                    <div className="col-6">Vernon Francis</div><div className="col-6 vertical-right">View Profile</div>
                                </div>                           
                                <div className="row bordbot-1px-dash-grey">
                                    <h6 className="fw-bold mx-auto">Other Carpool Members</h6>
                                </div>
                                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                                    <div className="col-6">Myron Ouyang</div><div className="col-6 vertical-right">View Profile</div>
                                </div>
                                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                                    <div className="col-6">Leonardio Ianigro</div><div className="col-6 vertical-right">View Profile</div>
                                </div>
                                <div className="row mtop-10px ">
                                    <button onClick={this.handleAddRoute} type="submit" className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-green txt-white fw-bold">
                                        Accept
                                    </button>
                                    <button onClick={this.handleAddRoute} type="submit" className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-red txt-white fw-bold">
                                        Decline
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                <div className="container-fluid bg-purple bordbot-2px-white" onClick={this.toggle}>
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>Work to Home</h5>
                            </div>
                            <div className="col-12">
                                5 Members
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-info-circle"></i></h5>
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

export default CarpoolOffer;