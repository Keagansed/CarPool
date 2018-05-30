import React from 'react';
import LandingPage from '../js/components/LandingPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Landing Page Component', () => {
    it ('capturing snapshot', () => {
        const renderedValue = renderer.create(<LandingPage />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<LandingPage />)
        expect(wrapper.length).toEqual(1);
    });
});