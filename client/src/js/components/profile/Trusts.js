// File Type: Component

import React, { Component } from 'react';
import TrustItem from './TrustItem'

/*
* The purpose of the Trusts class is to render all trustItems for a specific user.
*/
class Trusts  extends Component {
    render(){
        /*
        * The purpose of the render method is to enable the rendering of this component.
        * It returns react elements and HTML using JSX.
        */
        return(
            <div className="scroll-vert">
                {/*Just an example, logic must be added... */}
                <TrustItem />   
                <TrustItem /> 
                <TrustItem /> 
                <TrustItem /> 
                <TrustItem /> 
                <TrustItem />                                                          
                <TrustItem /> 
            </div>
        );
    }
}

export default Trusts;