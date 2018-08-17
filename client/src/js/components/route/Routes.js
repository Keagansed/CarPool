// File Type: Component

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Route from './Route'
import RouteStore from '../../stores/RouteStore';

import  "../../../css/components/Spinner.css"

/*
* The purpose of this Routes class is to provide a component that renders all routes
* on a user's home page in the routes tab.
*/
@observer class Routes  extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values.
    * All fields are set to default values.
    */
    constructor() {
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

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen. In this case
    * it is load all a users routes
    */
    componentWillMount() {
        this.props.store.getRoutes(this.props.token);
    }

    /*
    * The purpose of the renderRoutes method is to render all the routes that a user has created.
    */
    renderRoutes = () => {
        const Routes = this.props.store.routes.map(route =>             
            <Route 
                key={route._id} 
                store={new RouteStore(
                    route.routeName, 
                    route.startLocation, 
                    route.endLocation, 
                    route.days, 
                    route.time, 
                    route.repeat, 
                    route._id
                )}
            />
        )
        
        if(Routes.length > 0) {
            return Routes;
        }else{
            return(
                <h5 className="txt-center mtop-10px txt-white">
                    No Routes
                </h5>
            );
        }
    }

    /*
    * The purpose of the renderLoading method is to render a loading icon while the component 
    * has not yet loaded.
    */
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

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        
        if(this.props.store.loadingRoutes) {
            return(
                <div className="scroll-vert">
                    {this.renderLoading()}
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