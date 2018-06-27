import React, { Component } from 'react';
  
class UploadIDSetting extends Component {
    render() {
        return (
            <div className="mx-auto">
                <div className="container-fluid bordbot-2px-white">
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">Upload ID</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0"><i className="fa fa-id-card"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadIDSetting;