import React from 'react';
import NavTabs from '../../js/components/home/NavTabs';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('NavTabs Component', () => {
    let container;

    beforeEach(() => {
        container = shallow(<NavTabs />);
    });

    it('captures snapshot', () => {
        const wrapper = renderer.create(<NavTabs />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});
