import React from 'react';
import Settings from '../js/components/Settings';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

describe('Settings Page Component', () => {
    const mockStore = configureStore()
    let store, container

    beforeEach(() => {
        store = mockStore();
        container = shallow(<Settings store={store} />)
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });
});