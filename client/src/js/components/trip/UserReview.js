// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";

import TripsStore from './../../stores/TripsStore';


/**
 * Purpose: An interface to allow the user to review other members of the Carpool after the Trip has concluded
 */
@observer class UserReview extends Component{
    constructor(props) {
        super(props);
  
        this.state = {
            rating: 1
        }

    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({rating: nextValue});
        this.props.updateStars(this.props.id,nextValue);
    }

    updateReview = ()=> {
        this.props.updateReview(this.props.id,document.getElementById(this.props.id).value);
    }

    render(){
        const { rating } = this.state;
        
        return(
            <div>
                <Typography variant='subheading' align='center'>
                    {TripsStore.getUsernameSurname(this.props.id)}
                </Typography>
                <TextField
                    id={this.props.id}
                    label={"Thoughts on " + TripsStore.getUsername(this.props.id)} 
                    multiline
                    onChange={this.updateReview.bind(this)} 
                    rows="4"
                    margin="normal"
                    variant="outlined"
                />
                <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick}
                />
            </div>
            // <form>
            //     <div className="row">
            //         <h6 className="fw-bold mx-auto">{TripsStore.getUsernameSurname(this.props.id)}</h6>
            //     </div>
            //     {/* Static data will be replaced by dynamic data */}
            //     <div className="row">
            //         <div className="col-12 txt-center">
            //             <textarea 
            //                 type="text" 
            //                 className="col-10 form-control mx-auto brad-20px" 
            //                 onChange={this.updateReview.bind(this)} 
            //                 placeholder={"Thoughts on " + TripsStore.getUsername(this.props.id)} 
            //                 required="required" 
            //                 name="UserReview" 
            //                 id={this.props.id}
            //             />
            //         </div>
            //     </div>
            //     <div className="row">
            //         <div className="col-5 mleft-auto">Rating:</div>
            //         <div className="col-5 vertical-right mright-auto">
            //             <StarRatingComponent 
            //                 name="rate1" 
            //                 starCount={5}
            //                 value={rating}
            //                 onStarClick={this.onStarClick}
            //             />
            //         </div>
            //     </div>
            // </form>
        );
    }
}

export default UserReview;