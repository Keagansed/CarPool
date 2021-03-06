// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import PasswordModal from '../components/login/PasswordModal';
import { getFromStorage } from '../utils/localStorage.js';
import ServerURL from '../utils/server';
import logo from "../../css/images/logo.png";

const util = require('./../utils/idCheck');

//Define specific styles for this page
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
        alignItems: 'center',
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
        marginBottom: theme.spacing.unit * 8,
        display: 'flex',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    modalPaper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    avatar: {
        margin: theme.spacing.unit,
        height: 128,
        width: 128,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(email, password) {
    return {
        email: !util.ValidateEmail(email),
        password: password.length === 0,
    };
}


/*
* Purpose: Login page where the user enters login details to proceed to the HomePage
*/
@observer class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            email: '',
            password: '',

            touched: {
                email: false,
                password: false,
            },
        };
    }

    /*
    * Purpose: Check to see whether the user is already logged in
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        if (obj && obj.token) {
            const { token } = obj;

            fetch(ServerURL + '/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.store.setToken(token);
                        this.props.store.setLoggedIn(true);
                    }
                })
        }
    }

    /*
    * Purpose: Sets the 'store.lEmail' variable to senders current value
    */
    updateLoginEmailValue = (event) => {
        this.setState({ email: event.target.value });
        this.props.store.lEmail = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.lPassword' variable to senders current value
    */
    updateLoginPasswordValue = (event) => {
        this.setState({ password: event.target.value });
        this.props.store.lPassword = event.target.value;
    }

    /*
    * Purpose: Calls the store.authenticate() function
    */
    handleLogin = (event) => {
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }
        this.props.store.authenticate(this.state.email, this.state.password);
    }

    /*
    * Purpose: hide the incorrect login modal
    */
    hideErrorDialog = (event) => {
        event.preventDefault();
        this.props.store.setToggleError(false);
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    /*
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    render() {
        /*
        * Purpose: Only give fields red borders if the user has changed/access them
        * and they are still not valid.
        */
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };

        const { loggedIn } = this.props.store;
        const { toggleError } = this.props.store;
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const { classes } = this.props;

        if (!loggedIn) {
            return (
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="static" className={classes.topNav}>
                        <Toolbar className={classes.toolbar} variant='dense'>
                            <Link to={`/Landing`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                            <Typography variant="headline">Log In</Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        autoComplete="on"
                                        onChange={this.updateLoginEmailValue}
                                        error={(shouldMarkError('email') ? true : false)}
                                        onBlur={this.handleBlur('email')}
                                        value={this.state.email}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={this.updateLoginPasswordValue}
                                        error={(shouldMarkError('password') ? true : false)}
                                        onBlur={this.handleBlur('password')}
                                        value={this.state.password}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="raised"
                                    color="primary"
                                    onClick={this.handleLogin}
                                    className={classes.submit}
                                    disabled={isDisabled}
                                >
                                    Log In
                                </Button>
                                <FormControl margin="normal" fullWidth>
                                    {/* Forgot Password text */}
                                    <PasswordModal store={this.props.store} />
                                </FormControl>
                            </form>
                        </Paper>
                        {/* Error Dialog if email/password incorrect */}
                        <Dialog open={toggleError} onClose={this.hideErrorDialog} aria-labelledby="simple-dialog-title">
                            <DialogTitle id="simple-dialog-title">Failed to Login</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You have entered an incorrect email or password. Please try again.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.hideErrorDialog} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </main>
                </React.Fragment>
            );
        } else {

            return (
                <Redirect to={{
                    pathname: "/HomePage",
                }} />
            );
        }
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);