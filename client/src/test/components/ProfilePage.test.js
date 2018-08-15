import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Navbar from '../../js/components/navigation/Navbar';
import ProfilePage from '../../js/containers/ProfilePage';
import ProfileStore from "../../js/stores/ProfileStore";
import React from 'react';

describe('Profile Page Component', () => {
    let props;
    let mountedProfilePage;

    const profilePage = () => {
        if (!mountedProfilePage) {
            mountedProfilePage = mount(
                <MemoryRouter>
                    <ProfilePage {...props} />
                </MemoryRouter>
            );            
        }
        mountedProfilePage.setState({ token: 'something-not-null' });
        
        return mountedProfilePage;
    }

    beforeEach(() => {
        props = {
            store: ProfileStore,
        };
        mountedProfilePage = undefined;
    });

    it("always renders a div", () => {
        const divs = profilePage().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders 'Navbar'", () => {
        const nav = profilePage().find(Navbar);
        expect(nav.length).toBe(1);
    });
});