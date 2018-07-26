import React from 'react';
import LoginPage from '../../js/containers/LoginPage';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer';

describe('Login Page Component', () => {   //always gives errors
    const mockStore = configureStore()
    let store, container;

    beforeEach(() => {
        store = mockStore();
        container = shallow(<LoginPage store={store} />)
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<LoginPage store={store} />).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });
});