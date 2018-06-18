import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class CarpoolInfoModal extends Component{
    render(){
        return(
            // Modal
            <div className="modal" tabIndex="-1" role="dialog" id="carpoolInfoModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Brogrammers Carpool</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Carpool Members</h6>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Marcus Bornman</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Vernon Francis</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Leonardo Ianigro</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Keagan Seddon</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Michael Yatrakos</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                            <div className="row bordbot-1px-dash-grey">
                                <div className="col-6">Myron Ouyang</div><div className="col-6 vertical-right">View Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarpoolInfoModal;