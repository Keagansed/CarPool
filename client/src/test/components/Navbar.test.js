import React from 'react';
import Navbar from '../../js/components/navigation/Navbar';
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('Navbar Component', () => {
    let container;

    beforeEach(() => {
        container = shallow(<MemoryRouter><Navbar /></MemoryRouter>);
    });

    it('captures snapshot', () => {
        const wrapper = renderer.create(<MemoryRouter><Navbar /></MemoryRouter>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});