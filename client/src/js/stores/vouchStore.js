import { action } from 'mobx';

import {
    getFromStorage
} from '../utils/localStorage.js'

class vouchStore {
    @action submitVouch(tripID, idFor, rating, reviewBody){
        const obj = getFromStorage('sessionKey');
        fetch('/api/account/submitVouch',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tripID:tripID,
                idBy:obj.token,
                idFor:idFor,
                rating:rating,
                date:new Date(),
                reviewBody:reviewBody
            })
        }).then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
            });
    }
}

const VouchStore = new vouchStore();

export default VouchStore;