// File Type: Component
import { observer } from "mobx-react";
import React, { Component } from 'react';

import VouchStore from './../../stores/VouchStore';
import Vouch from './Vouch'

/**
 * Purpose: Container to store and display various Vouch components for the user
 */
@observer class Vouches  extends Component {
    constructor(props){
        super(props);

        this.state ={vouches: [], user:[]};
    }

    componentDidMount() {
        const idFor = this.props.userId;
        VouchStore.getVouchesFor(idFor);

        if(VouchStore.allUsers.length === 0){
            console.log(VouchStore.allUsers.length + " NEED TO FIX!!! MOVE TO LOGIN");
            VouchStore.getAllUsers();
        }
    }

    render() {
        let vouches = VouchStore.vouchesFor;
        return(
            <div className="scroll-vert">
                {
                    vouches.map((vouch) => {
                        return (<Vouch vouch={vouch} key={Math.random()}/>);
                    })
                }
            </div>
        );
    }
}

export default Vouches;