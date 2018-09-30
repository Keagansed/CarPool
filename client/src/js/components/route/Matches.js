// File Type: Component

import React, { Component } from 'react';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SadIcon from '@material-ui/icons/SentimentDissatisfied';

import CarpoolMatch from './CarpoolMatch';
import RouteStore from '../../stores/RouteStore';
import UserMatch from './UserMatch';
import { getFromStorage } from '../../utils/localStorage.js';

import  "../../../css/components/Spinner.css"

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 48,
        paddingBottom: 0,
    },
});

/*
* The purpose of this Matches class is to display all matches for a specific route.
* The matching algorithm creates a radius around the route and compares other routes
* which begin and end within that radius. Matches are also ordered according to which 
* ones are best suited to the user - not ponly based on proximity but also on other
* user's trust factors and vouch averages.
*/
@observer class Matches extends Component {
    constructor() {
        super()

        this.state = {
            token:'',
            //userID is a placeholder field used to store the ID of a matched user
            userID: '',
            //carpoolID is a placeholder field used to store the ID of a matched carpool
            carpoolID: ''
        }
    }
    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen.
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        const { token } = obj;
           
        this.setState({
            token,
        })

        this.props.store.getAllRoutes(token, this.props.routeId);
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
                routeId = {route._id} //matched route ID
                uRouteId = {this.props.routeId} //own route ID
                userId = {route.userId} 
                store = {new RouteStore(
                    route.routeName, 
                    route.startLocation, 
                    route.endLocation, 
                    route.time, 
                    route._id
                )}
                userObj = {route.userObj}
            />            
        )
        if(Routes.length > 0) {
            return Routes;
        }else{
            return(
                <ListItem>
                    <Avatar>
                        <SadIcon />
                    </Avatar>
                    <ListItemText primary="No Matches Yet" secondary="Please check again later." />
                </ListItem>
            );
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
        const { classes } = this.props;
        if(this.props.store.loadingRoutes) {
            return(
                <div className="scroll-vert">
                    {this.renderLoading()}
                </div>
            );
        }
        else{
            return (
                <List component="nav" className={classes.root}>
                    {this.renderRoutes()}
                    {this.renderCarpools()}
                </List>
            );
        }
    }
}

Matches.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Matches);