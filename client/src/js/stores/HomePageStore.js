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

    @observable routeTabActive = "active";
    @observable carpoolTabActive = "";
    @observable tripTabActive = ""; 
    @observable addTabActive = "";  

    @action toggleToRoute = () => {
        this.carpoolTab = false;
        this.tripTab = false;
        this.routeTab = true;
        this.addTab = false;

        this.carpoolTabActive = "";
        this.tripTabActive = "";
        this.routeTabActive = "active";
        this.addTabActive = "";
    }

    @action toggleToCarpool = () => {
        this.carpoolTab = true;
        this.tripTab = false;
        this.routeTab = false;
        this.addTab = false;

        this.carpoolTabActive = "active";
        this.tripTabActive = "";
        this.routeTabActive = "";
        this.addTabActive = "";
    }

    @action toggleToTrip = () => {
        this.carpoolTab = false;
        this.tripTab = true;
        this.routeTab = false;
        this.addTab = false;

        this.carpoolTabActive = "";
        this.tripTabActive = "active";
        this.routeTabActive = "";
        this.addTabActive = "";
    }

    @action toggleToAdd = () => {
        this.carpoolTab = false;
        this.tripTab = false;
        this.routeTab = false;
        this.addTab = true;

        this.carpoolTabActive = "";
        this.tripTabActive = "";
        this.routeTabActive = "";
        this.addTabActive = "active";
    }

}

const  HomePageStore = new homePageStore();
export default HomePageStore;