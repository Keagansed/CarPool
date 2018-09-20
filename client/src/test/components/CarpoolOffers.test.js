import React from 'react';
import CarpoolOffers from '../../js/components/carpool/CarpoolOffers';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    offers = [];
    loadingOffers = true;
    createCarpoolOffer = false;
    joinCarpoolOffer = false;

    getOffers = () => {
        this.offers.push({
            CarpoolName : "TestCarpool",
            SenderID : "sender123",
            SenderRoute : {},
            RecieverID : "reciever123",
            RecieverRout : {},
            JoinRequest : false
        });
    };

    makeOffer = (carpoolName, senderId, senderRoute, recieverId, recieverRoute, join, carpoolID) => {
        createCarpoolOffer = true;
    };

    makeOfferToJoin = () => {
        joinCarpoolOffer = true;
    };
}

describe('Carpool Offers Component', () => {
    let props, container, instance, mockStore;

    beforeEach(() => {
        mockStore = new MockStore();
        
        // props = {
        //     store: mockStore,
        //     token: "1234"
        // };
        container = shallow(<CarpoolOffers store={mockStore} token="1234"/>);
        instance = container.instance();
    });

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><CarpoolOffers store={mockStore} token="1234"/></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        expect(container.length).toEqual(1);
    });

    it('does something productive', () => {
        expect(instance.props.store.offers.length).toEqual(1);
    });

});