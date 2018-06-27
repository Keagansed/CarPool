import React, { Component } from 'react';
import UserReview from './UserReview';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class ReviewTripModal extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            rating: 1
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
  
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    render(){
        //const { rating } = this.state;
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Review Trip</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <UserReview/>
                            <UserReview/>
                            <UserReview/>
                            <UserReview/>
                            <div className="row">
                                <button type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnSubmitReview">
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="mx-auto">
                <button className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center" onClick={this.toggle}>
                    <i className="fa fa-star"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default ReviewTripModal;