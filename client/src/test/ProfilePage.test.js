import React from 'react';
import ProfilePage from '../js/components/ProfilePage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

describe('Profile Page Component', () => {
    const initialState = {firstName: "Tested", lastName: "Test", profilePic:"",secLvl:"1",email:"test@gmail.com",idNum:"1234567890123"}
    const mockStore = configureStore()
    let store, container

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ProfilePage store={store} />)
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });
});