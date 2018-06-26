import React, { Component } from 'react';

class Message  extends Component {
    render(){
        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                {/* Maybe use different colours for different users? */}
                <div className="row txt-orange padver-10px padbot-0">
                    <div className="col-9">
                        <div className="col-12">
                            <h5>Vernon Francis</h5>
                        </div>
                        <div className="col-12">
                            {/* Empty for now */}
                        </div>
                    </div>
                    <div className="col-3 vertical-right">
                        <div className="col-12">
                            <h5>17:55</h5>
                        </div>
                        <div className="col-12">
                            {/* Empty for now */}
                        </div>
                    </div>
                </div>
                <div className="row txt-white padver-10px padtop-0">
                    <div className="col-12">
                        <div className="col-12">
                            The message details of messages sent by different people should probably be displayed in different colours.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;