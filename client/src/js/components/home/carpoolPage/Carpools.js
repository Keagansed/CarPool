import React, { Component } from 'react';
import Carpool from './Carpool';
import CarpoolOffer from './CarpoolOffer';

class Carpools  extends Component {
    render(){
        return(
            <div className="scroll-vert">
                <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Carpool Offers</h4>
                </div>
                {/*Just an example... */}
                <CarpoolOffer /> 
                <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Your Carpools</h4>
                </div>
                {/*Just an example... */}
                <Carpool />                                                            
            </div>
        );
    }
}

export default Carpools;