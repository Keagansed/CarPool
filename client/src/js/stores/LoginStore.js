import { observable, action } from 'mobx';
import { authenticate } from '../utils/loginQuery';

class loginStore {

    @observable token = null;
    @observable loggedIn = false;

    @action setToken = (token) => {
        this.token = token;        
    }
    @action setLoggedIn = (success) => {
        this.loggedIn = success;
    }

    @action authenticate = () => {

        

        // await fetch('/api/account/signin',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         email:$("#signInemail").val(),
        //         password:$("#signInpass").val()
        //     })
        // })
        // .then(res=>res.json())
        // .catch(error => console.error('Error:', error))
        // .then(json=>{
        //     if(json.success)
        //     {
        //         setInStorage('sessionKey',{token:json.token});
        //         LoginStore.setToken(json.token);
        //         LoginStore.setLoggedIn(json.success);
        //     }else{
        //         alert(json.message);
        //     }
        // }) 
    }

}

const LoginStore = new loginStore();

export default LoginStore;