// File Type: Component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
* The purpose of this Route class is to provide a component representitive of a route
* on the user's home page in the 'Routes' tab. When clicked on, this component will 
direct the user to the route page for the specific route.
*/
class Route  extends Component {
    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render() {
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <Link to={`/HomePage/RouteMatches/`+this.props.store._id}>
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>{this.props.store.routeName}</h5>
                            </div>
                            <div className="col-12">
                                Mon Tue Wed Thu Fri
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5>
                                    <i className="fa fa-chevron-circle-right"></i>
                                </h5>
                            </div>
                            <div className="col-12">
                                {this.props.store.time}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Route;