// File Type: Component

import React, { Component } from 'react';
import { observer } from "mobx-react";

import CarpoolMatch from './CarpoolMatch';
import RouteStore from '../../stores/RouteStore';
import UserMatch from './UserMatch';
import { getFromStorage } from '../../utils/localStorage.js';

import  "../../../css/components/Spinner.css"

/*
* The purpose of this Matches class is to display all matches for a specific route.
* The matching algorithm creates a radius around the route and compares other routes
* which begin and end within that radius. Matches are also ordered according to which 
* ones are best suited to the user - not ponly based on proximity but also on other
* user's trust factors and vouch averages.
*/
@observer class Matches extends Component{
    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.getAllRoutes(token, this.props.routeId);
                }
            })
        }    
    }
    
    /*
    * The purpose of the renderCarpools method is to render all matching carpools for the route
    * in question. This is different from individal users who match the route.
    */
    renderCarpools = () => {
        const Carpools = this.props.store.recommendedCarpools.map(carpool =>
            <CarpoolMatch
                key = {carpool._id}
                carpoolId = {carpool._id}
                token = {this.props.token}
                routeArr = {carpool.routes}
                carpoolName = {carpool.carpoolName}
                uRouteId = {this.props.routeId} //Own route ID
            />
        )

        if(Carpools.length) {
            return Carpools;
        }else{
            // return(
            //     <h5 className="txt-center mtop-10px txt-white">
            //         No carpools found
            //     </h5>
            // );
        }
    }

    /*
    * The purpose of the renderRoutes method is to render all matching routes of other individual
    * users. These matches are not already joined in a carpool.
    */
    renderRoutes = () => {
        const Routes = this.props.store.recommendedRoutes.map(route =>             
            <UserMatch 
                key = {route._id} 
                token = {this.props.token}
                routeId = {route._id}
                uRouteId = {this.props.routeId}
                userId = {route.userId} 
                store = {new RouteStore(route.routeName, route.startLocation, route.endLocation, route.days, route.time, route.repeat, route._id)}
            />
        )
        if(Routes.length > 0) {
            return Routes;
        }else{
            return(
                <h5 className = "txt-center mtop-10px txt-white">
                    No matches yet...
                </h5>
            );
        }
    }

    /*
    * The purpose of the constructor method is to instantiate fields to relevant values.
    * In this case all fields are set to default values.
    */
    constructor(){
        super()

        this.state = {
            //userID is a placeholder field used to store the ID of a matched user
            userID: '',
            //carpoolID is a placeholder field used to store the ID of a matched carpool
            carpoolID: ''
        }
    }

    /*
    * The purpose of the handleUserIDChange method is to change the userID field to a new
    * matched route's user ID
    */
    handleUserIDChange(e){
        this.setState({userID: e.target.value})
    }

    /*
    * The purpose of the handleCarpoolIDChange method is to change the carpoolID field to a 
    * new matched route's carpool ID
    */
    handleCarpoolIDChange(e){
        this.setState({carpoolID: e.target.value})
    }

    /*
    * The purpose of the renderLoading method is to display a temporary icon while the page
    * is busy being rendered.
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
                    <div> 
                        {this.renderCarpools()}
                    </div>
                    <div> 
                        {this.renderRoutes()}
                    </div>
                </div>
            );
        }
    }
}

export default Matches;