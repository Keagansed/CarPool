// File Type: Store

import { action, observable } from 'mobx';

import app from '../stores/FirebaseStore.js'

/*
 Provides a store for variables and methods for carpools
 */
class carpoolStore {

    // Stores the string name of the carpool
    @observable carpoolName;

    // Stores the string users in the carpool
    users = "";

    // Stores the array of routes the carpool is for
    @observable routes = [];

    // Stores the string carpool ID
    @observable carpoolID;

    // Stores boolean value of whether or not colours have been taken
    @observable colours = {0:false,1:false,2:false,3:false,4:false,5:false,6:false};

    /*
        Method responsible for making an API call to add a carpool
        Takes the carpool offer ID as a variable which is a string
        Calls getRandomColour
     */
    @action addCarpool = (offerId, token) => {
        fetch('/api/system/offers/acceptInvite?offerId=' + offerId + '&token=' + token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                if(json.success) {
                    this.carpoolID = json._id;
                    this.carpoolName = json.carpoolName;
                    this.routes = json.routes;
                    this.getCarpool(this.carpoolID, token);
                }else{
                    alert(json.message);
                }
            });
    };

    /*
        Method responsible for choosing a random colour for the user's messages to appear as in the group chat
        Returns a random colour in the form of a string which represents a class in ./client/src/css/AllPages.css
     */
    getRandomColour() {
        // Stores array of string classes for the colours
        let colours = {
            0:"txt-yellow",
            1:"txt-red",
            2:"txt-orange",
            3:"txt-lightBlue",
            4:"txt-pink",
            5:"txt-mediumPurple",
            6:"txt-lime"
        };

        // Stores random int to select a colour from the array
        let number = Math.floor(Math.random() * 7);

        if(!this.colours[number]) {
            // Stores temp array of colours so that colours can be manipulated and stored again
            let temp = this.colours;

            temp[number] = true;
            this.colours = temp;
            return colours[number];
        } else{
            return this.getRandomColour();
        }
    }

    /*
        Method responsible for getting a carpool after it has been created by making an API call
        It then takes the carpool that was created in the mongoDB database and creates a group chat on firebase
     */
    @action getCarpool(id, token) {
        fetch('/api/system/carpool/getCarpool?_id=' + id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success){
                this.routes = json.data[0].routes;
                this.carpoolName = json.data[0].carpoolName;
                this.carpoolID = id;

                // Stores string for users which is later parsed to a JSON object
                let users = "{";

                // Stores integer count to check if the loop reaches the end (to make it synchronous)
                let count = 0;

                // Stores date as a string
                let dateStr = JSON.stringify(new Date());

                // Puts dateStr in the correct string format to be stored in firebase
                let date = "\\\"" +  dateStr.substr(1,dateStr.length - 2) + "\\\"";

                this.routes.forEach(route => {
                    fetch('api/system/route/getRoute?routeId=' + route.id + '&token=' + token,{
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json'
                        },
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(json => {
                        if(json.success) {
                            count++;
                            users = users + "\""  + json.data[0].userId + "\":{\"lastRefresh\":\"" + date + "\",\"colour\":\"" + this.getRandomColour() ;
                            if(count === this.routes.length) {
                                users = users + "\"}";
                            }
                            else{
                                users = users + "\"},";
                            }
                        }
                        else{
                            console.log("Unable to retrieve route");
                        }

                        if(count === this.routes.length) {
                            users = users + "}";
                            users = JSON.parse(users);
                            this.groupChats = app.database().ref().child('groupChats');
                            this.groupChats.push().set({name: this.carpoolName, users: users, carpoolID: this.carpoolID});
                        }
                    });
                });                     
            }
            else{
                console.log("Unable to retrieve carpool");
            }
        })
    }

}

// Singleton instance of CarpoolStore class
const CarpoolStore = new carpoolStore();

export default CarpoolStore;