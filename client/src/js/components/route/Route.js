// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowIcon from '@material-ui/icons/ArrowForward';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

/*
* The purpose of this Route class is to provide a component representitive of a route
* on the user's home page in the 'Routes' tab. When clicked on, this component will 
direct the user to the route page for the specific route.
*/
class Route extends Component {
    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        return (
            <Link to={`/HomePage/RouteMatches/` + this.props.store._id} style={{ textDecoration: 'none' }}>
                <ListItem button divider>
                    <Avatar>
                        <CarIcon />
                    </Avatar>
                    <ListItemText primary={this.props.store.routeName} secondary={this.props.store.time} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="View Route Matches">
                            <ArrowIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Link>
        );
    }
}

export default Route;