// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddLocation';

import Route from './Route'
import RouteStore from '../../stores/RouteStore';
import VerifyWrapper from '../../containers/VerifyWrapper';

import "../../../css/components/Spinner.css"

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

/*
* The purpose of this Routes class is to provide a component that renders all routes
* on a user's home page in the routes tab.
*/
@observer class Routes extends Component {
    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen. In this case
    * it is load all a users routes
    */
    componentWillMount() {
        this.props.store.getRoutes(this.props.token);
    }

    /*
    * The purpose of the renderRoutes method is to render all the routes that a user has created.
    */
    renderRoutes = () => {
        const Routes = this.props.store.routes.map(route =>
            <Route
                key={route._id}
                store={new RouteStore(
                    route.routeName,
                    route.startLocation,
                    route.endLocation,
                    route.time,
                    route._id,
                )}
            />
        )

        if (Routes.length > 0) {
            return Routes;
        } else {
            return (
                <ListItem>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                    <ListItemText primary="No Routes to Display" secondary="Add a route to begin." />
                </ListItem>
            );
        }
    }

    /*
    * The purpose of the renderLoading method is to render a loading icon while the component 
    * has not yet loaded.
    */
    renderLoading = () => {
        return (
            <div>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        )
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        const { classes } = this.props;
        if (this.props.store.loadingRoutes) {
            return (
                <div className="scroll-vert">
                    {this.renderLoading()}
                </div>
            );
        }
        else {
            return (
                <List component="nav" className={classes.root}>
                    {this.renderRoutes()}
                </List>
            );
        }
    }
}

Routes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyWrapper(Routes));