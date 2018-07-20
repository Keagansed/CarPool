import { observer } from 'mobx-react';
import React, { Component } from 'react';

@observer class NavTabs extends Component{

    constructor(){
        super()

        this.state = {
            vouchTabActive: "active",
            trustTabActive: ""   
        }
    }

    handleVouchToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToVouch();
        this.setState({
            vouchTabActive: "active",
            trustTabActive: ""
        })
    }

    handleTrustToggle = (event) => {
        event.preventDefault();

        this.props.store.toggleToTrust();
        this.setState({
            vouchTabActive: "",
            trustTabActive: "active"
        })
    }

    render(){
        return(
            <div className="container-fluid height-50px bg-aqua">
                <div className="row font-20px height-100p">
                    <button className={"btnTabWhiteActive col-6 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.vouchTabActive} onClick={this.handleVouchToggle}>
                        Vouches
                    </button>
                    <button className={"btnTabWhiteActive col-6 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px " + this.state.trustTabActive} onClick={this.handleTrustToggle}>
                        Trust
                    </button>
                </div>
            </div>
        )
    }
}

export default NavTabs;