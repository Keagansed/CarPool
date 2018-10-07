// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

import ProfileSettings from '../components/settings/ProfileSettings';
import Toolbar from '@material-ui/core/Toolbar';

import { getFromStorage } from '../utils/localStorage.js';
import ServerURL from '../utils/server';

//Styling specific to this page
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    topNav: {
        position: 'fixed',
        top: 0,
    },
    bottomNav: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        borderTop: '1px solid lightgrey',
    },
});

/*
* Purpose: Container page for all the settings components
*/
@observer class SettingsPage extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
        }
    }

    /*
    * Purpose: Verifies the users token before component mounting to make sure the user is authorised
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');

        if (obj && obj.token) {
            const { token } = obj;
            fetch(ServerURL + '/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.store.token = token;

                        this.setState({
                            loading: false,
                        })
                    }
                })
        }
    }

    render() {
        const { token } = this.props.store;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.topNav}>
                    <Toolbar variant='dense'>
                        <Typography variant="title" color="inherit" onClick={this.openInfoDialog}>
                            Settings
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ProfileSettings />
                <BottomNavigation
                    value={2}
                    className={classes.bottomNav}
                >
                    <BottomNavigationAction
                        component={Link}
                        to={{ pathname: "/ProfilePage/" + token }}
                        label="Profile"
                        icon={<UserIcon />}
                        showLabel
                    />
                    <BottomNavigationAction
                        component={Link}
                        to={`/HomePage`}
                        label="Home"
                        icon={<HomeIcon />}
                        showLabel
                    />
                    <BottomNavigationAction
                        label="Settings"
                        icon={<SettingsIcon />}
                        showLabel
                    />
                </BottomNavigation>
            </div>
            // <div className="size-100 bg-purple">
            //     <SettingsNavTabs store={this.props.store} token={token} />
            //     <div className="padtop-50px padbot-50px">
            //         {this.setTab()}
            //     </div>
            //     <Navbar token={token} />
            // </div>
        );
    }
}

SettingsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsPage);