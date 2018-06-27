import React from 'react';
import Register from '../../js/components/register/RegisterPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

describe('Register Component', () => {
    const mockStore = configureStore();
    let store, container;
    
    beforeEach(() => {
        store = mockStore();
        container = shallow(<Register store={store} />);
    });
    
    it('captures snapshot', () => {
        const renderedValue = renderer.create(<Register store={store} />).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
  
    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});