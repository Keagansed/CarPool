import React from 'react';
import Settings from '../../js/containers/SettingsPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    token = '';
    profileTab = true;
    alertsTab = false;

    toggleToProfile = () => {
        this.profileTab = true;
        this.alertsTab = false;
    };

    toggleToAlerts = () => {
        this.alertsTab = true;
        this.profileTab = false;
    };
}

describe('Settings Page Component', () => {
    let mockStore, container;

    beforeAll(() => {
        mockStore = new MockStore();
        container = shallow(<MemoryRouter><Settings store={mockStore} /></MemoryRouter>);
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><Settings store={mockStore} /></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});