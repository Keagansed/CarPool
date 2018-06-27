import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Route  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                {/* Linking to static matches page, in future matches page will be unique to route */}
                <Link to={`/HomePage/RouteMatches`}>
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
                                <h5><i className="fa fa-chevron-circle-right"></i></h5>
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