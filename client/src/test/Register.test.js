import React from 'react';
import Register from '../js/components/RegisterPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'


describe('Register Component', () => {
    const mockStore = configureStore()
    let store, container

    beforeEach(() => {
        store = mockStore();
        container = shallow(<Register store={store} />)
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });

});