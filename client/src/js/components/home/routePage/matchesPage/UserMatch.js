import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from './../../../../../css/images/profile_default.png';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class UserMatch  extends Component {
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
                            <h5 className="modal-title fw-bold">Offer to Carpool</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row bordbot-1px-dash-grey">
                                    <h6 className="fw-bold mx-auto">Offer Recipient</h6>
                                </div>
                                <div className="row bordbot-1px-dash-grey mbottom-10px" key={Math.random()}>
                                    <div className="col-6">Myron Ouyang</div><div className="col-6 vertical-right">View Profile</div>
                                </div>                           
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route Comparison</h6>
                                </div>
                                <div className="row mbottom-10px">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            ***Map to go here***
                                        </p>
                                    </div>                                
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNewRoute">
                                        Make Offer
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
                        <div className="col-2">
                                <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-white" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12">
                                <h5>Myron Ouyang</h5>
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

export default UserMatch;