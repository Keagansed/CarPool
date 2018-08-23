// File Type: Store

import { action, observable } from 'mobx';

import { getFromStorage, setInStorage } from '../utils/localStorage.js'

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
        First checks if the passwords match, if they do then the API call is made
     */
    @action signUp = () => {
        if(this.sPassword1 !== this.sPassword2) {
            alert("Passwords do not match");
        }
        else{
            fetch('/api/account/signup',{
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
                    alert("Successfully signed up!!");
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
        fetch('/api/account/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: this.lEmail,
                password: this.lPassword
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success) {
                setInStorage('sessionKey',{ token:json.token });
                this.setToken(json.token);
                this.setLoggedIn(json.success);
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
        this.setRegistered(false);
        fetch('/api/account/emailPassword',{
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
                this.noEmailError = '';
            }else{
                this.noEmailError = 'Email not recognized, please try again.';
            }
        })
    };

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

          fetch('/api/account/logout?token='+token)
           .then(res => res.json())
           .then(json => {
                this.setLoggedIn(false);
                this.setToken('');
           });
        }
    };

}

// Singleton instance of LoginStore class
const LoginStore = new loginStore();

export default LoginStore;