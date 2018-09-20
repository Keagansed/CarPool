// File Type: Store

import { action, observable } from 'mobx';

import { getFromStorage, setInStorage } from '../utils/localStorage.js'
import ServerURL from '../utils/server';

/*
 Provides a store for variables and methods for the login page
 */
class loginStore {
    // Stores userID token as string
    @observable token = null;

    // Stores toggle state of incorrect login modal
    @observable toggleError = false;

    // Strores boolean value of whether or not the user has logged in
    @observable loggedIn = false;

    // Strores boolean value of whether or not the user has registered
    @observable registered = false;

    // Stores string of email for forgotten password
    @observable forgotEmail = '';

    // Stores string of email for login
    @observable lEmail = '';

    // Stores error message to be displayed if email entered into forgotPasswordModal
    // is not recognized
    @observable noEmailError = '';

    // Stores message to be displayed when user tries to reset password
    @observable passwordChangeMessage = '';

    // Stroes string of password for login
    @observable lPassword = '';

    // Stores string first name for signup
    @observable sFName = '';

    // Stores string last name for signup
    @observable sLName = '';

    // Stores string email name for signup
    @observable sEmail = '';

    // Stores string password for signup
    @observable sPassword1 = '';

    // Stores string second password to verify if they match for signup
    @observable sPassword2 = '';

    // Stores string ID number for signup
    @observable sId = '';

    //Store string for password when user is resetting password
    @observable resetPass = '';

    //Store string for password when user is resetting password
    @observable resetToken = '';

    /*
        Method to set token to the token passed in as a parameter
        Token is string
     */
    @action setToken = (token) => {
        this.token = token;
    };

    /*
        Method to set toggleError to true or false
     */
    @action setToggleError = (_toggleError) => {
        this.toggleError = _toggleError;
    };

    /*
        Method to set the logged in variable to success (true represents the user being logged in)
        Success is boolean
     */
    @action setLoggedIn = (success) => {
        this.loggedIn = success;
        this.lEmail = '';
        this.lPassword = '';
    };

    /*
        Method to set the registered in variable to value (true represents the user being registered)
        Success is boolean
     */
    @action setRegistered = (value) => {
        this.registered = value;
    };

    /*
        Method that makes an API call to register the user
     */
    @action signUp = () => {
        if(this.sPassword1 !== this.sPassword2) {
            alert("Passwords do not match");
        }
        else{
            fetch(ServerURL + '/api/account/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    firstName: this.sFName,
                    lastName: this.sLName,
                    email: this.sEmail,
                    id: this.sId,
                    password: this.sPassword1
                })
            })
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
                if(json.success) {
                    this.setRegistered(true);
                }else{
                    alert(json.message);
                }
            })
        }
    };

    /*
        Method to authenticate a user's sign in
        Makes an API call to signin to verify this
        Sets sessionKey to the user's object ID from the database
     */
    @action authenticate = () => {
        this.setRegistered(false);
        fetch(ServerURL + '/api/account/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: this.lEmail,
                password: this.lPassword
            })
        })
        .then(res=> res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success) {
                setInStorage('sessionKey',{ token:json.token });
                this.setToken(json.token);
                this.setLoggedIn(json.success);
                console.log(json);
                return;
            }else{
                this.setToggleError(true);
                return;
            }
        })
    };

    /*
        Method to email a user a link to reset their password
        Makes an API call to emailPassword to verify this
     */
    @action sendPassword = () => {
        this.noEmailError = 'An email is being sent to you...';
        this.setRegistered(false);
        fetch(ServerURL + '/api/account/emailPassword',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: this.forgotEmail,
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success) {
                this.noEmailError = 'An email has been sent to you.';
            }else{
                this.noEmailError = 'You are not a registered user';
            }
        })
    };

    /*
        Method to reset a user's password from the reset password page
        and log the user in.
     */
    @action resetPassword = () => {
        fetch(ServerURL + '/api/account/resetPassword',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                token: this.resetToken,
                password: this.resetPass,
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success){
                this.passwordChangeMessage = 'Your password has been successfully changed';
                setInStorage('sessionKey',{ token:json.token });
                this.setToken(json.token);
                this.setLoggedIn(json.success);
                return;
            }
            else{
                this.passwordChangeMessage = 'This password reset link is not valid';
            }
        });
    }

    /*
        Method to log a user out
        Makes an API call to destroy the session created when the user logged in
     */
    @action logOut = () => {
        // Stores the user's string object ID from databse
        const obj = getFromStorage('sessionKey');

        if(obj && obj.token) {

          //Stores token to be verified as string
            const { token } = obj;

            fetch(ServerURL + '/api/account/logout?token='+token)
            .then(res => res.json())
            .then(json => {
            this.setRegistered(false);
            this.setLoggedIn(false);
            this.setToken('');

            setInStorage('sessionKey', {});
            });
        }
    };

}

// Singleton instance of LoginStore class
const LoginStore = new loginStore();

export default LoginStore;