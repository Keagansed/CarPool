import { observer } from 'mobx-react';
import React, { Component } from 'react';

import Route from './Route'
import RouteStore from '../../../stores/RouteStore';

@observer class Routes  extends Component {

    constructor(){
        super()
        // Just for dummy data, remove when necessary
        this.state = {
            daysOne: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
            }
        }
    }

    componentWillMount(){
        this.props.store.getRoutes(this.props.token);
    }

    render(){
        // Temporarily commented out to prevent warnings, uncomment when using 'Routes' instead of dummy route
        // const Routes = this.props.store.routes.map(route => 
        //     <Route key={route._id} store={new RouteStore(route.routeName, route.startLocation, route.endLocation, route.days, route.time, route.repeat)}/>
        // )

        return(
            <div>
                {/*What will come here -> {Routes} */}
                
                {/*Just an example... */}
                <Route key={1} store={new RouteStore("Home to Work", "91 Jagluiperd Street", "South Street", this.state.daysOne, "08:00", true)}/>
                <Route key={2} store={new RouteStore("Work to Home", "South Street", "91 Jagluiperd Street", this.state.daysOne, "16:30", true)}/>                                                                
            </div>
        );
    }
}

export default Routes;