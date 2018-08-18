// File Type: Component

import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

/**
 * Purpose: An interface to allow the user to review other members of the Carpool after the Trip has concluded
 */
class UserReview extends Component{
    constructor(props) {
        super(props);
  
        this.state = {
            rating: 1,
            user:[],
        }
        // this.onStarClick = this.onStarClick.bind(this);
    }

    componentWillMount(){
        console.log(this.props.user);
        this.setState({user: this.props.user});
    }

    onStarClick = (nextValue, prevValue, name)=> {
        this.setState({rating: nextValue});
        this.props.updateStars(this.props.id,nextValue);
    }

    getUsernameSurname = (_id)=> {
        for (var x in this.state.user){
            if(this.state.user[x]._id === _id){
                return this.state.user[x].firstName + " " + this.state.user[x].lastName;
            }
        }
    }

    updateReview = ()=> {
        this.props.updateReview(this.props.id,document.getElementById(this.props.id).value);
    }

    getUsername = (_id)=> {
        for (var x in this.state.user){
            if(this.state.user[x]._id === _id){
                return this.state.user[x].firstName;
            }
        }
    }

    render(){
        const { rating } = this.state;
        
        return(
            <form>
                <div className="row">
                    <h6 className="fw-bold mx-auto">{this.getUsernameSurname(this.props.id)}</h6>
                </div>
                {/* Static data will be replaced by dynamic data */}
                <div className="row">
                    <div className="col-12 txt-center">
                        <textarea 
                            type="text" 
                            className="col-10 form-control mx-auto brad-20px" 
                            onChange={this.updateReview.bind(this)} 
                            placeholder={"Thoughts on " + this.getUsername(this.props.id)} 
                            required="required" 
                            name="UserReview" 
                            id={this.props.id}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 mleft-auto">Rating:</div>
                    <div className="col-5 vertical-right mright-auto">
                        <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default UserReview;