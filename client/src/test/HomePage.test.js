import React from 'react';
import HomePage from '../js/components/HomePage';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'


describe('Home Page Component', () => { //always gives errors
    const mockStore = configureStore()
    let store, container

    beforeEach(() => {
        store = mockStore();
        container = shallow(<HomePage store={store} />)
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });
});