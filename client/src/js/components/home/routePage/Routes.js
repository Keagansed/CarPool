import { observer } from 'mobx-react';
import React, { Component } from 'react';

import  "../../../../css/components/Spinner.css"

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

    renderRoutes = () => {
        const Routes = this.props.store.routes.map(route => 
            <Route key={route._id} store={new RouteStore(route.routeName, route.startLocation, route.endLocation, route.days, route.time, route.repeat)}/>
        )

        return Routes;
    }

    renderLoading = () => {
        return(
            <div>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        )
    }

    render(){
        // Temporarily commented out to prevent warnings, uncomment when using 'Routes' instead of dummy route
        
        if(this.props.store.loadingRoutes) {
            return(
                <div className="scroll-vert">
                    
                </div>
            );
        }
        else{
            return(
                <div className="scroll-vert">
                    {this.renderRoutes()}
                </div>
            );
        }
    }
}

export default Routes;