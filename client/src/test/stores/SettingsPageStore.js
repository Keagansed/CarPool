import SettingsPageStore from '../../js/stores/SettingsPageStore';

describe ('Settings Page Store test functions', () => {
    let data, values;
    it ('toggles to profile correctly', () => {
        values = {
            profileTab : true,
            alertsTab : false
        }

        SettingsPageStore.toggleToProfile();

        data = {
            profileTab : SettingsPageStore.profileTab,
            alertsTab : SettingsPageStore.alertsTab
        }
        expect(data).toEqual(values);
    });

    it ('toggles to alerts correctly', () => {
        values = {
            profileTab : false,
            alertsTab : true
        }

        SettingsPageStore.toggleToAlerts();

        data = {
            profileTab : SettingsPageStore.profileTab,
            alertsTab : SettingsPageStore.alertsTab
        }
        expect(data).toEqual(values);
    });
});