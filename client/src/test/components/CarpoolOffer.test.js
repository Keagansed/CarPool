import React from 'react';
import CarpoolOffer from '../../js/components/carpool/CarpoolOffer';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    CarpoolName = "Carpool";
    userProfile = {};
    senderId = "123";
    getUserProfile = (token) => {
        this.userProfile = {   
                firstName: "John",
                lastName: "Doe"
            };
    };
    join = true;
}

describe('Carpool Offer Component', () => {
    let props, container, instance;

    beforeEach(() => {
        let mockStore = new MockStore();
        props = {
            store: mockStore,
            token: "1234"
        };
        container = shallow(<MemoryRouter><CarpoolOffer {...props}/></MemoryRouter>);
        instance = container.instance();
    })

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><CarpoolOffer {...props}/></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        expect(container.length).toEqual(1);
    });

});