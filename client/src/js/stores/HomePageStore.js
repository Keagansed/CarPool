// File Type: Store

import { action, observable } from 'mobx';

/*
 Provides a store for variables and methods for the homepages's tabs
 */
class homePageStore {

    @observable activeTab = 0;

    @action setTab = (tabNum) => {
        this.activeTab = tabNum;
    }

}

const  HomePageStore = new homePageStore();
export default HomePageStore;