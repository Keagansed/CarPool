// File Type: Component

import React, { Component } from 'react';

// Used as a css prop
const display = {
    display: 'block'
};
// Used as a css prop
const hide = {
    display: 'none'
};

/*
* Purpose: Popup modal that allows you to enter a new email address for your account
*/
class EditEmailModal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            email: this.props.token
        }
    }
    
    /*
    * Purpose: Toggles the 'state.toggle' variable between true and false
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
        this.setState({email: e.target.value})
    }

    /*
    * Purpose: API call to the backend that updates the users email and returns whether or not
    * the update was successful
    */
    changeEmail(){
        fetch('/api/account/profile/updateEmail',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.props.token,
                email: this.state.email
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success) {
                alert("Email changed");
                this.toggle();
            }
            else {
                alert("Email was not changed "+ json.message);
            }
        });
    }

    render() {
        var modal = [];

        modal.push(
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
                                <input type="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="Email" required="required" name="email" id="changeEmail"/> 
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
                                <h5 className="mbottom-0">
                                    Edit Email
                                </h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    <i className="fa fa-at"/>
                                </h5>
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