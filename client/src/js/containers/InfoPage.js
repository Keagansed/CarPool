// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import logo  from "../../css/images/logo-gif-loop.gif";

/*
* Purpose: Landing page compenent is the first page the user sees when opening the app
*/
class InfoPage extends Component {
    render() {
        return(
            <div>
                <div className="jumbotron mbottom-0 padtop-20px padhor-0 padbot-0 brad-0" id="infoHeader">
                    <div className="container text-center pad-0">
                        <div className="mbottom-10px">
                            <h1 className="mbottom-0 txt-purple">The Iminsys Carpool Platform</h1>
                        </div>
                        <div className="mbottom-10px">
                            <img src={logo} id="logo-256" alt="carpool_logo"/>
                        </div>
                        <div className="mbottom-10px">
                            <Link to={`/`} className="btn btn-primary width-15rem brad-2rem bg-orange txt-purple fw-bold">
                                Watch Video
                            </Link>
                        </div>
                        <div>
                            <Link to={`/Landing`} className="btn btn-primary width-15rem brad-2rem bg-aqua txt-purple fw-bold">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container-fluid txt-white bg-purple">
                    <div className="row">
                        <div className="col-md-3 col-sm-12 mbottom-10px">
                            <h3>
                                <i className="fa fa-users mbottom-10px"></i><br/>
                                Join a community of commuters
                            </h3>
                            <p>
                                The intention of the Iminsys Carpool Platform is to bring commuters together and to
                                help them help eachother. By giving users the tools to find others who travel along 
                                similar routes, interact with them, and share driving responsibilities with no costs involved,
                                the platform exposes the good in people and creates a network out of which everyone benefits.
                            </p>
                        </div>
                        <div className="col-md-3 col-sm-12 mbottom-10px">
                            <h3>
                                <i className="fa fa-usd mbottom-10px"></i><br/>
                                Save on excessive travel expenses
                            </h3>
                            <p>
                                Unfortunately, travelling is expensive. This is something that we are all too familiar with
                                and it is not a problem that is going away anytime soon. The Iminsys Carpool Platform does
                                not provide for the exchange of money; however, it does allow people to alternate driving 
                                responsibilities and as a consequence the costs involved in driving are reduced for every carpooler.
                            </p>
                        </div>
                        <div className="col-md-3 col-sm-12 mbottom-10px">
                            <h3>
                                <i className="fa fa-car mbottom-10px"></i><br/>
                                Make daily commuting enjoyable
                            </h3>
                            <p>
                                Driving the same route on a daily basis is a tedious task but when you're driving with new 
                                friends and acquintances it will become something you look forward to. The Iminsys Carpool 
                                Platform makes numerous provisions to ensure you only travel with people you feel comfortable 
                                around, so the only question that remains is - why drive alone when you can drive together?
                            </p>
                        </div>
                        <div className="col-md-3 col-sm-12 mbottom-10px">
                            <h3>
                                <i className="fa fa-road mbottom-10px"></i><br/>
                                Contribute to cleaning up our roads
                            </h3>
                            <p>
                                If you've ever had to sit in peak hour traffic you'll know what a pain it can be. One of the
                                predominent reasons for unnecessary traffic is that there are too many cars with one driver and
                                a host of empty seats. By driving together, we are reducing the number cars on our roads, not only
                                minimizing traffic, but minimizing the impact our vehicles have on the environment around us.
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="footer text-center txt-white-faded">
                    <div className="container">
                        <p>Developed by the Brogrammers Development Team</p> 
                    </div>
                </footer>
            </div>
        );
    }
}

export default InfoPage;