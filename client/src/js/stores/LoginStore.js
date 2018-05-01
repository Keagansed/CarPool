import { observable, action } from 'mobx';
import { setInStorage } from '../utils/localStorage.js'

class loginStore {

    @observable token = null;
    @observable loggedIn = false;

    @action setToken = (token) => {
        this.token = token;        
    }
    @action setLoggedIn = (success) => {
        this.loggedIn = success;
    }

    @action authenticate = (_email, _password) => {  

        fetch('/api/account/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: _email,
                password: _password
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

}

const LoginStore = new loginStore();

export default LoginStore;