import React, { Component } from 'react';

import EditNameModal from './EditNameModal/Modal';
import EditEmailModal from './EditEmailModal/Modal';
import EditPasswordModal from './EditPasswordModal/Modal';
import EditProfilePictureSetting from './EditProfilePictureSetting/Setting'
import UploadIDSetting from './UploadIDSetting/Setting';
import UploadDriversSetting from './UploadDriversSetting/Setting';
import LogoutSetting from './LogoutSetting/Setting';

class ProfileSettings  extends Component {
    render(){
        return(
            <div className="scroll-vert">
                <UploadIDSetting/>
                <UploadDriversSetting/>
                <EditProfilePictureSetting/>
                <EditNameModal/>
                <EditEmailModal/>
                <EditPasswordModal/>
                <LogoutSetting/>
            </div>
        );
    }
}

export default ProfileSettings;