import { observable, action } from 'mobx';

class homePageStore {

    @observable token = '';
    @observable routeTab = true;
    @observable carpoolTab = false;
    @observable tripTab = false;

    @action toggleToRoute = () =>{
        this.carpoolTab = false;
        this.tripTab = false;
        this.routeTab = true;
    }

    @action toggleToCarpool = () =>{
        this.carpoolTab = true;
        this.tripTab = false;
        this.routeTab = false;
    }

    @action toggleToTrip = () =>{
        this.carpoolTab = false;
        this.tripTab = true;
        this.routeTab = false;
    }

}

const  HomePageStore = new homePageStore();
export default HomePageStore;