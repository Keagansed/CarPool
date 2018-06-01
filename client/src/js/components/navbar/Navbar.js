import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{

    render(){
        return(
            <div className="navbar-component navbarBottom">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-md-12 ">
                            <ul className="nav nav-pills navbarBottom text-center">
                                <li className="nav-item ml-auto w-25">
                                    <Link to={`/`} className="nav-link no-hover">
                                        <i className="fa fa-cog fa-2x text-secondary d-inline"></i>&nbsp;
                                    </Link>
                                </li>
                                <li className="nav-item w-25">
                                    <Link to={`/HomePage`} className="nav-link no-hover" >
                                        <i className="fa fa-fw fa-car fa-2x d-inline text-secondary"></i>
                                    </Link>
                                </li>
                                <li className="nav-item mr-auto text-secondary w-25">
                                <Link to={{
                                        pathname: "/HomePage" + this.props.token,
                                        state: { token: this.props.token }
                                    }} className="nav-link no-hover"
                                >
                                    <i className="fa fa-fw fa-2x fa-user d-inline text-secondary"></i>
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar