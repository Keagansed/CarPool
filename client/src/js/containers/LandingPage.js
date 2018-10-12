// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import LoginStore from '../stores/LoginStore';
import logo from "../../css/images/logo.png";
import TermsDialog from './../components/terms/Terms';

//Define the spefic styles for this page
const styles = theme => ({
    topNav: {
        position: 'fixed',
        top: 0,
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        paddingTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        height: 128,
        width: 128,
    },
    form: {
        width: '100%', // Fix IE11 issue.
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    grow: {
        flexGrow: 1,
    },
});

/*
* Purpose: Landing page compenent is the first page the user sees when opening the app
*/
class LandingPage extends Component {
    componentWillMount() {
        LoginStore.setRegistered(false);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static" className={classes.topNav}>
                    <Toolbar className={classes.toolbar} variant='dense'>
                        <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton color="inherit" aria-label="Back">
                                <BackIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            The Iminsys Carpool Platform
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar src={logo} align='center' className={classes.avatar} />
                        <Typography align='center' variant="headline">Welcome to the Platform!</Typography>
                        <form className={classes.form}>
                            <Link to={`/Register`} style={{ textDecoration: 'none' }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="raised"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Register
                                </Button>
                            </Link>
                            <Link to={`/Login`} style={{ textDecoration: 'none' }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="raised"
                                    color="primary"
                                    className={classes.submit}
                                    style={{ marginBottom: 15 }}
                                >
                                    Login
                                </Button>
                            </Link>
                            <TermsDialog />
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);