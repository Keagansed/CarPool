import { observable, action } from 'mobx';

class routesStore {

    @observable routes = [];
    @observable routeSuccess = false;

    @action getRoutes = (token) => {
        fetch('/api/system/route/getRoutes?userId=' + token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {

            if(json.success)
            {
                this.routes = json.data;
            }
            else
            {
                console.log("Unable to retrieve routes");
            }
        })
    }

    

    @action newRoute = (token, startLocation, endLocation, days, time, routeName, repeat) => {
        const route = {
            userId: token,
            startLocation: startLocation,
            endLocation: endLocation,
            days: days,
            time: time,
            routeName: routeName,
            repeat: repeat
        }

        this.routes.push(route);


        fetch('/api/system/route/newRoute',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userId: token,
                startLocation: startLocation,
                endLocation: endLocation,
                days: days,
                time: time,
                routeName: routeName,
                repeat: repeat
            })
        }) 
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            this.routeSuccess = true;
        })  

    }

}

const  RoutesStore = new routesStore();
export default RoutesStore;

