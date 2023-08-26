import React from 'react'
//Component
import Footer from 'src/component/core/footer';
//constant
import { images } from 'src/utils/image';
//Style
import "./style.less";
import "./animation.less";
import { NewNavigation } from '../core/new-navigation';
import Banner from './subComponent/banner';
import WhatSection from './subComponent/whatSection';
import Donor from './subComponent/donor';
import Head from 'next/head';
import WebHostHome from './subComponent/webHost';
import "animate.css/animate.min.css";
// import HomeSlides from './slides';
import HomeSlides from './slides';
import NewContactUsForm from 'src/form/newContactUS';
import ContentSection from './subComponent/ContentSection';
import { Waypoint } from 'react-waypoint';
import ReactPlayer from 'react-player';
import { videos } from 'src/utils/videos'



const NewMainPage = () => {
  const [isPlay, setIsPlay] = React.useState(true)

  return (
    <>

      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      </Head>

      <div className="main-container overflow-hidden" id='home_section'>
        <NewNavigation />
        <div className="position-relative w-100">
          <div className="ellipse-left-img"></div>
          <div className="ellipse-left-red"></div>
          <div className="ellipse-right-img">
          </div>
        </div>
        <section className="banner">
          <Banner />
        </section>
        <section className="what-section mt-4 pt-2 mx-sm-5" id='About_section'>
          <WhatSection />
        </section>

        {/* DONOR */}
        <section className="who-section mt-lg-5 mt-sm-0 mt-5">
          <Donor />
        </section>
        {/* DONOR */}

        {/* CONTENT PROVIDER */}
        <section className="who-section ">
          <ContentSection />
        </section>
        {/* CONTENT PROVIDER */}

        {/* WEBHOST */}
        <section className="who-section">
          <WebHostHome />
        </section>
        {/* WEBHOST */}

        {/* Slides */}
        {/* <HomeSlides /> */}
        <div className='home-slides position-relative'>
          <div className='position-absolute start-0 bottom-0 h-100 slide-ellipse-right-img'>
            <img src={images.slideright} alt="" className='h-100' />
          </div>
          <div className='position-absolute end-0 bottom-0 h-100  slide-ellipse-left-img'>
            <img src={images.slideleft} className='h-100' alt="" />
          </div>
          <section className='container z-index-dropdown'>
            <h2 className='main-title'>How Does ClickTip™ <span className=''> Work?</span></h2>
            <HomeSlides />
          </section>
        </div>
        {/* Slides */}
        <div className='py-5' style={{ backgroundColor: '#E6E6E6' }}>
          <div className='container py-5' id='contact_section' >
            <h2 className='connect-title text-center mb-5'>Questions, Comments, and <span>Suggestions</span></h2>
            <div className='bg-white overflow-hidden' style={{ borderRadius: '22px' }}>
              <div className="row w-100 m-0">
                <div className="col-lg-7 p-0">
                  <Waypoint
                    onEnter={() => {
                      setIsPlay(true);
                      console.log(isPlay)
                    }}
                    onLeave={() => { setIsPlay(false) }}>
                    <div className='w-100 h-100 connect-vid'>
                      <ReactPlayer
                        url={videos.video5}
                        loop={true}
                        playing={isPlay} muted={true}
                      />
                    </div>
                  </Waypoint>
                </div>
                <div className="col-lg-5 pe-sm-4 p-4 bg-white z-100">
                  <NewContactUsForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}
export default NewMainPage;
