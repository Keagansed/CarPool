// File Type: Component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import EditEmailSetting from './EditEmailSetting';
import EditPasswordSetting from './EditPasswordSetting';
import UploadProfilePictureSetting from './UploadProfilePictureSetting'
import LogoutSetting from './LogoutSetting';
import UploadIDSetting from './UploadIDSetting';
import UploadDriversSetting from './UploadDriversSetting';
import UploadCarRegistrationSetting from './UploadCarRegistrationSetting';
import UploadClearanceCertificateSetting from './UploadClearanceSetting';

import { getFromStorage } from '../../utils/localStorage';

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 48,
        paddingBottom: 56,
    },
});

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
        const { classes } = this.props;
        return(
            <List component="nav" className={classes.root}>
                <UploadProfilePictureSetting token={this.state.token}/>
                <Divider />
                <UploadIDSetting token={this.state.token}/>
                <Divider />
                <UploadDriversSetting token={this.state.token}/>
                <Divider />
                <UploadClearanceCertificateSetting token={this.state.token}/>
                <Divider />
                <UploadCarRegistrationSetting token={this.state.token}/>
                <Divider />
                <EditEmailSetting token={this.state.token}/>
                <Divider/>
                <EditPasswordSetting token={this.state.token}/>
                <Divider />
                <LogoutSetting token={this.state.token}/>
            </List>
        );
    }
}

ProfileSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSettings);