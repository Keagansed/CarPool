import React, { Component } from 'react';

class Carpool  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <div className="pad-10px">
                    <div className="row txt-white">
                        <div className="col-8">
                            <div className="col-12">
                                <h5>Moreleta Park</h5>
                            </div>
                            <div className="col-12">
                            <h6>5 New Messages</h6>
                            </div>
                        </div>
                        <div className="col-4 vertical-right">
                            <div className="col-12">
                                <h4><i className="fa fa-chevron-circle-right"></i></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Carpool;