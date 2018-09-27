// File Type: Component

import React, { Component } from 'react';
import TrustItem from './TrustItem'

/*
* The purpose of the Trusts class is to render all trustItems for a specific user.
*/
class Trusts  extends Component {
    render(){
        const { hasIdDocument } = this.props.store;
        const { hasdriversLicense } = this.props.store;
        const { hasClearance } = this.props.store;
        const { hasCarRegistration } = this.props.store;
        const { hasCarPic } = this.props.store;

        /*
        * The purpose of the render method is to enable the rendering of this component.
        * It returns react elements and HTML using JSX.
        */
        return(
            <div className="scroll-vert">
                {/*Just an example, logic must be added... */}
                <TrustItem store={this.props.store} hasItem={hasIdDocument} itemName="Identity Document"/> 
                <TrustItem store={this.props.store} hasItem={hasdriversLicense} itemName="Driver's License"/> 
                <TrustItem store={this.props.store} hasItem={hasClearance} itemName="Police Clearance"/>   
                <TrustItem store={this.props.store} hasItem={hasCarRegistration} itemName="Car Registration"/> 
                <TrustItem store={this.props.store} hasItem={hasCarPic} itemName="Image of Car"/>   
            </div>
        );
    }
}

export default Trusts;