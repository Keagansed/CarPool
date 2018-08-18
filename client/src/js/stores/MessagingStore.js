// File Type: Store

import {  action, observable } from 'mobx';

class messageStore {
    @observable allUsers=[];

    @action getAllUsers = (token) => {
        fetch('/api/account/profile/getAllUsers?token=' + token)
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
                this.userName = this.allUsers[x].firstName;
                return this.userName;
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

    @action getUserProfilePic = (userId) => {

        let found = false;
        
        for( let x = 0; x < this.allUsers.length && !found; x++){
            if(this.allUsers[x]._id === userId){
                found = true;

                this.userProfilePicName = this.allUsers[x].profilePic;
                return this.userProfilePicName;
            }
        }

    }
}

const MessageStore = new messageStore();

export default MessageStore;