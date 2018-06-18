import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class Modal extends Component{
    render(){
        return(
            // Modal
            <div className="modal" tabIndex="-1" role="dialog" id="myModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Forgot Password?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
    }
}

export default Modal;