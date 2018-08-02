// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import LoginStore from '../../stores/LoginStore';
  
/*
* Purpose: Link component that logs out, the currently logged in user
*/
class LogoutSetting extends Component {
    handleLogout = () => {
        LoginStore.logOut();
    }

    render() {
        return (
            <div className="mx-auto">
                <Link to={"/"} onClick={this.handleLogout}>
                <div className="container-fluid bordbot-2px-white">
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    Log Out
                                </h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    <i className="fa fa-sign-out"/>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        );
    }
}

export default LogoutSetting;