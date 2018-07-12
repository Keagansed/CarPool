import React, { Component } from 'react';
import { observer } from "mobx-react";

import  "../../../../../css/components/Spinner.css"
import UserMatch from './UserMatch';
import CarpoolMatch from './CarpoolMatch';
import RouteStore from '../../../../stores/RouteStore';

@observer class Matches extends Component{
    componentWillMount(){
        this.props.store.getAllRoutes(this.props.token, this.props.routeId);
    }

    renderRoutes = () => {
        const Routes = this.props.store.recommendedRoutes.map(route =>             
            <UserMatch 
                key={route._id} 
                token={this.props.token}
                uRouteId={this.props.routeId}
                userId={route.userId} 
                store={new RouteStore(route.routeName, route.startLocation, route.endLocation, route.days, route.time, route.repeat, route._id)}/>
        )
        if(Routes.length > 0) {
            return Routes;
        }else {
            return(
                <h5 className="txt-center mtop-10px txt-white">
                    No Matches
                </h5>
            );
        }
    }

    constructor(){
        super()

        this.state = {
            userID: '',
            carpoolID: ''
        }
    }

    handleUserIDChange(e){
        this.setState({userID: e.target.value})
    }

    handleCarpoolIDChange(e){
        this.setState({carpoolID: e.target.value})
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
}

export default Matches;