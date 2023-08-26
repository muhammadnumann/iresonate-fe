import React, { useEffect, useState } from 'react'
import routPath from 'src/routes/routes';
import { images } from 'src/utils/image';
import { homePageField, webHostContentDetails } from 'src/utils/enums';
import "../style.less";
import "../animation.less";
import { animImages } from 'src/utils/animation'
import { useRouter } from 'next/router';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import { Waypoint } from 'react-waypoint';
import ReactPlayer from 'react-player';
import { videos } from 'src/utils/videos'

function WebHostHome() {
    const router = useRouter()
    const [isPlay, setIsPlay] = React.useState(true)

    return (
        <div className="who-section-vector py-3 px-sm-0 py-lg-5 pt-0">
            <div className="container pt-0">
                <div className='row justify-content-lg-between justify-content-center my-lg-5 mt-0'>
                    <div className='col-lg-5 col-md-8 col-sm-10 col-10 p-0 position-relative'>
                        <div className="d-flex mb-4 d-lg-none d-block align-items-baseline justify-content-center w-100 flexrap">
                            <h2 className="text-center title">{homePageField.webHost}</h2>
                            <img src={images.webhost} height={"30px"} className=" logo img-fluid ms-2" />
                        </div>
                        <div className="position-relative">
                            <Waypoint
                                onEnter={() => {
                                    setIsPlay(true);
                                    console.log(isPlay)
                                }}
                                onLeave={() => { setIsPlay(false) }}>
                                <div className='position-relative'>
                                    <ReactPlayer
                                        url={videos.video4}
                                        width='100%'
                                        height={'unset !important'}
                                        loop={true}
                                        playing={isPlay} muted={true}
                                    />
                                    <div className='anim-container-6  d-lg-flex justify-content-center w-100 d-none'>
                                        <img src={animImages.an6} className='w-75' alt="" />
                                    </div>
                                </div>
                            </Waypoint>
                            <div className='anim-container-5 right-0 d-lg-block d-none'>
                                <img src={animImages.an5} alt="" />
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-6 p-0 col-md-8 col-sm-10 col-10 p-0'>
                        <div className="main-vector-content">
                            <div className="d-lg-flex d-none mb-5 align-items-baseline justify-content-lg-start justify-content-center w-100 flexrap">
                                <h2 className="text-center title mb-0">{homePageField.webHost} </h2>
                                <img src={images.webhost} style={{ height: "30px" }} className="welcome-img img-fluid ms-2" />
                            </div>
                            <p className="content mt-lg-0 mt-4 mb-0"><b>Benefits</b></p>
                            <ul className="content ps-4">
                                {webHostContentDetails.map((value, key) => { return (<li key={key}>{value}</li>) })}
                            </ul>
                            <p className="content italict-style">{homePageField.webHostLastContent}</p>
                            <div className="d-flex justify-content-center justify-content-lg-start" >
                                <div className='position-relative'>
                                    {/* ANimation Image */}
                                    <button onClick={() => router.push(routPath.webHostRegistrations)} className="sign-up-btn">{homePageField.signUp} Now</button>

                                    <ScrollAnimation animateOnce={true} animateIn='bounceInRight' animateOut='bounceOutLeft'>
                                        <div className='anim-container-7'>
                                            <img src={animImages.an7} alt="" />
                                        </div>
                                    </ScrollAnimation>
                                    {/* ANimation Image */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default WebHostHome