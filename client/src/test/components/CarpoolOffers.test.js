import React from 'react';
import CarpoolOffers from '../../js/components/carpool/CarpoolOffers';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    offers = [];
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

    makeOfferToJoin = (carpoolName, senderId, senderRoute, recieverId, recieverRoute, join, carpoolID) => {
        joinCarpoolOffer = true;
    };
}

describe('Carpool Offers Component', () => {
    let token, container, instance, mockStore;

    beforeEach(() => {
        mockStore = new MockStore();
        token = "testtoken123";
        
        container = shallow(<CarpoolOffers store={mockStore} token={token}/>);
        instance = container.instance();
    });

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><CarpoolOffers store={mockStore} token={token}/></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        expect(container.length).toEqual(1);
    });

    it('populates the offers', () => {
        expect(instance.props.store.offers.length).toEqual(1);
    });

});