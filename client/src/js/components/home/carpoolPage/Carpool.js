import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Carpool  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <Link to={`/HomePage/Chat`}>
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>Brogrammers Carpool</h5>
                            </div>
                            <div className="col-12">
                                5 New Messages
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-chevron-circle-right"></i></h5>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Carpool;