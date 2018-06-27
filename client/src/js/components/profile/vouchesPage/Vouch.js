import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from './../../../../css/images/profile_default.png';

class Vouch  extends Component {
    render(){
        return(
            <div className="container-fluid bg-white bordbot-2px-purple">
                <div className="row txt-purple padver-10px">
                    <div className="col-2">
                            <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-purple" height="60" width="60" alt="s" />
                    </div>
                    <div className="col-7">
                        <div className="col-12 txt-gold">
                            <h5><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i></h5>
                        </div>
                        <div className="col-12">
                            Michael Yatrakos
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

export default Vouch;