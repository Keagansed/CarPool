import React, { Component } from 'react';
import TrustItem from './TrustItem'

class Trusts  extends Component {
    render(){
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