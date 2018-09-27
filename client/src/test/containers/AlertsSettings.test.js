import React from 'react';
import AlertsSettings from '../../js/containers/AlertsSettings';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('AlertsSettings Component', () => {

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<AlertsSettings />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<AlertsSettings />)
        expect(wrapper.length).toEqual(1);
    });
});