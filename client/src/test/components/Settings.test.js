import React from 'react';
import Settings from '../../js/components/Settings';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';

describe('Settings Page Component', () => {
    const mockStore = configureStore();
    let store, container;
    const initialState = {token:"123Foo"};

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<MemoryRouter><Settings store={store} /></MemoryRouter>);
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><Settings store={store} /></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});