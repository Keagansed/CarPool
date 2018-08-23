// File Type: Component

import React, { Component } from 'react';
import { observer } from "mobx-react";

const util = require('./../../utils/idCheck');
const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(email) {
    return {
        email: !util.ValidateEmail(email),
    };
}
  
/*
 * Purpose: provides a modal interface for when a user has forgotten their password. 
 */
@observer class Modal extends Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' represents the 
     * visibility of the modal component. 
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            email: '',

            touched: {
                email: false,
            },
        };
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
    * Purpose: Sets the 'state.email' variable to senders current value
    */
    handleEmailChange(e){
        this.setState({email: e.target.value});
        this.props.store.forgotEmail = e.target.value;
        this.props.store.noEmailError = '';
    }

    /*
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    /*
    * Purpose: Calls the store.sendPassword() function
    */
    handleLogin = (event) => {
        event.preventDefault();
        this.props.store.sendPassword();
    }
  
    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const errors = validate(this.state.email);
        const { noEmailError } = this.props.store;
        const isDisabled = Object.keys(errors).some(x => errors[x]);

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
                                    <input 
                                        type="email" 
                                        value={this.state.email} 
                                        onChange={this.handleEmailChange.bind(this)} 
                                        className={(shouldMarkError('email') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem txt-purple settingInput"}
                                        placeholder="Email" 
                                        onBlur={this.handleBlur('email')}
                                        id="changeEmail"
                                    /> 
                                </div>
                                <div className="row">
                                    <p className="mx-auto txt-red mbottom-05rem mtop-05rem">{noEmailError}</p>
                                </div>
                                <div className="row">
                                    <button 
                                        onClick={this.handleLogin} 
                                        type="submit" 
                                        className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" 
                                        id="btnForgotPassword"
                                        disabled={isDisabled}
                                    >
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