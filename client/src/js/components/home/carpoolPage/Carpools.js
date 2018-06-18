import React, { Component } from 'react';
import Carpool from './Carpool'

class Carpools  extends Component {
    render(){
        return(
            <div className="scroll-vert">
                {/*Just an example... */}
                <Carpool />                                                            
            </div>
        );
    }
}

export default Carpools;