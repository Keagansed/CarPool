import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Trip  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <Link to={`/HomePage/Trip`}>
                    <div className="row txt-white padver-10px">
                        <div className="col-8">
                            <div className="col-12">
                                <h5>Home to Work</h5>
                            </div>
                            <div className="col-12">
                                Mon 12 January @ 08:00
                            </div>
                        </div>
                        <div className="col-4 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-chevron-circle-right"></i></h5>
                            </div>
                            <div className="col-12 txt-10px txt-gold">
                                <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Trip;