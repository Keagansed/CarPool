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
* Purpose: Popup modal that allows you to enter a new password for your account
*/
class EditPasswordModal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            password: "",
            newPassword: ""
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
    * Purpose: Sets the 'state.password' variable to senders current value
    */
    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    /*
    * Purpose: Sets the 'state.newPassword' variable to senders current value
    */
    handleNewPasswordChange(e) {
        this.setState({newPassword: e.target.value})
    }

    /*
    * Purpose: API call to the backend that updates the users password and returns whether or not
    * the update was successful
    */
    changePassword(){
        fetch('/api/account/profile/updatePassword',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.props.token,
                password: this.state.password,
                newPassword: this.state.newPassword
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success){
                alert("Password changed");
                this.toggle();
            }
            else{
                alert("Password was not changed. " + json.message);
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
                            <h5 className="modal-title fw-bold">
                                Edit Password
                            </h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <input onChange={this.handlePasswordChange.bind(this)} type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="Current Password" required="required" name="currentPassword" id="changePasswordCurrent"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.handleNewPasswordChange.bind(this)} type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="New Password" required="required" name="newPassword" id="changePasswordNew"/> 
                            </div>
                            <div className="row">
                                <button onClick={this.changePassword.bind(this)} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnChangePassword">
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
                                <h5 className="mbottom-0">Edit Password</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    <i className="fa fa-lock"/>
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

export default EditPasswordModal;