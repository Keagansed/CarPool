import React, { Component } from 'react';
import { observer } from "mobx-react";

import Match from './Match';

@observer class Matches extends Component{
    render(){
        // const { token } = this.props.store;
        
        return(
            <div>
                {/* dummy static matches */}
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
            </div>
        );
    }
}

export default Matches;