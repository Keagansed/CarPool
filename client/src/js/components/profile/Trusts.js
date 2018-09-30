// File Type: Component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import TrustItem from './TrustItem'

//Specific styles to this page
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

/*
* The purpose of the Trusts class is to render all trustItems for a specific user.
*/
class Trusts  extends Component {
    render(){
        const { hasIdDocument } = this.props.store;
        const { hasdriversLicense } = this.props.store;
        const { hasClearance } = this.props.store;
        const { hasCarRegistration } = this.props.store;
        const { classes } = this.props;

        /*
        * The purpose of the render method is to enable the rendering of this component.
        * It returns react elements and HTML using JSX.
        */
        return(
            <List component="nav" className={classes.root}>
                <TrustItem store={this.props.store} hasItem={hasIdDocument} itemName="Identity Document"/> 
                <TrustItem store={this.props.store} hasItem={hasdriversLicense} itemName="Driver's License"/> 
                <TrustItem store={this.props.store} hasItem={hasClearance} itemName="Police Clearance"/>   
                <TrustItem store={this.props.store} hasItem={hasCarRegistration} itemName="Car Registration"/> 
            </List>
        );
    }
}

Trusts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Trusts);