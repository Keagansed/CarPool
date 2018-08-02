// File Type: Component

import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
  
/*
 * Purpose: provides a modal interface for when a user has forgotten their password. 
 */
class Modal extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' represents the 
     * visibility of the modal component. 
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false
        }
    }
  
    /*
     * Purpose: toggles the visibility of the component.  
     */
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
  
    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
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
        
        return(
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