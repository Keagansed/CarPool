import { observable, action } from 'mobx';

class settingsPageStore {

    @observable token = '';
    @observable profileTab = true;
    @observable trustTab = false;
    @observable alertsTab = false;

    @action toggleToProfile = () =>
    {
        this.profileTab = false;
        this.trustTab = false;
        this.alertsTab = true;
    }

    @action toggleToTrust = () =>
    {
        this.profileTab = true;
        this.trustTab = false;
        this.alertsTab = false;
    }

    @action toggleToAlerts = () =>
    {
        this.profileTab = false;
        this.trustTab = true;
        this.alertsTab = false;
    }

}

const  SettingsPageStore = new settingsPageStore();
export default SettingsPageStore;