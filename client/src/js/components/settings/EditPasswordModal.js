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
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(password, newPassword) {
    return {
        password: password.length === 0,
        newPassword: newPassword.length === 0,
    };
}
  
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
            newPassword: "",

            touched: {
                password: false,
                newPassword: false,
            },
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
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    /*
    * Purpose: API call to the backend that updates the users password and returns whether or not
    * the update was successful
    */
    changePassword(){
        fetch('/api/account/profile/updatePassword?token=' + this.props.token,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                token: this.props.token,
                password: this.state.password,
                newPassword: this.state.newPassword
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success){
                this.toggle();
            }
            else{
                this.setState({password: ""});
            }
        });
    }
  
    render() {
        /*
        * Purpose: Only give fields red borders if the user has changed/access them
        * and they are still not valid.
        */
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const errors = validate(this.state.password, this.state.newPassword);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

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
                                <input 
                                    onChange={this.handlePasswordChange.bind(this)} 
                                    type="password" 
                                    className={(shouldMarkError('password') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput"}
                                    placeholder="Current Password" 
                                    id="changePasswordCurrent"
                                    onBlur={this.handleBlur('password')}
                                    value={this.state.password}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.handleNewPasswordChange.bind(this)} 
                                    type="password" 
                                    className={(shouldMarkError('newPassword') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput"}
                                    placeholder="New Password" 
                                    id="changePasswordNew"
                                    onBlur={this.handleBlur('newPassword')}
                                    value={this.state.newPassword}
                                /> 
                            </div>
                            <div className="row">
                                <button disabled={isDisabled} onClick={this.changePassword.bind(this)} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" id="btnChangePassword">
                                    Submit
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