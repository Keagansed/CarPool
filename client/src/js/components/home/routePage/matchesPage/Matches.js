import React, { Component } from 'react';
import { observer } from "mobx-react";

import  "../../../../../css/components/Spinner.css"
import UserMatch from './UserMatch';
import CarpoolMatch from './CarpoolMatch';
import RouteStore from '../../../../stores/RouteStore';

@observer class Matches extends Component{
    componentWillMount(){
        this.props.store.getRoutes(this.props.token);
    }

    renderRoutes = () => {
        const Routes = this.props.store.routes.map(route =>             
            <UserMatch key={route._id} userId={route.userId} store={new RouteStore(route.routeName, route.startLocation, route.endLocation, route.days, route.time, route.repeat, route._id)}/>
        )
        
        if(Routes.length > 0) {
            return Routes;
        }else {
            return(
                <h5 className="txt-center mtop-50px txt-white">
                    No Routes
                </h5>
            );
        }
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
    
    // render(){
    //     // const { token } = this.props.store;
        
    //     return(
    //         <div>
    //             {/* dummy static matches */}
    //             <UserMatch />
    //             <CarpoolMatch/>
    //         </div>
    //     );
    // }
}

export default Matches;