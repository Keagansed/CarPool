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

import LoginStore from '../stores/LoginStore';
import logo from "../../css/images/logo.png";

//Define the spefic styles for this page
const styles = theme => ({
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
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar src={logo} align='center' className={classes.avatar} />
                        <Typography align='center' variant="headline">The Iminsys Carpool Platform</Typography>
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
                                >
                                    Login
                                </Button>
                            </Link>
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