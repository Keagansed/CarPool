// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/PersonAdd';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

//Just using temporarily for demonstration purposes
import MapComponent from '../google/GeneralMapWrapper';
import OffersStore from '../../stores/OffersStore';
import RouteStore from './../../stores/RouteStore';
import ServerURL from '../../utils/server';

/*
* The purpose of this UserMatch class is to provide a component representitive of a
* route match on a route's page. When clicked on, a modal should be displayed which
* gives users the option to send a carpool offer to the user who created the matching route.
*/
@observer class UserMatch extends Component {
    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. The 'toggle'
    * field is set to false because the modal is not visible when the page is first loaded. 
    * Other fields are set to default values.
    */
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);

        this.state = {
            token: '',
            offerDialog: false,
            hidden: false, // set to "display: none" to hide div after making an offer
            redirect: false,
        }

        this.routeArr = [];

        //Create instance of store for component
        this.routeStore1 = new RouteStore();
        this.routeStore2 = new RouteStore();

        this.carpoolName = "";
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place after the component is rendered on the screen.
    */
    componentDidMount() {
        // this.routeStore1.getProfile(this.props.token, this.props.userId);

        this.routeStore1.getRoute(this.props.token, this.props.uRouteId);
        this.routeStore2.getRoute(this.props.token, this.props.routeId);

    }

    //Open/Close Offer dialog
    handleClickOpen = () => {
        this.setState({ offerDialog: true });
    };
    handleClose = () => {
        this.setState({ offerDialog: false });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return (<Redirect to='/HomePage' />);
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true,
        })
    }

    /*
    * The purpose of the makeOffer method is to send an offer to another user to join in a carpool.
    */
    makeOffer = (event) => {
        event.preventDefault();

        OffersStore.makeOffer(
            this.carpoolName,
            this.props.token,
            this.props.uRouteId,
            this.props.userId,
            this.props.store._id,
            false
        );
        this.setState({
            redirect: true,
        });
    
    }

    /*
    * The purpose of the handleCarpoolNameChange method is change the carpool name of the new
    * carpool for which an offer is being made. This name is stored in the carpoolName field.
    */
    handleCarpoolNameChange = (e) => {
        this.carpoolName = e.target.value;
    }

    genRouteArr = () => {
        this.routeArr = [];

        const routeObj1 = {
            origin: this.routeStore1.routeObj.startLocation,
            destination: this.routeStore1.routeObj.endLocation
        };
        const routeObj2 = {
            origin: this.routeStore2.routeObj.startLocation,
            destination: this.routeStore2.routeObj.endLocation
        };

        this.routeArr.push(routeObj1, routeObj2);
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        // profilePicture stores the exact path of the matched user's profile picture 
        // let profilePicture = "default.jpg";
        let profilePicture, userFullName;
        // console.log(this.props.userObj);
        if (
            typeof (this.props.userObj) !== "undefined" &&
            typeof (this.props.userObj.firstName) !== "undefined" &&
            typeof (this.props.userObj.lastName) !== "undefined"
        ) {
            profilePicture = ServerURL + "/api/account/getImage?filename=" + this.props.userObj.profilePic;
            userFullName = this.props.userObj.firstName + " " + this.props.userObj.lastName;
        }

        if (typeof (this.routeStore1.routeObj.routeName) !== "undefined") {
            this.carpoolName = this.routeStore1.routeObj.routeName;

            this.genRouteArr();
        }

        if(this.state.redirect){
            return(
                <React.Fragment>
                    {this.renderRedirect()}
                </React.Fragment>
            )
        }

        if (this.state.hidden) {
            return (<div></div>)
        } else {
            return (
                <div>                    
                    <ListItem button onClick={this.handleClickOpen} divider>
                        <Avatar alt="Profile Picture" src={profilePicture} />
                        <ListItemText primary={userFullName} secondary='Click to Make Offer' />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Offer to Carpool" onClick={this.handleClickOpen}>
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Dialog open={this.state.offerDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="alert-dialog-title">Make Offer to Carpool</DialogTitle>
                        <DialogContent>
                            <Link to={"/ProfilePage/"+this.props.userId} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem style={{paddingLeft: 0, paddingRight: 0}} divider>
                                    <Avatar alt="Profile Picture" src={profilePicture} />
                                    <ListItemText primary={userFullName} secondary='View Profile' />
                                </ListItem>
                            </Link>
                            <MapComponent routeArr={this.routeArr} />
                            <TextField
                                onChange={this.handleCarpoolNameChange}
                                margin="dense"
                                label="Proposed Carpool Name"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.makeOffer} color="primary">
                                Make Offer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }
}

export default UserMatch;