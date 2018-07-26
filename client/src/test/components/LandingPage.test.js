import React from 'react';
import LandingPage from '../../js/containers/LandingPage';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Landing Page Component', () => {

    // Render within a <MemoryRouter> component to mitigate "<Link> outside of <Router>" warnings
    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><LandingPage /></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<LandingPage />)
        expect(wrapper.length).toEqual(1);
    });
});