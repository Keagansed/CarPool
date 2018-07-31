// File Type: Component

import React, { Component } from 'react';
import Vouch from './Vouch'

/**
 * Purpose: Container to store and display various Vouch components for the user
 */
class Vouches  extends Component {
    constructor(props){
        super(props);

        this.state ={vouches: [], user:[]};
    }

    componentDidMount() {
        const idFor = this.props._id;
        fetch('/api/account/getVouches?idFor=' + idFor)
            .then(res => res.json())
            .then(vouches => this.setState({vouches}));
    }

    render() {
        return(
            <div className="scroll-vert">
                {
                    this.state.vouches.map((vouch) => {
                        return (<Vouch vouch={vouch} key={Math.random()}/>);
                    })
                }
            </div>
        );
    }
}

export default Vouches;