import React from 'react';
import HomePage from '../../js/components/home/HomePage';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';


describe('Home Page Component', () => {
    const mockStore = configureStore();
    let store, container;
    const initialState = {token:"123Foo"};

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<MemoryRouter><HomePage store={store} /></MemoryRouter>);
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><HomePage store={store} /></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});