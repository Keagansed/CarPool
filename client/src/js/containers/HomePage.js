// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

import Carpools from '../components/carpool/Carpools';
import NewRoute from '../components/route/NewRoute';
import OffersStore from '../stores/OffersStore';
import Routes from '../components/route/Routes';
import RoutesStore from '../stores/RoutesStore';
import Trips from '../components/trip/Trips';
import VerifyWrapper from './VerifyWrapper';


import { getFromStorage } from '../utils/localStorage.js';

//Container
function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ marginTop: 48, marginBottom: 56 }}>
            {children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

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
        backgroundColor: '#3f51b5',
    },
});

/*
* Purpose: Container compenent for the application HomePage, only takes care of tab switching all data
* is in sub-components
*/
@observer class HomePage extends Component {
    constructor() {
        super()

        this.state = {
            token: "",
        }
    }

    /*
    * Purpose: Verifies the users token before component mounting to make sure the user is authorised
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        let { token } = obj;

        this.setState({
            token,
        })

        let { store } = this.props;
        store.token = token;
    }

    //Handle tab changes
    handleChange = (event, value) => {
        let { store } = this.props;
        store.setTab(value);
    };

    render() {
        const { classes } = this.props;
        const { token } = this.state;
        const { activeTab } = this.props.store;

        return (
                <div className={classes.root}>
                    <AppBar className={classes.topNav}>
                        <Tabs value={activeTab} onChange={this.handleChange} fullWidth>
                            <Tab label="Routes" />
                            <Tab label="Carpools" />
                            <Tab label="Trips" />
                            <Tab icon={<AddIcon />} href="#basic-tabs" />
                        </Tabs>
                    </AppBar>
                    {activeTab === 0 && <TabContainer><Routes store={RoutesStore} token={token} /></TabContainer>}
                    {activeTab === 1 && <TabContainer><Carpools store={OffersStore} token={token} /></TabContainer>}
                    {activeTab === 2 && <TabContainer><Trips /></TabContainer>}
                    {activeTab === 3 && <TabContainer><NewRoute store={RoutesStore} token={this.props.store.token} /></TabContainer>}
                    <BottomNavigation
                        value={1}
                        className={classes.bottomNav}
                    >
                        <BottomNavigationAction 
                            component={Link}
                            to={{pathname: "/ProfilePage/" + token}}
                            label="Profile" 
                            icon={<UserIcon />} 
                            showLabel 
                        />
                        <BottomNavigationAction 
                            label="Home" 
                            icon={<HomeIcon />} 
                            showLabel 
                            style={{color: 'white'}}
                        />
                        <BottomNavigationAction 
                            component={Link}
                            to={`/Settings`}
                            label="Settings" 
                            icon={<SettingsIcon />} 
                            showLabel
                        />
                    </BottomNavigation>
                </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyWrapper(HomePage));