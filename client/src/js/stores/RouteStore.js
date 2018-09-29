// File Type: Store

import { action, observable } from 'mobx';
import ServerURL from '../utils/server';

class RouteStore {

    @observable userObj = {};
    @observable routeObj = {};

    @observable routeName = '';
    @observable startLocation = '';
    @observable endLocation = '';
    @observable time = '';
    @observable _id = '';

    constructor(routeName, start, end, time, _id){
        this.routeName = routeName;
        this.startLocation = start;
        this.endLocation = end;
        this.time = time;
        this._id = _id;
    }

    @action getProfile = (token, userId ) => {
        fetch(ServerURL + '/api/account/profile?token=' + token + '&userId=' + userId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success) {
                this.userObj = json.data[0];
            } else {
                console.log(json);
            }
        });

    }

    @action getRoute = (token, routeId) => {

        fetch(ServerURL + '/api/system/route/getRoute?routeId='+  routeId + '&token=' + token, { 
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success) {
                this.routeObj = json.data[0];
                // console.log(toJS(this.routeObj));

            }else{
                console.log(json);
            }
        });
    }


    @action setRouteName = (name) => {
        this.routeName = name;
    }

    @action setStartLocation = (start) => {
        this.startLocation = start;
    }

    @action setEndLocation = (end) => {
        this.endLocation = end;
    }

    @action setTime = (time) => {
        this.time = time;
    }
}

export default RouteStore;