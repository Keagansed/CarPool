// File Type: Store

import { observable, action } from 'mobx';

import ServerURL from '../utils/server';

class settingsPageStore {
    @observable token = '';
    @observable profileTab = true;
    @observable alertsTab = false;
    @observable reportedProblem = '';

    @action toggleToProfile = () =>{
        this.profileTab = true;
        this.alertsTab = false;
    }
    @action toggleToAlerts = () =>{
        this.profileTab = false;
        this.alertsTab = true;
    }

    /*
        Method to email the user that the reported problem is
        being looked at. And email the reported problem to our email.
     */
    @action sendProblem = () => {
        fetch(ServerURL + '/api/account/emailProblem',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                reportedProblem: this.reportedProblem,
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success) {
                console.log("Problem sent to admin.");
            }else{
                console.log("Error when forwarding email.");
            }
        })
    };
}

const  SettingsPageStore = new settingsPageStore();
export default SettingsPageStore;