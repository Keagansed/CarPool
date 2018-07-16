import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
  
class EditEmailModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            email: this.props.token
        }
    }
  
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
    
    handleEmailChange(e){
        this.setState({email: e.target.value})
    }

    changeEmail(){

    }

    render() {
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Edit Email</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <input type="text" value={this.state.email} onChange={this.handleEmailChange.bind(this)} className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="Email" required="required" name="email" id="changeEmail"/> 
                            </div>
                            <div className="row">
                                <button type="submit" onClick={this.changeEmail.bind(this)} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnChangeEmail">
                                    Submit Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="mx-auto">
                <div className="container-fluid bordbot-2px-white" onClick={this.toggle}>
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">Edit Email</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0"><i className="fa fa-at"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

export default EditEmailModal;