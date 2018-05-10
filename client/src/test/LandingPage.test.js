import React from 'react';
import LandingPage from '../js/components/LandingPage';
import { shallow } from 'enzyme';
// let renderer = require('react-test-renderer');

describe('Landing Page Component', () => {
    it('renders correctly', () => {
        // const tree = renderer.create(<LandingPage />).toJSON();
        // expect(tree).toMatchSnapshot();

        expect(shallow(<LandingPage />).exists(<div className="container"></div>)).toBe(true);
    });

});