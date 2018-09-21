import React from 'react';
import Routes from '../../js/components/route/Routes';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    loadingRoutes = false;
    routes = [];

    getRoutes = (token) => {
        let route = {
            _id: "123",
            routeName: "TestRoute",
            startLocation: {},
            endLocation: {},
            days: "",
            time: "00:00",
            repeat: false,
        }
        this.routes.push(route);
    }
}

describe('Routes Component', () => {
    let token, container, instance, mockStore;

    beforeEach(() => {
        mockStore = new MockStore();
        token = "testtoken123";
        container = shallow(<Routes store={mockStore} token={token} />);
        instance = container.instance();
    });

    it ('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><Routes store={mockStore} token={token} /></MemoryRouter>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it ('renders correctly', () => {
        expect(container.length).toEqual(1);
    });

    it ('loads spinner when loading routes', () => {
        mockStore = new MockStore();
        mockStore.loadingRoutes = true;
        container = shallow(<Routes store={mockStore} token={token} />);
        expect(container.exists(".spinner")).toEqual(true);
        expect(container.exists("Route")).toEqual(false);
    });

    it ('displays route component after loading', () => {
        expect(container.exists("Route")).toEqual(true);
        expect(container.exists(".spinner")).toEqual(false);
    });

});