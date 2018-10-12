import React from "react";
import Slider from "react-slick";
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Slide from './Slide';
import HomePageStore from '../../stores/HomePageStore';

import check_gif from "../../../css/images/animat-checkmark-color.gif"
import pencil_gif from "../../../css/images/animat-pencil-color.gif"
import car_gif from "../../../css/images/animat-road-trip-color.gif"
import signpost_gif from "../../../css/images/animat-sign-post-color.gif"
// import compass_gif from "../../../css/images/animat-compass-color.gif"

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

        HomePageStore.renderCarousel = false;
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
                <Button style={{ margin: 7 }} onClick={this.closeCarousel} color="primary" variant="contained" autoFocus>
                    Let's Go
                </Button>
            )
        } else {
            return (
                <Button style={{ margin: 7, visibility: false }}> </Button>
            )
        }
    }

    render() {          
        const settings = {
            dots: true,
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
                        <Slide title="Create a Route" caption="Match with other users and send them requests" image={signpost_gif}/>
                        <Slide title="Join a Carpool" caption="Get chatting and plan your trips" image={pencil_gif}/>
                        <Slide title="Go on a Trip" caption="Save the earth and drive together" image={car_gif}/>
                        <Slide title="You're all set!" image={check_gif}/>                                                            
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