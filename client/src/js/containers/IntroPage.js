import React from "react";
import Slider from "react-slick";

import slide_1  from "../../css/images/Intro_0.png";
import slide_2  from "../../css/images/Intro_1_0.png";
import slide_3  from "../../css/images/Intro_1_1.png";

class IntroPage extends React.Component {
    render() {
        var settings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="bg-purple vertical-center">
                <div className="container-fluid pad-0">
                    <Slider {...settings}>
                        <img className="img-fluid d-block mx-auto" src={slide_1} alt="slideOne"/>
                        <img className="img-fluid d-block mx-auto" src={slide_2} alt="slideTwo"/>
                        <img className="img-fluid d-block mx-auto" src={slide_3} alt="slideThree"/>
                    </Slider> 
                </div>
            </div>
        );
    }
}

export default IntroPage;