// File Type: Store

import { action,observable  } from 'mobx';

/*
    Provides a store for variables for carpool offers
 */
class OfferStore {
    // Stores the string name of the carpool
    @observable CarpoolName = '';

    // Stores the string ID of the person who is making the offer
    @observable senderId = '';

    // Stores the string ID of the route the sender is makign the offer from
    @observable senderRoute = '';

    // Stores the string ID of the person receiving the offer
    @observable recieverId = '';

    // Stores the string ID of the receiver's route
    @observable recieverRoute = '';

    // Stores the boolean value of whether they are creating a new carpool or joining one
    @observable join = false;

    @observable userProfile = {};
    
    /*
        Constructor responsible for initializing variables for the offer
        All variables are string except join which is boolean
     */
    constructor(CarpoolName, senderId, senderRoute, recieverId, recieverRoute, join){
        this.CarpoolName = CarpoolName;
        this.senderId = senderId;
        this.senderRoute = senderRoute;
        this.recieverId = recieverId;
        this.recieverRoute = recieverRoute;
        this.join = join;
    }

    @action getUserProfile = (token) =>{
        fetch('/api/account/profile?token=' + token + '&userId=' + this.senderId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {            
            if (json.success){
                this.userProfile = json.data[0];
            }else{
                console.log(json);
            }
        })
    }
}

export default OfferStore;