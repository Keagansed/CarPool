// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";

import Matches from './Matches';
import MatchesStore from '../../stores/MatchesStore';
import RouteInfoModal from './RouteInfoModal';
import { getFromStorage } from '../../utils/localStorage.js';
import DeleteRoute from './DeleteRoute';

@observer class MatchesPage extends Component{

    /*
    * The purpose of the constructor method is to instantiate fields to relevant values. loading is set
    * to true by default until the page is finished loading.
    */
    constructor() {
        super()

        this.state = {
            token: '',
        }
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
    }

    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        const { token } = this.state;
        return (
            <div className="size-100 bg-purple">
                <div className="fixed-top container-fluid height-50px bg-aqua">
                    <div className="row height-100p">
                        <Link 
                            to={`/HomePage`} 
                            className="col-2 txt-center"
                        >
                            <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                <i className="fa fa-chevron-circle-left txt-center"></i>
                            </button>
                        </Link>
                        <RouteInfoModal 
                            token={token}
                            routeId={this.props.match.params._id} 
                            MatchesStore={MatchesStore}
                        />
                        <DeleteRoute
                            token={token} 
                            routeId={this.props.match.params._id}
                        />
                    </div>
                </div>
                {/* Padding is there for top and bottom navs*/}
                <div className="padtop-50px">
                    <Matches 
                        store={MatchesStore} 
                        token={token} 
                        routeId={this.props.match.params._id}
                    />
                </div>
            </div>
        );
    }
}

export default MatchesPage;