import React, { Component } from 'react';
import { getFromStorage } from './../../../utils/localStorage';

import EditNameModal from './EditProfileModals/EditNameModal';
import EditEmailModal from './EditProfileModals/EditEmailModal';
import EditPasswordModal from './EditProfileModals/EditPasswordModal';
import EditProfilePictureSetting from './EditProfileModals/EditProfilePictureModal'
import UploadIDSetting from './EditProfileModals/UploadIDModal';
import UploadDriversSetting from './EditProfileModals/UploadDriversModal';
import UploadCarPicatureSetting from './EditProfileModals/UploadCarPicture';
import UploadCarRegistrationSetting from './EditProfileModals/UploadCarRegistration';
import LogoutSetting from './EditProfileModals/LogoutSetting';

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