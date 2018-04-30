import { observable, action } from 'mobx';

class loginStore {

    @observable token = null;
    @observable loggedIn = false;

    @action setToken = (token) => {
        this.token = token;        
    }
    @action setLoggedIn = (success) => {
        this.loggedIn = success;
    }

}

const LoginStore = new loginStore();

export default LoginStore;