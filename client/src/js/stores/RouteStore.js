import { observable, action } from 'mobx';

class RouteStore {

    @observable routeName = '';
    @observable startLocation = '';
    @observable endLocation = '';
    @observable days = {};
    @observable time = '';
    @observable repeat = false;

    constructor(routeName, start, end, days, time, repeat){
        this.routeName = routeName;
        this.startLocation = start;
        this.endLocation = end;
        this.days = days;
        this.time = time;
        this.repeat = repeat;
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