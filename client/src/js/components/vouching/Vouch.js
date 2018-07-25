import React, { Component } from 'react';

//Just using temporarily for demonstration purposes
import tempProPic from '../../../css/images/profile_default.png';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class Vouch  extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            user:[]
        }
    }

    componentWillMount(){
        fetch('/api/account/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}))
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    getUsername(_id) {
        for (let x in this.state.user) {
            if(this.state.user[x]._id === _id) {
                return this.state.user[x].firstName;
            }
        }

    }

    getUsernameSurname(_id) {
        for (let x in this.state.user) {
            if(this.state.user[x]._id === _id) {
                return this.state.user[x].firstName + " " + this.state.user[x].lastName;
            }
        }

    }

    printStars(numStars) {
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
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.getUsername(this.props.vouch.idBy)}'s Review</h5>
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
                                <img src={tempProPic} className="mx-auto my-auto rounded-circle bord-2px-purple" height="60" width="60" alt="s" />
                        </div>
                        <div className="col-7">
                            <div className="col-12 txt-gold">
                                <h5>{this.printStars(this.props.vouch.rating)}</h5>
                            </div>
                            <div className="col-12">
                                {this.getUsernameSurname(this.props.vouch.idBy)}
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