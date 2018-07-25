import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
  
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
  
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        })); 
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }

    handleNewPasswordChange(e){
        this.setState({newPassword: e.target.value})
    }

    changePassword(){
        fetch('/api/account/getProfile/updatePassword',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.props.token,
                password: this.state.password,
                newPassword: this.state.newPassword
            })
        }).then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if (json.success){
                alert("password changed");
                this.toggle();
            }
            else{
                alert("Password was not changed. "+ json.message);
            }
        });
    }
  
    render() {
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Edit Password</h5>
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
                                <h5 className="mbottom-0"><i className="fa fa-lock"></i></h5>
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