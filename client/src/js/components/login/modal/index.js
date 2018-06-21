import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
  
class Modal extends Component {
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
                        <div className="modal-header">
                            <h5 className="modal-title">Forgot Password?</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <input type="email" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem" placeholder="Email" required="required" name="Email" id="inputForgotEmail"/> 
                                </div>
                                <div className="row">
                                    <button onClick={this.handleLogin} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnForgotPassword">
                                        Send Me My Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="mx-auto">
                <a className="txt-white fw-100" onClick={this.toggle}>
                    Forgot Password?
                </a>
                {modal}
            </div>
        );
    }
}

export default Modal;