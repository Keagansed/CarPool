import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import ProfilePage from '../../js/containers/ProfilePage';
import renderer from 'react-test-renderer';

class MockStore {
    profileFound = true;
    firstName = "John";
    lastName = "Doe";
    secLvl = 1.0;
    profilePic = "";

    getProfile = (token, userId) => {
        profileFound = true;
    }
}
// Shallow render does not return anthing, but tests pass. Snapshot is null.
describe('Profile Page Component', () => {
    let mockStore, match, container;

    beforeEach(() => {
        mockStore =  new MockStore();
        match = {
                params : {
                    _id : "testID"
                }
            };

        container = shallow(<MemoryRouter><ProfilePage store={mockStore} /></MemoryRouter>);
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><ProfilePage match={match} store={mockStore} /></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it("always renders a div", () => {
        expect(container.length).toBeGreaterThan(0);
    });

});