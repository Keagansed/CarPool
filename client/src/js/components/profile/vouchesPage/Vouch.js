import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from './../../../../css/images/profile_default.png';

class Vouch  extends Component {
    render(){
        return(
            <div className="container-fluid bg-trans bordbot-2px-purple">
                    <div className="row txt-purple padver-10px">
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-purple" height="50" width="50" alt="s" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="col-12 txt-15px txt-gold">
                                <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> 
                            </div>
                            <div className="col-12">
                                <h6>Michael Yatrakos</h6>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h4><i className="fa fa-info-circle"></i></h4>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Vouch;