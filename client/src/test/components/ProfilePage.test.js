import React from 'react';
import ProfilePage from '../../js/containers/ProfilePage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ProfileStore from "../../js/stores/ProfileStore";

class MockStore {
    user = {};
    secLvl = 0;
    profileFound = false;
    token = null;
    opacity = "opacity-0";
    firstName = '';
    lastName = '';
    email = '';
    idNum = '';
    profilePic = '';
    vouchTab = true;
    trustTab = false;

    getProfile = (token) => {
        this.token = token;
        this.user = {};
        this.firstName = "Test";
        this.lastName = "Tester";
        this.email = "test@email.com";
        this.opacity = "";
        this.profilePic = "img";
        this.secLvl = 5;
    }

    toggleToVouch = () => {
        this.vouchTab = true;
        this.trustTab = false;
    }

    toggleToTrust = () => {
        this.trustTab = true;
        this.vouchTab = false;
    }
}

describe('Profile Page Component', () => {
    const match = { params: { _id: '123Foo' } };
    let container, instance, mockStore;

    beforeAll(() => {
        mockStore = new MockStore();
        container = shallow(<ProfilePage store={mockStore} match={match} />);
        instance = container.instance;
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<ProfilePage store={mockStore} match={match} />).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});