import React, { Component } from 'react';

class Trip  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <div className="pad-10px">
                    <div className="row txt-white">
                        <div className="col-8">
                            <div className="col-12">
                                <h5>Home to Work</h5>
                            </div>
                            <div className="col-12">
                                <h6>Mon 12 January @ 08:00</h6>
                            </div>
                        </div>
                        <div className="col-4 vertical-right">
                            <div className="col-12">
                                <h4><i className="fa fa-chevron-circle-right"></i></h4>
                            </div>
                            <div className="col-12 txt-10px txt-gold">
                                <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Trip;