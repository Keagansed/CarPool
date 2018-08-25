// File Type: Store

import { action, observable } from 'mobx';

/*
 Provides a store for variables and methods for the matches page
 */
class matchesStore {
    // Array to store routes
    @observable routes = [];

    // Array to store all carpools
    @observable allCarpools = [];

    // Boolean to store whether or not routes are being loaded
    @observable loadingRoutes = true;

    // Array to store routes that will be recommended
    @observable recommendedRoutes = [];

    // Array to store carpools that will be recommended
    @observable recommendedCarpools = [];

    // Integer to store the maximum radius for carpools to be matched in km
    @observable maxRadius = 2;

    // Array to store the trust factor weights assigned the user of each of the recommended routes in order
    @observable trustFactorWeights = [];

    // Array to store the time weights assigned to each recommended route
    @observable timeWeights = [];

    /*
        Method to get all routes relevant to the user
        Makes API calls to get all the routes
     */
    @action getAllRoutes = (token, routeId) => {

        fetch('/api/system/route/getRecommendedRoutes?token=' + token + '&routeId=' + routeId,{ 
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then( json => {
            
            if(json) {
                if(json.success) {       
                    let { obj } = json;
                    if(obj.recommendedRoutes) {
                        this.recommendedRoutes = obj.recommendedRoutes;
                        this.loadingRoutes = false;
                    }
                    
                    if(obj.recommendedCarpools)
                        this.recommendedCarpools = obj.recommendedCarpools;
                }
            }

        })
    };
}

// Singleton instance of MatchesStore class
const  MatchesStore = new matchesStore();
export default MatchesStore;

