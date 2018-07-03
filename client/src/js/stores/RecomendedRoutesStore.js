import { action, observable  } from 'mobx';

class RecRoutesStore {
    
    @observable routes = [];
    @observable loadingRoutes = true;
  
    @action getRoutes = (token, routeId) => {
        fetch('/api/system/recomendedRoutes?userId=' + token + '&routeId=' + routeId,{
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
                this.loadingRoutes = false;
            }
            else
            {
                console.log("Unable to retrieve routes");
            }
        })
    }    
}

const  recRoutesStore = new RecRoutesStore();
export default recRoutesStore;

