// File Type: Component

import React, { Component } from 'react';

import { getFromStorage } from '../../utils/localStorage' ;

// Used as a css prop
const display = {
    display: 'block'
};
// Used as a css prop
const hide = {
    display: 'none'
};

/*
* Purpose: Popup modal that allows you to upload a drivers license picture for your account
*/
class UploadDriversSetting extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            token: "",
            file: undefined,
        }
    }
    
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        this.setState({token: obj.token});
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
    * Purpose: API call to the backend that updates the users drivers license picture and returns whether or not
    * the update was successful
    */
    upload() {
        const formData = new FormData();

        formData.append('token', this.state.token);
        formData.append('file', this.state.file);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/driversLicense', true);
        xhr.onreadystatechange = res => {            
            if(xhr.readyState === XMLHttpRequest.DONE) {
                alert("Successfully uploaded");
            }
        }
        xhr.send(formData);
        this.toggle();
    }

    /*
    * Purpose: Sets the 'state.file' variable to senders current value
    */
    handleFileChange(e) {
        this.setState({file: e.target.files[0]});
    }
  
    render() {
        var modal = [];

        modal.push(
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">
                                Driver's License
                            </h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <input type="file" onChange={this.handleFileChange.bind(this)} className="inputfile" id="driversFile"/>
                                <label htmlFor="driversFile" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold">Choose a file</label>  
                            </div>
                            <div className="row">
                                <button type="submit" disabled={this.state.file === undefined} onClick={this.upload.bind(this)} className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" id="btnChangeEmail">
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
                <div className="container-fluid bordbot-2px-white" onClick={this.toggle} >
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    Driver's License
                                </h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    <i className="fa fa-id-card-o"></i>
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

export default UploadDriversSetting;