import React from 'react';
// import ReactDOM from 'react-dom';
import VerificationDocuments from '../../js/components/VerificationDocuments';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('VerificationDocuments Component', () => {
    const match = { params: { _id: '123Foo' } };
    let container;

    beforeEach(() => {
        container = shallow(<VerificationDocuments match={match} />);
    });

    it('captures snapshot', () => {
        const wrapper = renderer.create(<VerificationDocuments match={match} />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});
