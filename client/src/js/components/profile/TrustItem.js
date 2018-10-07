// File Type: Component

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CrossIcon from '@material-ui/icons/HighlightOff';
import CarIcon from '@material-ui/icons/DirectionsCar';
import GavelIcon from '@material-ui/icons/Gavel';
import DriversIcon from '@material-ui/icons/Subtitles';
import IdIcon from '@material-ui/icons/PermIdentity';

/*
* The purpose of the TrustItem class is to provide a component representitive of one Trust Item. 
* One example of a trust item is an identity document and whether it has been verified or not.
*/
class TrustItem extends Component {
    printIcon = () => {
        if (this.props.itemName === "Identity Document"){
            return (<IdIcon />);
        }else if (this.props.itemName === "Driver's License"){
            return (<DriversIcon />);
        }else if (this.props.itemName === "Police Clearance"){
            return (<GavelIcon />);
        }else{
            return (<CarIcon />);
        }
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        if (this.props.hasItem) {
            return (
                <ListItem button>
                    <Avatar>
                        {this.printIcon()}
                    </Avatar>
                    <ListItemText primary={this.props.itemName} secondary={this.props.itemName + ' has been verified.'} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="View Vouch Details">
                            <CheckIcon style={{color: 'green'}} />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        } else {
            return (
                <ListItem button>
                    <Avatar>
                    {this.printIcon()}
                    </Avatar>
                    <ListItemText primary={this.props.itemName} secondary={this.props.itemName + ' has not been verified.'} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="View Vouch Details">
                            <CrossIcon style={{color: 'red'}} />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }

    }
}

export default TrustItem;