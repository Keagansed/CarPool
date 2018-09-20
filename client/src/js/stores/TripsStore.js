// File Type: Store

import { action, observable } from 'mobx';

import { getFromStorage } from '../utils/localStorage.js'
import ServerURL from '../utils/server';

class tripsStore {

    @observable allUsers = [];
    @observable routeObj = {};
    @observable tripObj = {};

    @observable tripName;
    @observable carpoolID;
    @observable idBy = getFromStorage('sessionKey').token;
    @observable dateTime = new Date();
    @observable days = {mon:false,tue:false,wed:false,thu:false,fri:false,sat:false,sun:false};
    @observable users = {};
    @observable tripID;

    @observable trips =[];
    @observable upcomingTrips = [];
    @observable previousTrips = [];

    @action getAllUsers = (token) => {
        fetch(ServerURL + '/api/account/profile/getAllUsers?token=' + token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.allUsers = json.data;
                }else{
                    console.log(json);
                    console.log("Failed to retrieve User list");
                }
            });
    }

    
    @action getUsername = (userId) => {

        let found = false;
       
        for( let x = 0; x < this.allUsers.length && !found; x++){
            
            if(this.allUsers[x]._id === userId){
                found = true;
                return (this.allUsers[x].firstName);
            }
        }
    }

    @action getUsernameSurname = (userId) => {
        let found = false;
        
        for( let x = 0; x < this.allUsers.length && !found; x++){
            if(this.allUsers[x]._id === userId){
                found = true;
                return (this.allUsers[x].firstName+ " "+ this.allUsers[x].lastName);
            }
        }
    
    }


    @action getAllTripData = (token,tripId ) => {
        fetch(ServerURL + '/api/system/trip/getAllTripInfo?_id=' +tripId + '&token=' + token)
        .then( res => res.json())
        .then(json => {
            if(json.success){
                this.routeObj = json.routeData[0];
                this.tripObj = json.tripData[0];
                console.log(json);
            }else{
                console.log(json);
            }
        });
    }

    @action getFilteredTrips = (token) =>{
        fetch(ServerURL + '/api/system/trip/getFilteredTrips?token='+token)
        .then(res => res.json())
        .then(json => {
            if(json.success){
                this.upcomingTrips = json.data.upcomingTripComponentsArr;
                this.previousTrips = json.data.previousTripComponentsArr;
            }else{
                console.log(json);
            }
        });                                        
    }

    @action getTrip = (token) => {
        fetch(ServerURL + '/api/system/trip/getTrips?token='+ token)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.trips = json.data
            } else {
                console.log(json);
            }
        });
    }

    @action addTrip = (suggestTrip, messageContent, users, token) => {
        fetch(ServerURL + '/api/system/trip/addTrip?token=' + token,{
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

    @action addTripWithoutFirebase = () => {
        fetch(ServerURL + '/api/system/trip/addTrip?token=' + getFromStorage('sessionKey').token,{
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

            }else{
                alert(json.message);
            }
        })
    }

}

const TripsStore = new tripsStore();

export default TripsStore;