import React, { Component } from 'react';
import { getFromStorage } from '../../utils/localStorage' ;

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class EditProfilePictureSetting extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            token: "",
            file: {}
        }
    }
    
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        this.setState({token: obj.token});
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    upload(){
        const formData = new FormData();
        formData.append('id', this.state.token);
        formData.append('file', this.state.file);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/profilePicture', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                alert("Successfully uploaded");
            }
        }
        xhr.send(formData);
        this.toggle();
    }

    handleFileChange(e){
        this.setState({file: e.target.files[0]});
    }
  
    render() {
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Profile picture</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <input type="file" onChange={this.handleFileChange.bind(this)} className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="new profile picture" required="required" name="file" id="file"/> 
                            </div>
                            <div className="row">
                                <button type="submit" onClick={this.upload.bind(this)} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnChangeEmail">
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
                <div className="container-fluid bordbot-2px-white" onClick={this.toggle} >
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">Change Profile Picture</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0"><i className="fa fa-camera"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

export default EditProfilePictureSetting;