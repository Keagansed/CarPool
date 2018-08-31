import React from "react";
import Slider from "react-slick";

import slide_1  from "../../css/images/Intro_0.png";
import slide_2  from "../../css/images/Intro_1.png";
import slide_3  from "../../css/images/Intro_2.png";
import slide_4  from "../../css/images/Intro_3.png";

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
                        <div>
                            <img className="img-fluid d-block mx-auto" src={slide_1} alt="slideOne"/>
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto" src={slide_2} alt="slideTwo"/>
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto" src={slide_3} alt="slideThree"/>
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto" src={slide_4} alt="slideFour"/>
                        </div>
                    </Slider> 
                </div>
            </div>
        );
    }
}

export default IntroPage;