// File Type: Store

import {  action, computed, observable } from 'mobx';

import { calcSecLvl } from '../utils/trustFactor.js';
import ServerURL from '../utils/server';

class profileStore {

    @observable user = {};
    @observable secLvl = 0;    
    @observable profileFound = false;
    @observable token = null;
    @observable opacity = "opacity-0"; //This is to help with how the page looks while it's loading data

    @computed get firstName() { return this.user.firstName}
    @computed get lastName() {return this.user.lastName}
    @computed get email() { return this.user.email}
    @computed get idNum() { return this.user.id}
    @computed get profilePic() { return this.user.profilePic };
    @computed get hasCarRegistration() { 
        if (this.user.CarRegistration === "")
            return false;
        else
            return true;
    };
    @computed get hasIdDocument() { 
        if (this.user.IdDocument === "")
            return false;
        else
            return true;
    };
    @computed get hasdriversLicense() { 
        if (this.user.driversLicense === "")
            return false;
        else
            return true;
    };
    @computed get hasClearance() { 
        if (this.user.ClearanceCertificate === "")
            return false;
        else
            return true;
    };
    @computed get hasCarPic() { 
        if (this.user.CarPic === "")
            return false;
        else
            return true;
    };

    @action getProfile = (token, userId) => {    

        fetch(ServerURL + '/api/account/profile?token=' + token + '&userId=' + userId)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
		.then((json) => {
            if (json.success) {
                this.token = token;                   
                this.user = json.data[0];
                this.profileFound = true;
                this.opacity = "";
                this.setEdit();

                fetch(ServerURL + '/api/account/vouch/getVouches?idFor=' + userId)
                .then(res => res.json())
                .then(vouches => {
                    if (vouches.success) {
                        this.secLvl = calcSecLvl(this.user, vouches.data);
                    }else{
                        console.log(vouches);
                    }
                });

            }else{
                console.log(json)
            }
        })
    }

    //Editing profile

    @observable editMode = false;
    @observable eFName = '';
    @observable eLName = '';
    @observable eEmail = '';
    @observable eID = '';
    @observable ePass = '';
    @observable eNewPass = '';
    @observable token = '';
    @observable vouchTab = true;
    @observable trustTab = false;

    @action toggleToVouch = () =>{
        this.vouchTab = true;
        this.trustTab = false;
    }

    @action toggleToTrust = () =>{
        this.trustTab = true;
        this.vouchTab = false;
    }

    setEdit = () => {
        this.eFName = this.firstName;
        this.eLName = this.lastName;
        this.eEmail = this.email;
        this.eID = this.idNum;
    }

    @action editSubmit = () => {

        fetch(ServerURL + '/api/account/updateProfile',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName: this.eFName,
                lastName: this.eLName,
                email: this.eEmail,
                id: this.eID,
                pass: this.ePass,
                newPass: this.eNewPass,
                _id: this.token
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success){
                console.log("Successfully updated!");
                this.editMode = false;

                this.user.firstName = this.eFName;
                this.user.lastName = this.eLName;
                this.user.idNum = this.eID;
                this.user.email = this.eEmail;   
            }else{
                console.log(json.message);
            }
        });
    }

    //Tab Switching

    @observable tripsTab = true;
    @observable vouchesTab = false;
    @observable detailsTab = false;

    @action toggleToTrips = () =>{
        this.tripsTab = true;
        this.vouchesTab = false;
        this.detailsTab = false;
    }

    @action toggleToVouches = () =>{
        this.tripsTab = false;
        this.vouchesTab = true;
        this.detailsTab = false;
    }

    @action toggleToDetails = () =>{
        this.tripsTab = false;
        this.vouchesTab = false;
        this.detailsTab = true;
    }

}

const ProfileStore = new profileStore();

export default ProfileStore;