import React, { useState } from 'react'
//Component
import routPath from 'src/routes/routes';
//constant
import { images } from 'src/utils/image';
import { homePageField, donorContentlist } from 'src/utils/enums';
//Style
import "../style.less";
import "../animation.less";
import { animImages } from 'src/utils/animation'
import { useRouter } from 'next/router';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import ReactPlayer from 'react-player';
import { Waypoint } from 'react-waypoint';
import { videos } from 'src/utils/videos'


function Donor() {
    const router = useRouter()
    const [isPlay, setIsPlay] = useState(true)

    return (
        <>
            <div className="container text-center py-lg-5 pb-0">
                <div className="d-flex mb-3 align-items-baseline justify-content-center w-100 flexrap  px-0 px-3">
                    <h2 className="who-can-title mb-0">Who can <span>Resonate</span> with
                        <img src={images.WelcomeLogo} className="ms-2 h-sm-100 who-title-img" />
                        ?
                    </h2>
                </div>
            </div>
            <div className="who-section-vector">
                <div className="container py-lg-5 pt-3">
                    <div className='row justify-content-lg-between justify-content-center'>
                        <div className='col-lg-5 col-md-8 col-sm-10 col-10 position-relative p-0' >
                            <div className='h-100'>
                                <h2 className="title d-flex align-items-baseline d-lg-none justify-content-center mb-4">{homePageField.donor}
                                    <img src={images.donor} className="logo img-fluid ms-2 title-img-height" />
                                </h2>
                                <Waypoint
                                    onEnter={() => {
                                        setIsPlay(true);
                                        console.log(isPlay)
                                    }}
                                    onLeave={() => { setIsPlay(false) }}>
                                    <div className='position-relative'>
                                        <ReactPlayer
                                            url={videos.video2}
                                            width='100%'
                                            height={"unset !important"}
                                            loop={true}
                                            playing={isPlay} muted={true}
                                        />
                                        <div className='anim-container-6  d-lg-flex justify-content-center d-none w-100'>
                                            <img src={animImages.an6} className='w-75' alt="" />
                                        </div>
                                    </div>
                                </Waypoint>
                                <div className='anim-container-5 d-lg-block d-none'>
                                    <img src={animImages.an5} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-8 col-sm-10 col-10 pe-lg-0 p-0'>
                            <div className="main-vector-content d-flex flex-column justify-content-between h-100 pe-lg-0 p-0">
                                <h2 className="title d-lg-flex align-items-baseline d-none mb-5">{homePageField.donor}
                                    <img src={images.donor} className="logo img-fluid ms-2 title-img-height" />
                                </h2>
                                <div className="content pt-lg-0 pt-2"><p className="resonate-card-content mb-0">
                                    <b>Benefits:</b>
                                </p>
                                    <ul className='ps-4'>
                                        {
                                            donorContentlist.map((val, index) => {
                                                return (<li key={index}>{val}</li>)

                                            })
                                        }
                                    </ul>
                                </div>
                                <div className=' d-flex justify-content-center justify-content-lg-start'>
                                    <div className='position-relative'>
                                        <button onClick={() => router.push(routPath.donorRegistration)} className="sign-up-btn">{homePageField.donorSignUp}</button>
                                        <ScrollAnimation animateOnce={true} animateIn='bounceInRight' animateOut='bounceOutLeft'>
                                            <div className='anim-container-7'>
                                                <img src={animImages.an7} alt="" />
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Donor
