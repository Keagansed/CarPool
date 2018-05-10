import { observable, action } from 'mobx';

class routesStore {

    @observable routes = [];

    @action getRoutes = (token) => {
        fetch('/api/system/route/getRoutes',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userId: token
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {

            if(json.success)
            {
                console.log("Retrieved routes");
            }
            else
            {
                console.log("Unable to retrieve routes");
            }
        })
    }

    @action newRoute = () => {

    }

}

const  RoutesStore = new routesStore();
export default RoutesStore;