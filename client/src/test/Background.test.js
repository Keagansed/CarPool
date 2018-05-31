import React from 'react';
// import ReactDOM from 'react-dom';
import Background from '../js/components/Background';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('Background Component', () => {
    let container;

    beforeEach(() => {
        container = shallow(<Background />);
    });

    it('captures snapshot', () => {
        const wrapper = renderer.create(<Background />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});
