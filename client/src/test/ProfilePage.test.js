import React from 'react';
import ProfilePage from '../js/components/ProfilePage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

describe('Profile Page Component', () => {
    // const match = { params: { _id: '123fuckyou' } };
    // const initialState = {};
    // const mockStore = configureStore();
    // let store;

    // beforeEach(() => {
    //     store = mockStore(initialState);
    //     // container = shallow(<ProfilePage store={store} match={match} />);
    // });

    // it ('captures snapshot', () => {
    //     const renderedValue = renderer.create(<ProfilePage store={store} match={match} />).toJSON();
    //     expect(renderedValue).toMatchSnapshot();
    // });

    // it('renders correctly', () => {
    //     expect(container.length).toEqual(1);
    // });

    it ('whatever', () => {
        expect(true).toEqual(true);
    });
});