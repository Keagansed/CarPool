// File Type: Store

import { action, observable } from 'mobx';

/*
 Provides a store for variables and methods for the homepages's tabs
 */
class homePageStore {

    @observable routeTab = true;
    @observable carpoolTab = false;
    @observable tripTab = false;
    @observable addTab = false;

    @action toggleToRoute = () => {
        this.carpoolTab = false;
        this.tripTab = false;
        this.routeTab = true;
        this.addTab = false;
    }

    @action toggleToCarpool = () => {
        this.carpoolTab = true;
        this.tripTab = false;
        this.routeTab = false;
        this.addTab = false;
    }

    @action toggleToTrip = () => {
        this.carpoolTab = false;
        this.tripTab = true;
        this.routeTab = false;
        this.addTab = false;
    }

    @action toggleToAdd = () => {
        this.carpoolTab = false;
        this.tripTab = false;
        this.routeTab = false;
        this.addTab = true;
    }

}

const  HomePageStore = new homePageStore();
export default HomePageStore;