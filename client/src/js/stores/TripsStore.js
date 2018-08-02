// File Type: Store

import { action, observable } from 'mobx';

import { getFromStorage } from '../utils/localStorage.js'

class tripsStore {

    @observable tripName;
    @observable carpoolID;
    @observable idBy = getFromStorage('sessionKey').token;
    @observable dateTime = new Date();
    @observable days = {mon:false,tue:false,wed:false,thu:false,fri:false,sat:false,sun:false};
    @observable users = {};
    @observable tripID;

    @action addTrip = (suggestTrip,messageContent,users) => {
        fetch('/api/system/addTrip',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tripName: this.tripName,
                carpoolID: this.carpoolID,
                idBy: this.idBy,
                dateTime: this.dateTime,
                days: this.days,
                users: this.users,
                driver: this.idBy,
            })
        })
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
                if(json.success){
                    this.tripID = json._id;
                    suggestTrip(messageContent, getFromStorage('sessionKey').token, users, this.tripID);
                }else{
                    alert(json.message);
                }
            })
        }

}

const TripsStore = new tripsStore();

export default TripsStore;