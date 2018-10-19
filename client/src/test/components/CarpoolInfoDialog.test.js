import React from 'react';
import CarpoolInfoDialog from '../../js/components/carpool/CarpoolInfoDialog';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('CarpoolInfoDialog Component', () => {

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<CarpoolInfoDialog />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<CarpoolInfoDialog />)
        expect(wrapper.length).toEqual(1);
    });
});