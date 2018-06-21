import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
  
class CarpoolInfoModal extends Component {
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
  
    render() {
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Brogrammers Carpool</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Carpool Members</h6>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Marcus Bornman</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Vernon Francis</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Leonardo Ianigro</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Keagan Seddon</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Michael Yatrakos</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Myron Ouyang</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="mx-auto">
                <button className="col-8 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.toggle}>
                    Brogrammers Carpool
                </button>
                {modal}
            </div>
        );
    }
}

export default CarpoolInfoModal;