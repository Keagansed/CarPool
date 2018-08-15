import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Navbar from '../../js/components/navigation/Navbar';
import ProfilePage from '../../js/containers/ProfilePage';
import ProfileStore from "../../js/stores/ProfileStore";
import React from 'react';

// class MockStore {
//     user = {};
//     secLvl = 0;
//     profileFound = false;
//     token = null;
//     opacity = "opacity-0";
//     firstName = '';
//     lastName = '';
//     email = '';
//     idNum = '';
//     profilePic = '';
//     vouchTab = true;
//     trustTab = false;

//     getProfile = (token) => {
//         this.token = token;
//         this.user = {};
//         this.firstName = "Test";
//         this.lastName = "Tester";
//         this.email = "test@email.com";
//         this.opacity = "";
//         this.profilePic = "img";
//         this.secLvl = 5;
//     }

//     toggleToVouch = () => {
//         this.vouchTab = true;
//         this.trustTab = false;
//     }

//     toggleToTrust = () => {
//         this.trustTab = true;
//         this.vouchTab = false;
//     }
// }

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