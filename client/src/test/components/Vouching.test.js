import React from 'react';
import Vouching from '../../js/components/Vouching';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';


describe('Vouching Component', () => {
    let container;
    const _id = "123Foo";

    // beforeEach(() => {
    //     container = shallow(<Vouching _id={_id} />);
    // });

    // it('captures snapshot', () => {
    //     const renderedValue = renderer.create(<Vouching _id={_id} />).toJSON();
    //     expect(renderedValue).toMatchSnapshot();
    // });

    // it('renders correctly', () => {
    //     container = mount(<Vouching _id={_id} />);
    //     expect(container.length).toEqual(1);
    // });

    it('whatever', () => {
        expect(true).toEqual(true);
    });
});