import React from 'react'
import { images } from 'src/utils/image'
import { AboutUs } from 'src/utils/staticData'
import { WSCol, WSImage, WSRow } from '../common'
import './style.less'
function AboutUsPage() {
    return (
        <>
            <div className='about-us'>
                <WSRow gutter={[16, 10]}>
                    <WSCol xs={24} lg={16} >
                        <h2 className='title'>{AboutUs.AboutUsTitle}</h2>
                        <p>{AboutUs.description}</p>
                        <p>{AboutUs.Clicktip}</p>
                        <p>{AboutUs.Concept}</p>
                    </WSCol>
                    <WSCol xs={24} lg={8} >
                        <div className='d-lg-flex h-100 justify-content-end align-items-center d-none'>
                            <WSImage src={images.CEO} className="img-fluid iresonate-logo" />
                        </div>
                    </WSCol>

                </WSRow>
            </div>
        </>
    )
}

export default AboutUsPage