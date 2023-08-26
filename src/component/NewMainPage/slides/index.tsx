import React from 'react'
import { Carousel } from 'antd';
import { images } from 'src/utils/image';
import { homePageField } from 'src/utils/enums';
import "./style.less";

// ...

const SampleNextArrow = props => {
    const { className, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={12} viewBox="0 0 15 12" fill="none">
                <path d="M8.5 1L13.5 6L8.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 6H13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

const SamplePrevArrow = props => {
    const { className, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={12} viewBox="0 0 15 12" fill="none">
                <path d="M6.5 1L1.5 6L6.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 6H1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </div>
    )
}


const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000
}
const HomeSlides = () => {

    return (
        <>
            <Carousel {...settings} arrows>
                {
                    homePageField.step.map((val, index) => {
                        return (
                            <>
                                <div key={index} className='slidestyle'>
                                    <div className='row justify-content-center'>
                                        <div className="col-lg-4 d-lg-block d-none">
                                            <div className="d-flex flex-column align-items-start justify-content-between h-100">
                                                <div className=''>
                                                    <h3 className='step-title mb-3'>Step {index + 1}</h3>
                                                    <p className='step-desc'>{val}</p>
                                                </div>
                                                <a href={'donor/registration'}>
                                                    <button className="sign-up-btn">Sign Up Now</button>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className='ms-lg-5 ms-0 d-flex justify-content-lg-end justify-content-center position-relative'>
                                                <img src={images.slide[index]} className='w-100' style={{ borderRadius: '22px' }} alt="" />
                                                <div className='position-absolute w-100 h-100' style={{ left: '30px' }} >
                                                    {
                                                        index === 0 ?
                                                            <div className='d-flex gap-3 justify-content-center w-100'>
                                                                <img src={images.question} alt={''} width={20} style={{ transform: "rotate(317deg) translateY(-41px) translateX(-88px)" }} height={30} className={'animation-2 position-relative'} />
                                                                <img src={images.question} alt={''} width={20} style={{ transform: "rotate(5deg) translateY(-24px) translateX(-36px)" }} height={30} className={'animation-2 position-relative'} />
                                                                <img src={images.question} alt={''} width={20} height={30} style={{ transform: "rotate(30deg) translateY(5px) translateX(34px)" }} className={'animation-2 position-relative'} />
                                                            </div>
                                                            : index == 1 ?
                                                                < img src={images.hearts} alt={''} className={'animation-2'} /> :
                                                                index === 2 ?
                                                                    < img src={images.hearts} alt={''} className={'animation-2'} /> :
                                                                    <div className='position-relative h-100'>
                                                                        <div className='position-absolute' style={{ top: '30%' }}>
                                                                            < img src={images.dollaranimation} width="90%" className={'animation-3'} />
                                                                        </div>
                                                                    </div>

                                                    }
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-4 d-lg-none d-block mt-5">
                                            <div className="d-flex flex-column align-items-start justify-content-lg-between justify-content-center h-100 ">
                                                <div className='w-75'>
                                                    <h3 className='step-title mb-3'>Step {index + 1}</h3>
                                                    <p className='step-desc'>{val}</p>
                                                </div>
                                                <button className="sign-up-btn">Sign Up Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </Carousel>
        </>
    )

}
export default HomeSlides