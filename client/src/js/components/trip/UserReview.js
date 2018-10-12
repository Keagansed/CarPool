// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import StarFullIcon from '@material-ui/icons/Star';
import StarEmptyIcon from '@material-ui/icons/StarBorder';

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
            <div style={{textAlign: 'center'}}>
                <Typography variant='subheading' align='center'>
                    {TripsStore.getUsernameSurname(this.props.id)}
                </Typography>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick}
                    renderStarIcon={(index, value) => {
                        if (index <= value)
                            return <StarFullIcon />
                        else
                            return <StarEmptyIcon />
                      }}
                />
                <TextField
                    id={this.props.id}
                    label={"Thoughts on " + TripsStore.getUsername(this.props.id)} 
                    multiline
                    onChange={this.updateReview.bind(this)} 
                    rows="4"
                    variant="outlined"
                />
            </div>
        );
    }
}

export default UserReview;