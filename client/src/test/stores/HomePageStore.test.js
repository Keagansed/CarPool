import HomePageStore from "../../js/stores/HomePageStore";

describe ('HomePage Store test functions', () => {
    let data, values;

    it('sets defaults correctly', () => {
        data = {
            token: HomePageStore.token,
            carpool: HomePageStore.carpoolTab,
            tripTab: HomePageStore.tripTab,
            routeTab: HomePageStore.routeTab
        };

        values = {
            token: '',
            carpool: false,
            tripTab: false,
            routeTab: true
        };

        expect(data).toEqual(values);
    });

    it('toggles to carpool correctly', () => {
        HomePageStore.toggleToCarpool();
        data = {
            carpool: HomePageStore.carpoolTab,
            tripTab: HomePageStore.tripTab,
            routeTab: HomePageStore.routeTab
        };
        values = {
            carpool: true,
            tripTab: false,
            routeTab: false
        };  

        expect(data).toEqual(values);
    });

    it('toggles to trip correctly', () => {
        HomePageStore.toggleToTrip();
        data = {
            carpool: HomePageStore.carpoolTab,
            tripTab: HomePageStore.tripTab,
            routeTab: HomePageStore.routeTab
        };
        values = {
            carpool: false,
            tripTab: true,
            routeTab: false
        };  

        expect(data).toEqual(values);
    });

    it('toggles to route correctly', () => {
        HomePageStore.toggleToRoute();
        data = {
            carpool: HomePageStore.carpoolTab,
            tripTab: HomePageStore.tripTab,
            routeTab: HomePageStore.routeTab
        };
        values = {
            carpool: false,
            tripTab: false,
            routeTab: true
        };  

        expect(data).toEqual(values);
    });
});