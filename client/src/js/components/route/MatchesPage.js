// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

import Matches from './Matches';
import MatchesStore from '../../stores/MatchesStore';
import RouteInfoModal from './RouteInfoModal';
import { getFromStorage } from '../../utils/localStorage.js';
import DeleteRoute from './DeleteRoute';
import RouteStore from './../../stores/RouteStore';

//Styling specific to this page
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    topNav: {
        position: 'fixed',
        top: 0,
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    grow: {
        flexGrow: 1,
    },
    backButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

@observer class MatchesPage extends Component {

    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. loading is set
    * to true by default until the page is finished loading.
    */
    constructor() {
        super()

        this.state = {
            token: '',
        }

        this.routeStore = new RouteStore();
    }

    /*
    * The purpose of the componentWillMount method is to perform all programming tasks
    * that need to take place before the component is rendered on the screen. Here
    * it is used to fetch the session token.
    */
    componentWillMount() {
        const obj = getFromStorage('sessionKey');
        const { token } = obj;

        this.setState({
            token: token,
        })

        //Get own route 
        this.routeStore.getRoute(token, this.props.match.params._id);
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        const { token } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.topNav}>
                    <Toolbar className={classes.toolbar}>
                        <Link to={`/HomePage`} style={{ textDecoration: 'none', color: 'white' }}>
                            <IconButton color="inherit" aria-label="Back">
                                <BackIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            {this.routeStore.routeObj.routeName}
                        </Typography>
                        <IconButton color="inherit" aria-label="Back">
                            <InfoIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            // <div className="size-100 bg-purple">
            //     <div className="fixed-top container-fluid height-50px bg-aqua">
            //         <div className="row height-100p">
            //             <Link
            //                 to={`/HomePage`}
            //                 className="col-2 txt-center"
            //             >
            //                 <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
            //                     <i className="fa fa-chevron-circle-left txt-center"></i>
            //                 </button>
            //             </Link>
            //             <RouteInfoModal
            //                 token={token}
            //                 routeId={this.props.match.params._id}
            //                 MatchesStore={MatchesStore}
            //             />
            //             <DeleteRoute
            //                 token={token}
            //                 routeId={this.props.match.params._id}
            //             />
            //         </div>
            //     </div>
            //     {/* Padding is there for top and bottom navs*/}
            //     <div className="padtop-50px">
            //         <Matches
            //             store={MatchesStore}
            //             token={token}
            //             routeId={this.props.match.params._id}
            //         />
            //     </div>
            // </div>
        );
    }
}

MatchesPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchesPage);