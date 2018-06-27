import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class UserReview extends Component{
    constructor(props) {
        super(props);
  
        this.state = {
            rating: 1
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render(){
        const { rating } = this.state;
        
        return(
            <form>
                <div className="row">
                    <h6 className="fw-bold mx-auto">Marcus Bornman</h6>
                </div>
                {/* Static data will be replaced by dynamic data */}
                <div className="row">
                    <div className="col-12 txt-center">
                        <textarea type="text" className="col-10 form-control mx-auto brad-20px" placeholder="Thoughts on Marcus" required="required" name="UserReview" id="inputUserReview"/> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 mleft-auto">Rating:</div>
                    <div className="col-5 vertical-right mright-auto">
                        <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default UserReview;