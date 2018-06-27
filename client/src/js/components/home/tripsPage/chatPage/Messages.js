import React, { Component } from 'react';
import { observer } from "mobx-react";

import Message from './Message';

@observer class Messages extends Component{
    render(){
        // const { token } = this.props.store;
        
        return(
            <div>
                {/* dummy static matches */}
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
        );
    }
}

export default Messages;