import React from 'react';
import CarpoolInfoModal from '../../js/components/carpool/CarpoolInfoModal';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('CarpoolInfoModal Component', () => {

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<CarpoolInfoModal />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        let wrapper = shallow(<CarpoolInfoModal />)
        expect(wrapper.length).toEqual(1);
    });
});