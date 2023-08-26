import React from 'react'
import { images } from 'src/utils/image';
//Style
import "../style.less";
import "../animation.less";
import { animImages } from 'src/utils/animation'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import DollarButtton from './dollarButtton';
import { homePageField } from 'src/utils/enums';

function Banner() {

    return (
        <div className="banner-content ">
            <div className='d-flex mb-3 align-items-baseline flex-shrink-1'>
                <p className='welcome-text m-0'>Welcome to</p>
                <img src={images.WelcomeLogo} className="welcome-img img-fluid h-100 ms-2" />
                <div className='position-relative'>
                    {/* ANimation Image */}
                    <div className='anim-container-4' style={{ top: '-50px' }}>
                        <img src={animImages.an4} alt="" className='animation d-md-none d-block' />
                    </div>
                    {/* ANimation Image */}
                </div>
            </div>
            <p className="banner-content-text text-center" >
                <span>&quot;Reward</span> great content.&quot;
            </p>
            <div className="position-relative d-flex flex-column align-items-center justify-content-center gap-3">

                {/* ANimation Image */}
                <ScrollAnimation animateOnce={true} animateIn='bounceInLeft' animateOut='bounceOutLeft'>
                    <div className='anim-container-3' >
                        <img src={animImages.an3} alt="" />
                    </div>
                </ScrollAnimation>
                {/* ANimation Image */}

                <DollarButtton />
                <p className="click-it-btn">{homePageField.clickItTipIt}</p>

            </div>
        </div>)
}

export default Banner