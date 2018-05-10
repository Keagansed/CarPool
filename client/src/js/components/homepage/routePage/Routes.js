import { observer } from 'mobx-react';
import React, { Component } from 'react';

import Route from './Route'
import RouteStore from '../../../stores/RouteStore';

@observer class Routes  extends Component {

    componentWillMount(){
        this.props.store.getRoutes(this.props.token);
    }

    

    render(){

        const Routes = this.props.store.routes.map(route => 
            <Route key={route._id} store={new RouteStore(route.routeName, route.startLocation, route.endLocation, route.days, route.time, route.repeat)}/>
        )

        return(
            <div className="list-group bg-info">

                {Routes}
                                                                                
            </div>
        );
    }
}

export default Routes;