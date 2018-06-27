import React, { Component } from 'react';
  
class UploadDriversSetting extends Component {
    render() {
        return (
            <div className="mx-auto">
                <div className="container-fluid bordbot-2px-white">
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">Upload Driver's License</h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0"><i className="fa fa-road"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadDriversSetting;