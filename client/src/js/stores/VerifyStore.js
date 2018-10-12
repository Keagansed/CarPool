// File Type: Store

import { observable, action } from 'mobx';
import ServerURL from '../utils/server';

class verifyStore {

    @observable loading = true;
    @observable redirect = false;

    @action verify = (token) =>{

        fetch(ServerURL + '/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
            if (json) {
                if(json.success) {
                    this.loading = false;
                }else{
                    this.loading = false;
                    this.redirect = true;
                }
            } else {
            }
        })
        .catch(err => {
            console.error(err);
            this.loading = false;
            this.redirect = true;
        });
    }

    @action reset = () =>{
        this.loading = true;
        this.redirect = false;
    }

}

const  VerifyStore = new verifyStore();
export default VerifyStore;