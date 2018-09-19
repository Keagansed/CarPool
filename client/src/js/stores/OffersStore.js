// File Type: Store

import { action, observable  } from 'mobx';

/*
    Provides a store for variables and methods for the making and getting carpool offers
    It is also responsible for making API calls
 */
class offersStore {
    // Array to store carpool offers
    @observable offers = [];

    /*
        Method to make an API call to get all offers for a user from their ID
        Takes user's ID in as parameter token which is a string
     */
    @action getOffers = (token) => {
        fetch('/api/system/offers/getOffers?token=' + token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success) {
                this.offers = json.data;
            }else{
                console.log("Unable to retrieve offers");
            }
        })
    };
    
    
    /*
        Method to make an offer
        Makes API call to store offer in database
        Takes the carpoolName, senderId, senderRoute, receiverId, receiverRoute and join in as parameters,
        all are string except join which is boolean
     */
    @action makeOffer = (carpoolName, senderId, senderRoute, recieverId, recieverRoute, join) => {        
        fetch('/api/system/offers/makeOffer?token=' + senderId,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                carpoolName: carpoolName,
                senderId: senderId,
                senderRoute: senderRoute,
                recieverId: recieverId,
                recieverRoute: recieverRoute,
                join: join
            })
        }) 
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            //console.log(json);
            if(json.success !== true) {
                window.alert("Failed to create new offer");
            }
            
        })  
        
    };

    /*
     Method to make an offer
     Makes API call to store offer in database
     Takes the carpoolName, senderId, senderRoute, receiverId, receiverRoute and join in as parameters,
     all are string except join which is boolean
     */
    @action makeOfferToJoin = (carpoolName, senderId, senderRoute, recieverId, recieverRoute, join, carpoolID) => {
        fetch('/api/system/offers/makeOfferToJoin?token=' + senderId,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                carpoolName: carpoolName,
                senderId: senderId,
                senderRoute: senderRoute,
                recieverId: recieverId,
                recieverRoute: recieverRoute,
                join: join,
                carpoolID: carpoolID
            })
        })
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
                console.log(json);
                if(json.success !== true) {
                    window.alert("Failed to create new offer");
                }

            })

    }
}

// Singleton instance of OffersStore class
const  OffersStore = new offersStore();
export default OffersStore;

