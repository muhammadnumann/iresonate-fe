import React from 'react'
import routPath from 'src/routes/routes';
import { images } from 'src/utils/image';
import { homePageField, contentProviderlist } from 'src/utils/enums';
//Style
import "../style.less";
import "../animation.less";
import { animImages } from 'src/utils/animation'
import { useRouter } from 'next/router';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function ContentSection() {
    const router = useRouter()

    return (
        <div className="who-section-vector px-lg-0 px-sm-3 mt-lg-5 mt-3">
            <div className="container py-lg-5 pt-0">
                <div className='row justify-content-lg-between justify-content-center'>
                    <div className='col-lg-7 col-md-8 col-sm-10 col-10 p-0 d-none d-lg-block'>
                        <div className="main-vector-content d-flex flex-column justify-content-between h-100 pb-4">
                            <h2 className="title d-flex align-items-baseline mb-4 pb-3">{homePageField.contentProvider}
                                <img src={images.contentProvider} className="logo img-fluid ms-2" />
                            </h2>
                            <p className="content m-0"><b>Benefits:</b></p>
                            <ul className='ps-4'>
                                {contentProviderlist.map((val, index) => { return (<li key={index}>{val}</li>) })}
                            </ul>
                            <p className="content italict-style">
                                As we grow, we already have plans for further value and opportunities.</p>
                            <div className='position-relative'>
                                <button onClick={() => router.push(routPath.contentProviderRegistrations)} className="sign-up-btn">{homePageField.signUp} Now</button>
                                <ScrollAnimation animateOnce={true} animateIn='bounceInRight' animateOut='bounceOutLeft'>
                                    <div className='anim-container-7'><img src={animImages.an7} alt="" /></div>
                                </ScrollAnimation></div>
                        </div>
                    </div>
                    <div className='col-lg-5 col-md-8 col-sm-10 col-10 p-0'>
                        <div className="d-flex d-lg-none align-items-baseline justify-content-center mb-4 flexrap">
                            <h2 className="title">{homePageField.contentProvider} </h2>
                            <img src={images.contentProvider} className="logo img-fluid ms-2 title-img-height" />
                        </div>
                        <div className="position-relative">
                            <img src={images.content_Provider} className="content-provider" />
                            <div className='anim-container-6  d-lg-flex justify-content-center d-none w-100'>
                                <img src={animImages.an6} className='w-75' alt="" /></div>
                            <div className='anim-container-8 right-0 d-lg-block d-none'><img src={animImages.an8} alt="" /></div>
                        </div>
                    </div>
                    <div className='col-md-8 col-sm-10 col-10 d-block d-lg-none p-0'>
                        <div className="main-vector-content d-flex flex-column justify-content-between h-100 pt-4 pb-4">
                            <p className="content mb-0">
                                <b>Benefits:</b>
                            </p>
                            <ul className='ps-4'>
                                {contentProviderlist.map((val, index) => { return (<li key={index}>{val}</li>) })}
                            </ul>
                            <p className="content">
                                As we grow, we already have plans for further value and opportunities.</p>
                            <div className="d-flex justify-content-center justify-content-lg-start">

                                <div className='position-relative'>
                                    <button onClick={() => router.push(routPath.contentProviderRegistrations)} className="sign-up-btn">{homePageField.signUp} Now</button>
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
    )
}

export default ContentSection
