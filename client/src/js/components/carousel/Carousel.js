import React from "react";
import Slider from "react-slick";
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Slide from './Slide';

import check_gif from "../../../css/images/animat-checkmark-color.gif"
import pencil_gif from "../../../css/images/animat-pencil-color.gif"
import car_gif from "../../../css/images/animat-road-trip-color.gif"
import signpost_gif from "../../../css/images/animat-sign-post-color.gif"
import compass_gif from "../../../css/images/animat-compass-color.gif"

class Carousel extends React.Component {
    constructor(){
        super();

        this.state = {
            open: true,
            finished: false,
        }
    }

    closeCarousel = (event) => {
        event.preventDefault();

        this.setState({
            open: false,
        })
    }

    handleChange = (oldIndex, newIndex) => {
        if(newIndex === 3) {
            this.setState({
                finished: true,
            })
        }
    }

    renderButton = () => {
        if(this.state.finished) {
            return (
                <Button  onClick={this.closeCarousel} color="primary" variant="contained" autoFocus>
                    Let's Go
                </Button>
            )
        } else {
            return (
                <Button style={{ visibility: false }}></Button>
            )
        }
    }

    render() {          
        const settings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
        };

        return (
           <Dialog 
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
                onClose={this.handleClose}
                maxWidth="lg"   
                scroll='paper'          
            >
                <DialogTitle>Getting Started</DialogTitle>
                <DialogContent>
                    <Slider {...settings} beforeChange={this.handleChange}>
                        <Slide caption="Create a route" image={compass_gif}/>
                        <Slide caption="Join a carpool" image={pencil_gif}/>
                        <Slide caption="Go on a trip" image={car_gif}/>
                        <Slide caption="You're all set!" image={check_gif}/>                                                            
                    </Slider>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }} >
                    {this.renderButton()}
                </DialogActions>
            </Dialog>
            
        );
    }
}
export default Carousel;