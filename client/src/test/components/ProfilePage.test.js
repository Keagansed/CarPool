import React from 'react';
import ProfilePage from '../../js/components/profile/ProfilePage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ProfileStore from "../../js/stores/ProfileStore";

describe('Profile Page Component', () => {
    const match = { params: { _id: '123Foo' } };
    let container;

    beforeEach(() => {
        container = shallow(<ProfilePage store={ProfileStore} match={match} />);
    });

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<ProfilePage store={ProfileStore} match={match} />).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });
});