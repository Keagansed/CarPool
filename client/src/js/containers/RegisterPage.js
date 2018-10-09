// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import logo from "../../css/images/logo.png";
import TermsDialog from './../components/terms/Terms';

const util = require('./../utils/idCheck');

//Define specific styles for this page
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
        marginBottom: theme.spacing.unit * 8,
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
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

/*
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(fName, lName, idNum, email, password1, password2, checked) {
    return {
        fName: fName.length === 0 || fName.length > 50,
        lName: lName.length === 0 || lName.length > 50,
        idNum: !util.ValidateIDNumber(idNum),
        email: !util.ValidateEmail(email),
        password1: password1.length === 0,
        password2: password2.length === 0 || password2 !== password1,
        checked: !checked,
    };
}

/*
* Purpose: Register page where the user enters their details to register for the app
*/
@observer class Register extends Component {
    constructor() {
        super();
        this.state = {
            fName: '',
            lName: '',
            idNum: '',
            email: '',
            password1: '',
            password2: '',
            checked: false,

            touched: {
                fName: false,
                lName: false,
                idNum: false,
                email: false,
                password1: false,
                password2: false,
            },
        };
    }

    updateChecked = event => {
        this.setState({ checked: event.target.checked})
    }
    /*
    * Purpose: Sets the 'store.sFName' variable to senders current value
    */
    updateSignUpfNameValue = event => {
        this.setState({ fName: event.target.value });
        this.props.store.sFName = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sLName' variable to senders current value
    */
    updateSignUplNameValue = event => {
        this.setState({ lName: event.target.value });
        this.props.store.sLName = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sEmail' variable to senders current value
    */
    updateSignUpEmailValue = event => {
        this.setState({ email: event.target.value });
        this.props.store.sEmail = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sId' variable to senders current value
    */
    updateSignUpIDValue = event => {
        this.setState({ idNum: event.target.value });
        this.props.store.sId = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sPassword1' variable to senders current value
    */
    updateSignUpPasswordValue1 = event => {
        this.setState({ password1: event.target.value });
        this.props.store.sPassword1 = event.target.value;
    }

    /*
    * Purpose: Sets the 'store.sPassword2' variable to senders current value
    */
    updateSignUpPasswordValue2 = event => {
        this.setState({ password2: event.target.value });
        this.props.store.sPassword2 = event.target.value;
    }

    /*
    * Purpose: Calls the store.signUp() function if all values have been entered correctly
    */
    handleSignup = event => {
        event.preventDefault()
        if (!this.canBeSubmitted()) {
            return;
        }
        this.props.store.signUp();
    }

    /*
    * Purpose: Check whether all fields have been entered correctly
    */
    canBeSubmitted() {
        const errors = validate(this.state.fName, this.state.lName, this.state.idNum, this.state.email, this.state.password1, this.state.password2, this.state.checked);
        let isDisabled = Object.keys(errors).some(x => errors[x]);
        if(this.state.checked) {

        }
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

        const { registered } = this.props.store;
        const errors = validate(this.state.fName, this.state.lName, this.state.idNum, this.state.email, this.state.password1, this.state.password2, this.state.checked);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const { classes } = this.props;

        if (!registered) {
            return (
                <React.Fragment>
                    <CssBaseline />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Avatar src={logo} align='center' className={classes.avatar} />
                            <Typography variant="headline">Register</Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="fname">First Name</InputLabel>
                                    <Input
                                        id="fname"
                                        name="fname"
                                        onChange={this.updateSignUpfNameValue}
                                        error={(shouldMarkError('fname') ? true : false)}
                                        onBlur={this.handleBlur('fname')}
                                        value={this.state.fName}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="lname">Last Name</InputLabel>
                                    <Input
                                        id="lname"
                                        name="lname"
                                        onChange={this.updateSignUplNameValue}
                                        error={(shouldMarkError('lname') ? true : false)}
                                        onBlur={this.handleBlur('lname')}
                                        value={this.state.lname}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        autoComplete="on"
                                        onChange={this.updateSignUpEmailValue}
                                        error={(shouldMarkError('email') ? true : false)}
                                        onBlur={this.handleBlur('email')}
                                        value={this.state.email}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="idNum">ID Number</InputLabel>
                                    <Input
                                        id="idNum"
                                        name="idNum"
                                        onChange={this.updateSignUpIDValue}
                                        error={(shouldMarkError('idNum') ? true : false)}
                                        onBlur={this.handleBlur('idNum')}
                                        value={this.state.idNum}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password1">Password</InputLabel>
                                    <Input
                                        id="password1"
                                        name="password1"
                                        type="password"
                                        onChange={this.updateSignUpPasswordValue1}
                                        error={(shouldMarkError('password1') ? true : false)}
                                        onBlur={this.handleBlur('password1')}
                                        value={this.state.password1}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                                    <Input
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        onChange={this.updateSignUpPasswordValue2}
                                        error={(shouldMarkError('password2') ? true : false)}
                                        onBlur={this.handleBlur('password2')}
                                        value={this.state.password2}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={this.state.checked}
                                            onChange={this.updateChecked}
                                            value="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label={<TermsDialog/>}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="raised"
                                    color="primary"
                                    onClick={this.handleSignup} 
                                    className={classes.submit}
                                    disabled={isDisabled}
                                >
                                    Register
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </React.Fragment>
            );
        } else {
            return (
                <Redirect to={{
                    pathname: "/Login",
                }} />
            );
        }
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
