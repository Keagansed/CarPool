// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import VouchStore from './../../stores/VouchStore';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};


/**
 * Purpose: Interface to display the various vouches/ ratings the user has received
 */
@observer class Vouch  extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            toggle: false,
            user:[]
        }
    }


    toggle = (event)=> {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    printStars = (numStars)=> {
        let starElements = [],
            n = numStars,
            i;

        for(i = 0; i < n; i = i + 1) {
            starElements.push(
                <i className="fa fa-star" key={Math.random()}></i>
            );
        }
        for(i = 0; i < 5-n; i = i + 1) {
            starElements.push(
                <i className="fa fa-star-o" key={Math.random()}></i>
            );
        }

        return starElements;
    }

    render(){
        let profilePic = VouchStore.getUserProfilePic(this.props.vouch.idBy);
        const profilePicture = "./../api/account/getImage?filename=" + profilePic;

        let userName = VouchStore.getUsername(this.props.vouch.idBy);
        let userNameSurname = VouchStore.getUsernameSurname(this.props.vouch.idBy);

        let modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{userName}'s Review</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Rating</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <div className="col-12 txt-gold txt-center">
                                        {this.printStars(this.props.vouch.rating)}
                                    </div>
                                </div>
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Review</h6>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            {this.props.vouch.reviewBody}
                                        </p>
                                    </div>                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                <div className="container-fluid bg-white bordbot-2px-purple"  onClick={this.toggle}>
                    <div className="row txt-purple padver-10px">
                        <div className="col-2">
                                <img src={profilePicture} className="mx-auto my-auto rounded-circle bord-2px-purple" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12 txt-gold">
                                <h5>{this.printStars(this.props.vouch.rating)}</h5>
                            </div>
                            <div className="col-12">
                                {userNameSurname}
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-info-circle"></i></h5>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

export default Vouch;