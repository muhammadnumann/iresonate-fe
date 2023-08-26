import React, { useState } from 'react'
import { images } from 'src/utils/image';
import { whatresonate } from 'src/utils/enums';
import "../style.less";
import "../animation.less";
import { animImages } from 'src/utils/animation'
import { videos } from 'src/utils/videos'
import "animate.css/animate.min.css";
import ReactPlayer from 'react-player';
import { Waypoint } from 'react-waypoint';

function WhatSection() {
    const [isPlay, setIsPlay] = useState(true)

    return (
        <div className="container max-w-1069 " >
            <div className="resonate-card m-0">
                <div className='row justify-content-center'>
                    <div className='col-lg-6 p-0 d-none d-lg-block position-relative animateOutve'>
                        <div className='d-flex w-75 flex-column h-100 justify-content-center'>
                            <div className="d-flex mb-3 align-items-baseline w-100">
                                <h2 className="text-center What-title">What is
                                <img src={images.whatimg} className="ms-2" />?
                            </h2></div>
                            <p className="resonate-card-content mb-2">By partnering with websites, iResonate’s ClickTip™ button allows content viewers to reward great content.</p>
                            <ul className='italic-list'>
                                {whatresonate.map((val, index) => {
                                    return (
                                        <li key={index}>{val} <b> {' '}ClickTip!</b></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='anim-container-1'>
                            <img src={animImages.an1} alt="" className='animation' />
                        </div>
                        <div className='anim-container-2'>
                            <img src={animImages.an2} alt="" className='animation' />
                        </div>
                    </div>
                    <div className='col-lg-5 p-0 col-md-8 col-sm-10 col-11 position-relative'>
                        <div className='position-relative ant-image'>
                            <div className='vector-img img-fluid'>
                                <Waypoint
                                    onEnter={() => { setIsPlay(true) }}
                                    onLeave={() => { setIsPlay(false) }}>
                                    <div className='position-absolute left-0 w-100 h-100 p-2' style={{ top: "0px" }}>
                                        <ReactPlayer
                                            url={videos.video1}
                                            width='100%'
                                            height={"unset !important"}
                                            loop={true}
                                            playing={isPlay}
                                            muted={true}
                                        />
                                    </div>
                                </Waypoint>
                            </div>
                            <div className="vector-right-side d-lg-block d-none"></div>
                        </div>
                        {/* ANimation Image */}
                        <div className='anim-container-4'><img src={animImages.an4} alt="" className='animation d-lg-block d-none' /></div>
                        {/* ANimation Image */}
                    </div>
                    <div className='col-md-8 p-0 col-sm-10 col-11  d-lg-none position-relative animateOutve mt-5'>
                        <div className='d-flex w-lg-75 flex-column h-100 justify-content-center'>
                            <div className="d-flex mb-3 align-items-baseline justify-content-center w-100 flexrap">
                                <h2 className="text-center What-title">What is
                                <img src={images.WelcomeLogo} style={{ height: "28px" }} className="ms-2" alt='' />?
                                </h2>
                            </div>
                            <p className="resonate-card-content mx-sm-5 mx-0">By partnering with websites, iResonate’s ClickTip™ button allows content viewers to reward great content.
                            </p>
                            <ul className='mx-sm-5 mx-0'>
                                {
                                    whatresonate.map((val, index) => {
                                        return (
                                            <li key={index}>{val} <b>{' '}ClickTip!</b></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        {/* Animation Image */}
                        <div className='anim-container-1'><img src={animImages.an1} alt="" className='animation' /></div>
                        <div className='anim-container-2'><img src={animImages.an2} alt="" className='animation' /></div>
                        {/* Animation Image */}
                    </div>
                </div>
            </div>

        </div >)
}

export default WhatSection
