import HomePageStore from "../../js/stores/HomePageStore";

describe ('HomePage Store test functions', () => {
    let data, values;

    it('sets defaults correctly', () => {
        data = {
            activeTab: HomePageStore.activeTab,
            renderCarousel: HomePageStore.renderCarousel
        };

        values = {
            activeTab: 0,
            renderCarousel: false
        };

        expect(data).toEqual(values);
    });

    it('toggles to tab correctly', () => {
        HomePageStore.setTab(1);
        data = {
            activeTab: HomePageStore.activeTab,
        };
        values = {
            activeTab: 1,
        };  

        expect(data).toEqual(values);
    });

});