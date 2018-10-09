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
import LockIcon from '@material-ui/icons/Lock';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { getFromStorage } from './../../utils/localStorage';
import ServerURL from '../../utils/server';


//Define specific styles for this page
const styles = theme => ({
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
        backgroundColor: theme.palette.secondary.main,
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
function validate(password, password2) {
    return {
        password: password.length === 0,
        password2: password2 !== password || password2.length === 0,
    };
}

/*
* Purpose: Reset password page where user resets password
*/
@observer class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.props.store.resetToken = this.props.match.params.ResetPasswordToken;

        this.state = {
            token: '',
            password: '',
            password2: '',
            open: false,

            touched: {
                password: false,
                password2: false,
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
    * Purpose: Sets the 'store.resetPass' variable to senders current value
    */
    updatePasswordValue = (event) => {
        this.setState({ password: event.target.value });
        this.props.store.resetPass = event.target.value;
        this.props.store.passwordChangeMessage = '';
    }

    /*
    * Purpose: Sets the value of password2 for error checking purposes
    */
    updatePassword2Value = (event) => {
        this.setState({ password2: event.target.value });
        this.props.store.passwordChangeMessage = '';
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.password, this.state.password2);
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

    /*
    * Purpose: Calls the store.sendPassword() function
    */
    resetPassword = (event) => {
        event.preventDefault();
        this.handleClickOpen();
        this.props.store.resetPassword();
    }

    //open and close dialog
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

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
        const errors = validate(this.state.password, this.state.password2);
        const { passwordChangeMessage } = this.props.store;
        let messageTitle = "Password reset";
        if (passwordChangeMessage === 'This password reset link is not valid')
            messageTitle = "Oops! There was a problem.";
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const { classes } = this.props;

        if (!loggedIn) {
            return (
                <React.Fragment>
                    <CssBaseline />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockIcon />
                            </Avatar>
                            <Typography variant="headline">Reset Password</Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">New Password</InputLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={this.updatePasswordValue}
                                        error={(shouldMarkError('password') ? true : false)}
                                        onBlur={this.handleBlur('password')}
                                        value={this.state.password}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password2">Confirm New Password</InputLabel>
                                    <Input
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        onChange={this.updatePassword2Value}
                                        error={(shouldMarkError('password2') ? true : false)}
                                        onBlur={this.handleBlur('password2')}
                                        value={this.state.password2}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="raised"
                                    color="primary"
                                    onClick={this.resetPassword}
                                    className={classes.submit}
                                    disabled={isDisabled}
                                >
                                    Reset Password
                                </Button>
                            </form>
                        </Paper>
                        {/* Dialog when password changed*/}
                        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
                            <DialogTitle id="simple-dialog-title">{messageTitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {passwordChangeMessage}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
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

ResetPasswordPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPasswordPage);