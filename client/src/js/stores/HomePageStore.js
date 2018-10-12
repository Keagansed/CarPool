// File Type: Store

import { action, observable } from 'mobx';
import ServerURL from '../utils/server';

/*
 Provides a store for variables and methods for the homepages's tabs
 */
class homePageStore {

    @observable activeTab = 0;
    @observable renderCarousel = false;

    @action setTab = (tabNum) => {
        this.activeTab = tabNum;
    }

    @action firstLoadCheck = (token) => {
        fetch(ServerURL + '/api/account/profile/firstLogin?token=' + token ,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(err => console.error("Error: ", err))
        .then(json => {
            if (json) {
                if (json.success) {
                    if (json.InitialLogin) {
                        this.renderCarousel = true;

                        fetch(ServerURL + '/api/account/profile/updateFirstLogin?token=' + token, {                            
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                token: token
                            })
                        })
                        .then(res2 => res2.json())
                        .catch(err2 => console.error("Error: ", err2))
                        .then(json2 => {
                            if (json2) {
                                if (!json2.success) {
                                    console.log(json2.message);
                                }
                            }
                        })
                    }                

                } else {
                    this.renderCarousel = false;
                    console.log(json.message);
                }
            }
        })
    }

}

const  HomePageStore = new homePageStore();
export default HomePageStore;