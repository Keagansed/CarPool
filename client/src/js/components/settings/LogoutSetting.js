// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitIcon from '@material-ui/icons/ExitToApp';

import LoginStore from '../../stores/LoginStore';

/*
* Purpose: Link component that logs out, the currently logged in user
*/
class LogoutSetting extends Component {
    handleLogout = () => {
        LoginStore.logOut();
    }

    render() {
        return (
            <div>
                <Link to={"/"} onClick={this.handleLogout} style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ExitIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" secondary="Log out of your account" />
                    </ListItem>
                </Link>
            </div>
        );
    }
}

export default LogoutSetting;