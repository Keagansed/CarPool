// File Type: Component

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CarIcon from '@material-ui/icons/DirectionsCar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getFromStorage } from '../../utils/localStorage' ;
import ServerURL from '../../utils/server';

/*
* Purpose: Popup modal that allows you to upload a drivers license picture for your account
*/
class UploadCarRegistrationSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            file: undefined,
            successDialog : false,
        }
    }
    
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        this.setState({token: obj.token});
    }

    //Open/Close success dialog
    handleClickOpen = () => {
        this.setState({ successDialog: true });
    };
    handleClose = () => {
        this.setState({ successDialog: false });
    };

    /*
    * Purpose: Sets the 'state.file' variable to senders current value
    */
    handleFileChange(e) {
        if (e.target.files[0] === undefined)
            return;
        const formData = new FormData();

        formData.append('token', this.state.token);
        formData.append('file', e.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', ServerURL + '/api/account/uploadFile/CarRegistration?token=' + this.props.token, true);
        xhr.onreadystatechange = res => {            
            if(xhr.readyState === XMLHttpRequest.DONE) {
                this.handleClickOpen();
            }
        }
        xhr.send(formData);
    }
  
    render() {
        return (
            <div>
                <input
                    style={{ display: 'none' }}
                    id="car-file"
                    type="file"
                    onChange={this.handleFileChange.bind(this)}
                />
                <label htmlFor="car-file">
                    <ListItem button divider>
                        <ListItemIcon>
                            <CarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vehicle Registration"  secondary="Your car's registration form" />
                    </ListItem>
                </label>
                <Dialog open={this.state.successDialog} onClose={this.handleClose}>
                    <DialogTitle>{"Upload Successful"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You have successfully uploaded your Vehicle Registration. The document will be verified by our team.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default UploadCarRegistrationSetting;