import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from './../../../../../css/images/profile_default.png';

class UserMatch  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <div className="row txt-white padver-10px">
                    <div className="col-2">
                            <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-white" height="60" width="60" alt="s" />
                    </div>
                    <div className="col-7">
                        <div className="col-12">
                            <h5>Myron Ouyang</h5>
                        </div>
                        <div className="col-12">
                            1.2km Further
                        </div>
                    </div>
                    <div className="col-3 vertical-right">
                        <div className="col-12">
                            <h5><i className="fa fa-handshake-o"></i></h5>
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

export default UserMatch;