// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import ReviewStore from '../../stores/ReviewStore';
import VouchStore from '../../stores/VouchStore';
import UserReview from './UserReview';
import { getFromStorage } from '../../utils/localStorage'

/**
 * Purpose: An interface to allow the user to review other members of the Carpool after the Trip has concluded
 * This is a container component that holds and displays UserReview components
 */
@observer class ReviewTripModal extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            reviewDialog: false,
            rating: 1,
            vouches: []
        }

        this.reviewStores = [];
        this.userVouches = [];
        this.userReviews = [];
    }

    //Open/close review dialog
    openReviewDialog = () => {
        this.setState({ reviewDialog: true });
    };
    closeReviewDialog = () => {
        this.setState({ reviewDialog: false });
    };

    componentDidMount(){
        this.updateUserReviews();
    }

    updateReview = (id, message)=> {
        this.userReviews[id].review = message;
    }

    updateStars = (id, stars)=> {
        this.userReviews[id].stars = stars;
    }

    submitReviews = () => {
        for(let user in this.userReviews){
            VouchStore.submitVouch(
                this.props.trip._id,
                user,
                this.userReviews[user].stars,
                this.userReviews[user].review, 
                getFromStorage('sessionKey').token
            );
        }
        this.closeReviewDialog;
    }

    updateUserReviews = () => {
        if(typeof(this.props.trip) !== "undefined"){
            for(let user in this.props.trip.users){
                if(this.props.trip.users[user] === true){
                    this.reviewStores[user] = new ReviewStore();
                    this.reviewStores[user].getVouches(user);        
                }  
            }   
        }
    }

    updateUserReviewsDisplay = ()=> {
        let token = getFromStorage('sessionKey').token;
        let userReviews = [];        
        
        for(let userId in this.reviewStores){

            let hasVouch = false;
            let vouchArr = this.reviewStores[userId].vouchesFor;

            vouchArr.forEach(vouch => {
                if(
                    vouch.idBy === token && 
                    vouch.idFor === userId && 
                    vouch.tripID === this.props.trip._id
                ){
                    hasVouch = true;
                }
            });

            if(userId !== token && !hasVouch) {
                this.userReviews[userId] = {};
                this.userReviews[userId].stars = 1;
                userReviews.push(
                    <UserReview 
                        id={userId} 
                        key={Math.random()} 
                        user={this.props.userList} 
                        updateReview={this.updateReview}
                        updateStars={this.updateStars}
                    />
                );
            }    

            this.setState({userReviews: userReviews}); 
        }

    }

    render(){
        let modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Review Trip</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.userReviews}
                            <div className="row">
                                <button 
                                    type="submit" 
                                    onClick={this.submitReviews} 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" 
                                    id="btnSubmitReview"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return(

            <div>
                <IconButton color="inherit" aria-label="Back" onClick={this.openReviewDialog}>
                    <StarIcon />
                </IconButton>
                <Dialog open={this.state.reviewDialog} onClose={this.closeReviewDialog} scroll='paper'>
                    <DialogTitle>Review Trip</DialogTitle>
                    <DialogContent>
                        {this.state.userReviews}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeReviewDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.closeReviewDialog} color="primary" autoFocus>
                            Submit Review
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ReviewTripModal;