import React from 'react';
import InfoPage from '../../js/containers/InfoPage';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('InfoPage Component', () => {

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><InfoPage /></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<MemoryRouter><InfoPage /></MemoryRouter>)
        expect(wrapper.length).toEqual(1);
    });
});