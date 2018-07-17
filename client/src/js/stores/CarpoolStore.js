import { observable, action } from 'mobx';
import app from '../stores/MessagingStore'

class carpoolStore {

    @observable carpoolName;
    users = "";
    @observable routes = [];
    @observable carpoolID;
    @observable colours = {0:false,1:false,2:false,3:false,4:false,5:false,6:false};

    @action addCarpool = (offerId) => {
        fetch('/api/system/offers/acceptInvite?offerId=' + offerId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                // console.log(json);
                if(json.success){
                    this.carpoolID = json._id;
                    this.carpoolName = json.carpoolName;
                    this.routes = json.routes;
                    this.getCarpool(this.carpoolID);
                }else{
                    alert(json.message);
                }
            });
    };

    getRandomColour(){
        let colours = {0:"txt-yellow",1:"txt-red",2:"txt-orange",3:"txt-lightBlue",4:"txt-pink",5:"txt-mediumPurple",6:"txt-lime"};
        let number = Math.floor(Math.random() * 7);
        if(!this.colours[number])
        {
            let temp = this.colours;
            temp[number] = true;
            this.colours = temp;
            return colours[number];
        }
        else
        {
            return this.getRandomColour();
        }
    }

    @action getCarpool(id){
        fetch('/api/system/carpool/getCarpool?_id='+ id,{
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
                this.users = "{";
                let count = 0;
                this.routes.forEach(route => {
                    fetch('api/system/route/getRoute?_id='+ route,{
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json'
                        },
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(json => {
                        if(json.success){
                            count++;
                            this.users = this.users + "\""  + [json.data[0].userId] + "\":{\"lastRefresh\":" + JSON.stringify(new Date()) + ",\"colour\":\"" + this.getRandomColour() ;
                            if(count === this.routes.length){
                                this.users = this.users + "\"}";
                            }
                            else{
                                this.users = this.users + "\"},";
                            }
                        }
                        else{
                            console.log("Unable to retrieve route");
                        }

                        if(count === this.routes.length){
                            this.users = this.users + "}";
                            this.users = JSON.parse(this.users);
                            this.groupChats = app.database().ref().child('groupChats');
                            this.groupChats.push().set({name: this.carpoolName, users: this.users, carpoolID: this.carpoolID});
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

const CarpoolStore = new carpoolStore();

export default CarpoolStore;