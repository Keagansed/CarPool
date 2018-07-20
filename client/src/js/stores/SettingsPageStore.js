import { observable, action } from 'mobx';

class settingsPageStore {

    @observable token = '';
    @observable profileTab = true;
    @observable alertsTab = false;

    @action toggleToProfile = () =>{
        this.profileTab = true;
        this.alertsTab = false;
    }
    @action toggleToAlerts = () =>{
        this.profileTab = false;
        this.alertsTab = true;
    }

}

const  SettingsPageStore = new settingsPageStore();
export default SettingsPageStore;