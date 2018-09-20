import React from 'react';
import IntroPage from '../../js/containers/IntroPage';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('Landing Page Component', () => {

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><IntroPage /></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<MemoryRouter><IntroPage /></MemoryRouter>)
        expect(wrapper.length).toEqual(1);
    });
});