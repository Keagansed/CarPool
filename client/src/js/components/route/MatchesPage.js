// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import app from '../../stores/FirebaseStore.js'
import ServerURL from '../../utils/server';
import Matches from './Matches';
import MatchesStore from '../../stores/MatchesStore';
import { getFromStorage } from '../../utils/localStorage.js';
import RouteStore from './../../stores/RouteStore';
import MapComponent from '../google/GeneralMapWrapper';

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
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    grow: {
        flexGrow: 1,
    },
    backButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

@observer class MatchesPage extends Component {

    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. loading is set
    * to true by default until the page is finished loading.
    */
    constructor() {
        super()

        this.state = {
            token: '',
            infoDialog: false,
            deleteDialog: false,
            redirect: false,
        }

        this.routeStore = new RouteStore();
        this.routeArr = [];
    }

    //Open/close info dialog
    openInfoDialog = () => {
        this.setState({ infoDialog: true });
    };
    closeInfoDialog = () => {
        this.setState({ infoDialog: false });
    };

    //Open/close delete dialog
    openDeleteDialog = () => {
        this.setState({ deleteDialog: true });
    };
    closeDeleteDialog = () => {
        this.setState({ deleteDialog: false });
    };

    //To redirect to home page
    setRedirect = () => {
        this.setState({ redirect: true });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return (<Redirect to='/HomePage' />);
        }
    }

    delete = () => {
        fetch(ServerURL + '/api/system/route/deleteRoute?token=' + this.state.token + '&routeId=' + this.props.match.params._id, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {

                if (json.success) {
                    json.groupChatIds.forEach(groupChat => {
                        app.database().ref()
                            .child('groupChats/' + groupChat)
                            .once('value')
                            .then(snapShot => {
                                let newUsers = {};

                                for (let user in snapShot.val().users) {
                                    if (user !== this.props.token)
                                        newUsers[user] = snapShot.val().users[user];
                                }
                                app.database().ref()
                                    .child('groupChats/' + groupChat)
                                    .update({ users: newUsers })
                                    .catch(error => {
                                        return {
                                            errorCode: error.code,
                                            errorMessage: error.message
                                        }
                                    });
                            });
                    });
                    this.closeDeleteDialog();
                    this.setRedirect();
                }
            });
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen. Here
    * it is used to fetch the session token.
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        const { token } = obj;

        this.setState({
            token: token,
        })

        //Get own route 
        this.routeStore.getRoute(token, this.props.match.params._id);
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        const { token } = this.state;
        const { classes } = this.props;

        //Get origin and destination of route to display in info dialog
        let originName, destinationName;
        if (typeof (this.routeStore.routeObj.routeName) !== "undefined") {
            originName = this.routeStore.routeObj.startLocation.name;
            originName = originName.slice(0, originName.indexOf(","));
            destinationName = this.routeStore.routeObj.endLocation.name;
            destinationName = destinationName.slice(0, destinationName.indexOf(","));
            this.routeArr = [{
                origin: this.routeStore.routeObj.startLocation,
                destination: this.routeStore.routeObj.endLocation
            }];
        }

        return (
            <div className={classes.root}>
                {/* App Bar */}
                <AppBar className={classes.topNav}>
                    <Toolbar className={classes.toolbar} variant='dense'>
                        <Link to={`/HomePage`} style={{ textDecoration: 'none', color: 'white' }}>
                            <IconButton color="inherit" aria-label="Back">
                                <BackIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="title" color="inherit" className={classes.grow} onClick={this.openInfoDialog}>
                            {this.routeStore.routeObj.routeName}
                        </Typography>
                        <IconButton color="inherit" aria-label="Back" onClick={this.openDeleteDialog}>
                            <DeleteIcon />
                        </IconButton>
                    </Toolbar>
                    {/* Route Info Dialog */}
                    <Dialog open={this.state.infoDialog} onClose={this.closeInfoDialog} scroll='paper'>
                        <DialogTitle>{this.routeStore.routeObj.routeName}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {originName} to {destinationName} at {this.routeStore.routeObj.time}.
                            </DialogContentText>
                            <MapComponent routeArr={this.routeArr} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeInfoDialog} color="primary" autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* Delete Route Dialog */}
                    <Dialog open={this.state.deleteDialog} onClose={this.closeDeleteDialog} scroll='paper'>
                        <DialogTitle>Delete Route?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this route?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.delete} color="primary" autoFocus>
                                Yes
                            </Button>
                            <Button onClick={this.closeDeleteDialog} color="primary" autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </AppBar>
                <Matches
                        store={MatchesStore}
                        token={token}
                        routeId={this.props.match.params._id}
                />
                {this.renderRedirect()}
            </div>
        );
    }
}

MatchesPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchesPage);