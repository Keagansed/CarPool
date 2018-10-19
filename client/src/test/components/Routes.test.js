import React from 'react';
import Routes from '../../js/components/route/Routes';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    loadingRoutes = true;
    routes = [];

    getRoutes = (token) => {
        let route = {
            _id: "123",
            routeName: "TestRoute",
            startLocation: {},
            endLocation: {},
            time: "00:00",
        }
        this.routes.push(route);
    }
}

describe('Routes Component', () => {
    let token, container, mockStore;

    beforeEach(() => {
        mockStore = new MockStore();
        token = "testtoken123";
        container = shallow(<Routes store={mockStore} token={token} />);
    });

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><Routes store={mockStore} token={token} /></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        expect(container.length).toEqual(1);
    });

    // it ('loads spinner when loading routes', () => {
    //     console.log(container);
    //     expect(container.exists(".spinner")).toEqual(true);
    //     expect(container.exists("Route")).toEqual(false);
    // });

    // it ('displays route component after loading', () => {
    //     mockStore.getRoutes(token);
    //     container = mount(<Routes store={mockStore} token={token} />);
    //     expect(container.exists("Route")).toEqual(true);
    //     expect(container.exists(".spinner")).toEqual(false);
    // });

});