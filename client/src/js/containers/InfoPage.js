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
            <div className="vertical-center bg-white">
                <div className="container-fluid">
                    <div className="row">
                        <h1 className="txt-center mx-auto">The Iminsys Carpool Platform</h1>
                    </div>
                    <div className="row">
                        <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} alt="carpool_logo" id="logo-256"/> 
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <h3 className="txt-center">Heading One</h3>
                            <p className="txt-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed magna accumsan, lacinia lectus nec, euismod metus. Fusce laoreet, lectus nec sagittis aliquam, tellus odio elementum nulla, eget rhoncus mi purus a arcu. Sed fermentum erat id purus viverra, at pellentesque dolor posuere. In hac habitasse platea dictumst. Praesent quis magna nec mi tincidunt ullamcorper a a mi. Nulla ornare rutrum leo et mollis. Donec iaculis feugiat orci, vitae sollicitudin turpis ullamcorper varius. Donec at tempus tellus. Aliquam sit amet est et justo porta tempor.
                            </p>
                        </div>
                        <div className="col-12 col-lg-3">
                            <h3 className="txt-center">Heading One</h3>
                            <p className="txt-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed magna accumsan, lacinia lectus nec, euismod metus. Fusce laoreet, lectus nec sagittis aliquam, tellus odio elementum nulla, eget rhoncus mi purus a arcu. Sed fermentum erat id purus viverra, at pellentesque dolor posuere. In hac habitasse platea dictumst. Praesent quis magna nec mi tincidunt ullamcorper a a mi. Nulla ornare rutrum leo et mollis. Donec iaculis feugiat orci, vitae sollicitudin turpis ullamcorper varius. Donec at tempus tellus. Aliquam sit amet est et justo porta tempor.
                            </p>
                        </div>
                        <div className="col-12 col-lg-3">
                            <h3 className="txt-center">Heading One</h3>
                            <p className="txt-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed magna accumsan, lacinia lectus nec, euismod metus. Fusce laoreet, lectus nec sagittis aliquam, tellus odio elementum nulla, eget rhoncus mi purus a arcu. Sed fermentum erat id purus viverra, at pellentesque dolor posuere. In hac habitasse platea dictumst. Praesent quis magna nec mi tincidunt ullamcorper a a mi. Nulla ornare rutrum leo et mollis. Donec iaculis feugiat orci, vitae sollicitudin turpis ullamcorper varius. Donec at tempus tellus. Aliquam sit amet est et justo porta tempor.
                            </p>
                        </div>
                        <div className="col-12 col-lg-3">
                            <h3 className="txt-center">Heading One</h3>
                            <p className="txt-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed magna accumsan, lacinia lectus nec, euismod metus. Fusce laoreet, lectus nec sagittis aliquam, tellus odio elementum nulla, eget rhoncus mi purus a arcu. Sed fermentum erat id purus viverra, at pellentesque dolor posuere. In hac habitasse platea dictumst. Praesent quis magna nec mi tincidunt ullamcorper a a mi. Nulla ornare rutrum leo et mollis. Donec iaculis feugiat orci, vitae sollicitudin turpis ullamcorper varius. Donec at tempus tellus. Aliquam sit amet est et justo porta tempor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPage;