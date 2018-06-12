import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{

    render(){
        return(
            <div className="fixed-bottom container-fluid pad-10px bg-aqua">
                <div className="row">
                    <div className="col-4 txt-center">
                        <Link to={`/HomePage`}>
                            <i className="fa fa-cog txt-purple txt-30px"></i>
                        </Link>
                    </div>
                    <div className="col-4 txt-center">
                        <Link to={`/HomePage`}>
                            <i className="fa fa-home txt-purple txt-30px"></i>
                        </Link>
                    </div>
                    <div className="col-4 txt-center">
                        <Link to={`/HomePage`}>
                            <i className="fa fa-user txt-purple txt-30px"></i>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar