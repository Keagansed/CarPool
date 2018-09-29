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

import LoginStore from '../stores/LoginStore'
import logo from './../../css/images/logo.png'

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
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
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
                        <Avatar alt="logo" src={logo} className={classes.avatar}/>
                        <Typography variant="headline">Carpool</Typography>
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

            // <div className="vertical-center bg-purple">
            //     <div className="container-fluid">
            //         <div className="row">
            //             <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} alt="carpool_logo" id="logo-256" />
            //         </div>
            //         <div className="row">
            //             <Link to={`/Login`} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnLogin">
            //                 Login
            //             </Link>
            //         </div>
            //         <div className="row">
            //             <Link to={`/Register`} className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" id="btnRegister">
            //                 Register
            //             </Link>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);