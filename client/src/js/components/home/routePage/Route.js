import React, { Component } from 'react';

class Route  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <div className="pad-10px">
                    <div className="row txt-white">
                        <div className="col-8">
                            <div className="col-12">
                                <h5>{this.props.store.routeName}</h5>
                            </div>
                            <div className="col-12">
                            <h6>Mon Tue Wed Thu Fri</h6>
                            </div>
                        </div>
                        <div className="col-4 vertical-right">
                            <div className="col-12">
                                <h4>➦</h4>
                            </div>
                            <div className="col-12">
                                <h6>{this.props.store.time}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Route;