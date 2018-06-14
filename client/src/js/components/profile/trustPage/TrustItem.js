import React, { Component } from 'react';

class Vouch  extends Component {
    render(){
        return(
            <div className="container-fluid bg-trans bordbot-2px-purple">
                    <div className="row txt-purple padver-10px">
                        <div className="col-8">
                            <div className="col-12 txt-15px txt-gold">
                                {/* Just as an example */}
                                <h6 className="mbottom-0">Verified ID</h6>
                            </div>
                            <div className="col-12">
                                User has uploaded a valid ID document.
                            </div>
                        </div>
                        <div className="col-4 vertical-right">
                            <div className="col-12">
                                {/* Use fa-times-circle for trust documents that have not been submitted */}
                                <h4><i className="fa fa-check-circle"></i></h4>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Vouch;