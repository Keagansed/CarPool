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

import Carpools from '../components/carpool/Carpools';
import { HomeNavTabs } from '../components/navigation/NavTabs';
import Navbar from '../components/navigation/Navbar';
import NewRoute from '../components/route/NewRoute';
import OffersStore from '../stores/OffersStore';
import Routes from '../components/route/Routes';
import RoutesStore from '../stores/RoutesStore';
import Trips from '../components/trip/Trips';

import { getFromStorage } from '../utils/localStorage.js';

//Container
function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
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
            value: 0,
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
        this.setState({ value });
    };

    /*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
    setTab = () => {
        const { store } = this.props;
        const { token } = this.state;

        if (store.routeTab === true) {
            return <Routes store={RoutesStore} token={token} />;
        }
        else if (store.carpoolTab === true) {
            return <Carpools store={OffersStore} token={token} />;
        }
        else if (store.tripTab === true) {
            return <Trips />;
        }
        else if (store.addTab === true) {
            return <NewRoute
                store={RoutesStore}
                token={this.props.store.token}
            />
        }
    }

    /*
    * Purpose: Returns the JSX for the NavTabs component
    */
    renderNavTabs = () => {
        return <HomeNavTabs store={this.props.store} />;
    }

    /*
    * Purpose: Returns the JSX for the Navbar component
    */
    renderNavBar = () => {
        return <Navbar token={this.state.token} />;
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const { token } = this.state;

        return (
                <div className={classes.root}>
                    <AppBar className={classes.topNav}>
                        <Tabs value={value} onChange={this.handleChange} fullWidth>
                            <Tab label="Routes" />
                            <Tab label="Carpools" />
                            <Tab label="Trips" />
                            <Tab icon={<AddIcon />} href="#basic-tabs" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer><Routes store={RoutesStore} token={token} /></TabContainer>}
                    {value === 1 && <TabContainer><Carpools store={OffersStore} token={token} /></TabContainer>}
                    {value === 2 && <TabContainer><Trips /></TabContainer>}
                    {value === 3 && <TabContainer><NewRoute store={RoutesStore} token={this.props.store.token} /></TabContainer>}
                    <BottomNavigation
                        value={1}
                        showLabels
                        className={classes.bottomNav}
                    >
                        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                        <BottomNavigationAction label="Profile" icon={<UserIcon />} />
                    </BottomNavigation>
                </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);