import { observable, action } from 'mobx';
import { setInStorage, getFromStorage } from '../utils/localStorage.js'
//import register from '../registerServiceWorker.js';

class loginStore {

    @observable token = null;
    @observable loggedIn = false;
    @observable registered = false;

    @observable lEmail = '';
    @observable lPassword = '';

    @observable sFName = '';
    @observable sLName = '';
    @observable sEmail = '';
    @observable sPassword1 = '';
    @observable sPassword2 = '';
    @observable sId = '';

    @action setToken = (token) => {
        this.token = token;        
    }
    @action setLoggedIn = (success) => {
        this.loggedIn = success;
        this.lEmail = '';
        this.lPassword = '';
    }

    @action setRegistered = (value) => {
        this.registered = value;
    }

    @action signUp = () => {
        if(this.sPassword1 !== this.sPassword2)
        {
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
                if(json.success){
                    alert("Successfully signed up!!");
                    this.setRegistered(true);                    
                }else{
                    alert(json.message);
                }
            })
        }
    }

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
            if(json.success)
            {
                setInStorage('sessionKey',{token:json.token});
                this.setToken(json.token);
                this.setLoggedIn(json.success);
            }else{
                alert(json.message);
            }
        }) 
    }

    @action logOut = () => {
    
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
          //verify token
          const { token } = obj;
          fetch('/api/account/logout?token='+token)
           .then(res => res.json())
           .then(json => {
                this.setLoggedIn(false);
                this.setToken('');
           });
        }

    }

}

const LoginStore = new loginStore();

export default LoginStore;