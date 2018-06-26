import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarpoolOffer  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>Atterbury Carpool</h5>
                            </div>
                            <div className="col-12">
                                5 Members
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-info-circle"></i></h5>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default CarpoolOffer;