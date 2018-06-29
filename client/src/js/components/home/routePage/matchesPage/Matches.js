import React, { Component } from 'react';
import { observer } from "mobx-react";

import UserMatch from './UserMatch';
import CarpoolMatch from './CarpoolMatch';

@observer class Matches extends Component{
    render(){
        // const { token } = this.props.store;
        
        return(
            <div>
                {/* dummy static matches */}
                <UserMatch />
                <CarpoolMatch/>
            </div>
        );
    }
}

export default Matches;