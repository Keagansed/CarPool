// File Type: Component

import React, { Component } from 'react';

import EditNameModal from './EditNameModal';
import EditEmailModal from './EditEmailModal';
import EditPasswordModal from './EditPasswordModal';
import EditProfilePictureSetting from './EditProfilePictureModal'
import LogoutSetting from './LogoutSetting';
import UploadIDSetting from './UploadIDModal';
import UploadDriversSetting from './UploadDriversModal';
import UploadCarPicatureSetting from './UploadCarPicture';
import UploadCarRegistrationSetting from './UploadCarRegistration';

import { getFromStorage } from '../../utils/localStorage';

/*
* Purpose: This is a container component that holds all the relevant settings components
*/
class ProfileSettings  extends Component {
    constructor(){
        super();
        this.state = {
            token: ""
        }
    }

    componentDidMount(){
        const obj = getFromStorage('sessionKey');
        this.setState({token: obj.token})
    }

    render(){
        return(
            <div className="scroll-vert">
                <UploadIDSetting token={this.state.token}/>
                <UploadDriversSetting token={this.state.token}/>
                <UploadCarPicatureSetting token={this.state.token}/>
                <UploadCarRegistrationSetting token={this.state.token}/>
                <EditProfilePictureSetting token={this.state.token}/>
                <EditNameModal token={this.state.token}/>
                <EditEmailModal token={this.state.token}/>
                <EditPasswordModal token={this.state.token}/>
                <LogoutSetting token={this.state.token}/>
            </div>
        );
    }
}

export default ProfileSettings;