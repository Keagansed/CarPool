import React from 'react';
import LandingPage from '../js/components/landing/LandingPage';
import { shallow } from 'enzyme';
// let renderer = require('react-test-renderer');

describe('Landing Page Component', () => {
    it('renders correctly', () => {
        // const tree = renderer.create(<LandingPage />).toJSON();
        // expect(tree).toMatchSnapshot();

        expect(shallow(<LandingPage />).exists(<div className="container"></div>)).toBe(true);
    });

    it('displays tabs correctly', () => {
        const testVal = false;
        expect(testVal).toBe(true);
    });

});