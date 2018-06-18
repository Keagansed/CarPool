import React, { Component } from 'react';
import Vouch from './Vouch'

class Vouches  extends Component {
    render(){
        return(
            <div className="scroll-vert">
                {/*Just an example... */}
                <Vouch />   
                <Vouch /> 
                <Vouch /> 
                <Vouch /> 
                <Vouch /> 
                <Vouch />                                                          
                <Vouch /> 
            </div>
        );
    }
}

export default Vouches;