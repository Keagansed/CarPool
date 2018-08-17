// File Type: Store

import { action, observable, toJS } from 'mobx';

class RouteStore {

    @observable userObj = {};
    @observable routeObj = {};

    @observable routeName = '';
    @observable startLocation = '';
    @observable endLocation = '';
    @observable days = {};
    @observable time = '';
    @observable repeat = false;
    @observable _id = '';

    constructor(routeName, start, end, days, time, repeat, _id){
        this.routeName = routeName;
        this.startLocation = start;
        this.endLocation = end;
        this.days = days;
        this.time = time;
        this.repeat = repeat;
        this._id = _id;
    }

    @action getProfile = (token, userId ) => {
        fetch('/api/account/profile?token=' + token + '&userId=' + userId,{
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
        
        fetch('/api/system/route/getRoute?routeId='+  routeId + '&token=' + token, { 
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

    @action setDays = (days) => {
        this.days = days;
    }

    @action setTime = (time) => {
        this.time = time;
    }
    
    @action setRepeat = (repeat) => {
        this.repeat = repeat;
    }
}

export default RouteStore;