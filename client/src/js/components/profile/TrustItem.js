// File Type: Component

import React, { Component } from 'react';

/*
* The purpose of the TrustItem class is to provide a component representitive of one Trust Item. 
* One example of a trust item is an identity document and whether it has been verified or not.
*/
class TrustItem  extends Component {
    /*
    * The purpose of the render method is to enable the rendering of this component.
    * It returns react elements and HTML using JSX.
    */
    render(){
        if (this.props.hasItem){
            return(
                <div className="container-fluid bg-white bordbot-2px-purple">
                    <div className="row txt-purple padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>{this.props.itemName}</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5>
                                    
                                    <i className="fa fa-check-circle txt-green"/>
                                </h5>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="col-12">
                                {this.props.itemName} has been verified.
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="container-fluid bg-white bordbot-2px-purple">
                    <div className="row txt-purple padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>{this.props.itemName}</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5>
                                    
                                    <i className="fa fa-times-circle txt-red"/>
                                </h5>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="col-12">
                                {this.props.itemName} has not been verified.
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default TrustItem;