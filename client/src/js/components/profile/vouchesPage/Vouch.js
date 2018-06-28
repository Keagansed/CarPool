import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from './../../../../css/images/profile_default.png';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class Vouch  extends Component {
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
                            <h5 className="modal-title fw-bold">Michael's Review</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Rating</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <div className="col-12 txt-gold txt-center">
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star-o"></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Review</h6>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            I had a great drive with Marcus. He was friendly and enjoyable to talk to.
                                        </p>
                                    </div>                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                <div className="container-fluid bg-white bordbot-2px-purple"  onClick={this.toggle}>
                    <div className="row txt-purple padver-10px">
                        <div className="col-2">
                                <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-purple" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12 txt-gold">
                                <h5><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i></h5>
                            </div>
                            <div className="col-12">
                                Michael Yatrakos
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

export default Vouch;